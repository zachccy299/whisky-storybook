import { supabase } from '../lib/supabase';
import type { Question } from '../types';
import questionsData from '../data/questions.json';

// ─── Questions (local JSON, no DB needed) ───────────────────────────────────

export function getAllQuestions(): Question[] {
  return questionsData as Question[];
}

export function getRandomQuestions(count = 10, excludeIds: string[] = []): Question[] {
  const pool = getAllQuestions().filter(q => !excludeIds.includes(q.id));
  if (pool.length === 0) return getAllQuestions().sort(() => Math.random() - 0.5).slice(0, count);
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getModules(): string[] {
  return Array.from(new Set(getAllQuestions().map(q => q.module)));
}

export function getQuestionsByModule(module: string): Question[] {
  return getAllQuestions().filter(q => q.module === module);
}

// ─── User Profile ────────────────────────────────────────────────────────────

export async function ensureUserProfile(userId: string, displayName: string, photoUrl: string) {
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .single();

  if (!existing) {
    await supabase.from('user_profiles').insert({
      id: userId,
      display_name: displayName,
      photo_url: photoUrl || null,
    });
    // Initialize stats
    await supabase.from('user_stats').insert({
      user_id: userId,
      best_monthly_scores: [],
      monthly_average: 0,
      total_exams_this_month: 0,
      total_score_this_month: 0,
      last_month: new Date().getMonth(),
    });
  } else {
    await supabase.from('user_profiles').update({
      display_name: displayName,
      photo_url: photoUrl || null,
    }).eq('id', userId);
  }
}

export async function updateDisplayName(userId: string, displayName: string) {
  await supabase.from('user_profiles').update({ display_name: displayName }).eq('id', userId);
  await supabase.auth.updateUser({ data: { display_name: displayName } });
}

// ─── User Stats & Badges ─────────────────────────────────────────────────────

export async function getUserStats(userId: string) {
  const [statsRes, badgesRes] = await Promise.all([
    supabase.from('user_stats').select('*').eq('user_id', userId).single(),
    supabase.from('user_badges').select('*').eq('user_id', userId),
  ]);
  return {
    stats: statsRes.data,
    badges: badgesRes.data || [],
  };
}

export async function grantBadge(userId: string, badgeId: string, badgeName: string) {
  // Upsert: no duplicate badges
  await supabase.from('user_badges').upsert({
    user_id: userId,
    badge_id: badgeId,
    badge_name: badgeName,
  }, { onConflict: 'user_id,badge_id' });
}

// ─── Exam Results ─────────────────────────────────────────────────────────────

export async function saveExamResult(
  userId: string,
  userName: string,
  score: number,
  total: number,
  mistakes: Question[],
  timeTaken: number
) {
  // 1. Save exam result
  await supabase.from('exam_results').insert({
    user_id: userId,
    user_name: userName,
    score,
    total,
    time_taken: timeTaken,
  });

  // 2. Update monthly stats
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  const currentMonth = new Date().getMonth();
  let bestScores: number[] = stats?.best_monthly_scores || [];
  let totalExams = stats?.total_exams_this_month || 0;
  let totalScore = stats?.total_score_this_month || 0;

  // Reset if new month
  if ((stats?.last_month ?? currentMonth) !== currentMonth) {
    totalExams = 0;
    totalScore = 0;
    bestScores = [];
  }

  totalExams += 1;
  totalScore += score;
  bestScores = [...bestScores, score].sort((a, b) => b - a).slice(0, 20);

  await supabase.from('user_stats').upsert({
    user_id: userId,
    best_monthly_scores: bestScores,
    monthly_average: totalScore / totalExams,
    total_exams_this_month: totalExams,
    total_score_this_month: totalScore,
    last_month: currentMonth,
  }, { onConflict: 'user_id' });

  // 3. Save mistakes
  if (mistakes.length > 0) {
    const mistakeUpserts = mistakes.map(q => ({
      user_id: userId,
      question_id: q.id,
      question_data: q as any,
      last_failed_at: new Date().toISOString(),
    }));

    for (const m of mistakeUpserts) {
      const { data: existing } = await supabase
        .from('user_mistakes')
        .select('fail_count')
        .eq('user_id', userId)
        .eq('question_id', m.question_id)
        .single();

      await supabase.from('user_mistakes').upsert({
        ...m,
        fail_count: (existing?.fail_count || 0) + 1,
      }, { onConflict: 'user_id,question_id' });
    }
  }
}

export async function saveModuleReviewResult(
  userId: string,
  userName: string,
  score: number,
  total: number,
  module: string,
  mistakes: Question[]
) {
  await saveExamResult(userId, userName, score, total, mistakes, 0);

  if (module === '蘇格蘭威士忌') {
    await grantBadge(userId, 'scotland-explorer', '蘇格蘭探險家');
    if (score === 100) {
      await grantBadge(userId, 'scotland-the-brave', '蘇格蘭勇士');
    }
  }
}

// ─── User Mistakes ───────────────────────────────────────────────────────────

export async function getUserMistakes(userId: string): Promise<{ question: Question; fail_count: number }[]> {
  const { data } = await supabase
    .from('user_mistakes')
    .select('*')
    .eq('user_id', userId);

  return (data || []).map(row => ({
    question: row.question_data as Question,
    fail_count: row.fail_count,
  }));
}

// ─── User Progress (seen questions) ──────────────────────────────────────────

export async function getUserProgress(userId: string): Promise<string[]> {
  const { data } = await supabase
    .from('user_progress')
    .select('seen_ids')
    .eq('user_id', userId)
    .single();
  return data?.seen_ids || [];
}

export async function updateUserProgress(userId: string, seenIds: string[]) {
  await supabase.from('user_progress').upsert({
    user_id: userId,
    seen_ids: seenIds,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export async function getTopScores() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data } = await supabase
    .from('exam_results')
    .select('*')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('score', { ascending: false })
    .limit(200);

  if (!data) return [];

  // Deduplicate: keep best score per user
  const seen = new Set<string>();
  const unique: any[] = [];
  for (const row of data) {
    if (!seen.has(row.user_id)) {
      seen.add(row.user_id);
      unique.push(row);
    }
    if (unique.length >= 30) break;
  }
  return unique;
}

// ─── User Recent Results ──────────────────────────────────────────────────────

export async function getUserExamResults(userId: string, limitCount = 10) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data } = await supabase
    .from('exam_results')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(limitCount);

  return data || [];
}

// ─── Messages (留言板) ────────────────────────────────────────────────────────

export async function submitMessage(name: string, email: string, message: string) {
  const { error } = await supabase.from('messages').insert({ name, email, message });
  if (error) throw error;
}

export async function getMessages() {
  // 需要 service role key 才能讀取，這裡用 anon key 會回傳空陣列（RLS 保護）
  // 管理員請直接在 Supabase Dashboard 的 Table Editor 查看
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function markMessageRead(id: string) {
  await supabase.from('messages').update({ is_read: true }).eq('id', id);
}
