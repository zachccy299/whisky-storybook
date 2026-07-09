import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { getUserStats, getUserMistakes, getUserExamResults, updateDisplayName, ensureUserProfile } from '../services/supabaseService';
import { User, LogOut, Target, BarChart3, RotateCcw, Edit2, Check, X, Trophy, Lock, Share2, Download, X as Close, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { toPng } from 'html-to-image';
import { ShareCard, ShareButtons } from '../components/ShareCard';

// 所有徽章定義（包含未獲得的）
const ALL_BADGES = [
  { id: 'clan-explorer',       name: '氏族探險家',    image: '/badges/clan_explorer.png',      hint: '完成蘇格蘭單元複習' },
  { id: 'scotland-the-brave',  name: '蘇格蘭勇士',    image: '/badges/scotlandthebrave.png',   hint: '蘇格蘭單元100分' },
  { id: 'bourbon-trailblazer', name: '波本開拓者',    image: '/badges/bourbontrailblazer.png', hint: '完成美國單元複習' },
  { id: 'bourbon-sheriff',     name: '波本警長',      image: '/badges/bourbonsheriff.png',     hint: '美國單元100分' },
  { id: 'emerald-isle-rover',  name: '翡翠島漫遊者',  image: '/badges/emeraldislerover.png',   hint: '完成愛爾蘭單元複習' },
  { id: 'celtic-warrior',      name: '凱爾特戰士',    image: '/badges/celticwarrior.png',      hint: '愛爾蘭單元100分' },
  { id: 'seeker-of-spirits',   name: '烈酒探索者',    image: '/badges/seekerofspirits.png',    hint: '完成歐盟單元複習' },
  { id: 'whisky-alchemist',    name: '威士忌煉金術師', image: '/badges/whiskyalchemist.png',   hint: '歐盟單元100分' },
  { id: 'ashigaru-of-whisky',  name: '威士忌足輕',    image: '/badges/ashigaruofwhisky.png',  hint: '完成日本單元複習' },
  { id: 'whisky-samurai',      name: '威士忌武士',    image: '/badges/whiskysamurai.png',      hint: '日本單元100分' },
  { id: 'maple-wanderer',      name: '楓葉漫遊者',    image: '/badges/maplewanderer.png',      hint: '完成加拿大單元複習' },
  { id: 'canadian-mountie',    name: '加拿大騎警',    image: '/badges/canadianmountie.png',    hint: '加拿大單元100分' },
];

export function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [updatingName, setUpdatingName] = useState(false);

  // Badge modal
  const [selectedBadge, setSelectedBadge] = useState<typeof ALL_BADGES[0] | null>(null);
  const [showBadgeShare, setShowBadgeShare] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const badgeCardRef = useRef<HTMLDivElement>(null);

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
  const photoUrl = user?.user_metadata?.avatar_url;

  // 從分享連結進來時（/profile?badge=xxx），自動打開對應徽章彈窗
  useEffect(() => {
    const badgeId = searchParams.get('badge');
    if (badgeId) {
      const badge = ALL_BADGES.find((b) => b.id === badgeId);
      if (badge) setSelectedBadge(badge);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          await ensureUserProfile(user.id, displayName, photoUrl || '');
          const [{ stats, badges }, userMistakes, results] = await Promise.all([
            getUserStats(user.id),
            getUserMistakes(user.id),
            getUserExamResults(user.id),
          ]);
          setStats(stats);
          setEarnedBadgeIds(new Set(badges.map((b: any) => b.badge_id)));
          setMistakes(userMistakes);
          setRecentResults(results);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    if (!authLoading) fetchData();
  }, [user, authLoading, isAdmin]);

  const handleUpdateName = async () => {
    if (!user || !newName.trim()) { setIsEditingName(false); return; }
    const trimmed = newName.trim();
    if (trimmed.length > 16 || !/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(trimmed)) {
      alert("暱稱只能包含英文、數字和中文，且不超過16字"); return;
    }
    setUpdatingName(true);
    try { await updateDisplayName(user.id, trimmed); setIsEditingName(false); }
    catch (e) { alert("更新暱稱失敗"); }
    finally { setUpdatingName(false); }
  };

  const handleBadgeDownload = async () => {
    if (!badgeCardRef.current || !selectedBadge) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(badgeCardRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: '#16140d' });
      const link = document.createElement('a');
      link.download = `badge-${selectedBadge.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) { console.error(e); }
    finally { setIsGenerating(false); }
  };

  const handleBadgeShare = async (platform: string) => {
    if (platform === 'Instagram') {
      await handleBadgeDownload();
      alert('圖片已下載！請手動上傳到 Instagram。');
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="glass-card p-10 max-w-md text-center">
          <Lock className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-4">需要登入</h1>
          <p className="text-white/60 mb-8">登入後才能查看您的學習紀錄、成績和徽章。</p>
          <button onClick={() => navigate('/login')} className="w-full bg-amber-500 text-whisky-950 font-bold py-4 rounded-full hover:scale-105 transition-all">
            前往登入
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (s: number) => {
    if (!s) return '--';
    const m = Math.floor(s / 60); const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const siteUrl = 'https://whiskystorybook-521.pages.dev';
  const ogWorkerUrl = 'https://whisky-og-worker.zach-7cf.workers.dev';

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/30 overflow-hidden bg-whisky-800 flex items-center justify-center">
              {photoUrl ? <img src={photoUrl} alt={displayName} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-amber-500/50" />}
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input type="text" value={newName} onChange={e => setNewName(e.target.value)} maxLength={16} autoFocus
                    className="bg-white/10 border border-amber-500/40 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-amber-500" />
                  <button onClick={handleUpdateName} disabled={updatingName} className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30"><Check className="w-4 h-4" /></button>
                  <button onClick={() => setIsEditingName(false)} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-serif font-bold">{displayName}</h1>
                  <button onClick={() => { setIsEditingName(true); setNewName(displayName); }}
                    className="p-1.5 bg-white/5 rounded-lg text-white/30 hover:text-amber-500 hover:bg-amber-500/10 transition-all">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <p className="text-white/40 text-sm mt-1">{user.email}</p>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 mt-2 text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3" /> 管理員
                </span>
              )}
            </div>
            <button onClick={signOut} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors">
              <LogOut className="w-4 h-4" /> 登出
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: '本月測驗', value: stats.total_exams_this_month || 0, icon: BarChart3, color: 'text-blue-400' },
              { label: '月平均分', value: `${Math.round(stats.monthly_average || 0)}%`, icon: Target, color: 'text-amber-500' },
              { label: '錯題數量', value: mistakes.length, icon: RotateCcw, color: 'text-red-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 text-center">
                <Icon className={cn("w-6 h-6 mx-auto mb-2", color)} />
                <div className={cn("text-2xl font-serif font-bold", color)}>{value}</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── All Badges ─────────────────────────────────────────────────────── */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            🎖️ 我的徽章收藏
          </h2>
          <p className="text-white/30 text-xs mb-6">
            已獲得 {earnedBadgeIds.size} / {ALL_BADGES.length} 枚 · 點擊徽章可放大並分享
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {ALL_BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.id);
              return (
                <motion.button
                  key={badge.id}
                  whileHover={{ scale: earned ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedBadge(badge); setShowBadgeShare(false); }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                    earned
                      ? "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer"
                      : "border-white/5 bg-white/3 opacity-30 grayscale cursor-pointer"
                  )}
                  title={earned ? badge.name : `🔒 ${badge.hint}`}
                >
                  <div className={cn("w-14 h-14 rounded-full overflow-hidden", earned ? "ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/10" : "")}>
                    <img src={badge.image} alt={badge.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-bold text-center leading-tight text-white/60">{badge.name}</span>
                  {!earned && <span className="text-[10px] text-white/20">🔒 未解鎖</span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recent Results */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Trophy className="w-6 h-6 text-amber-500" /> 近期成績</h2>
          {recentResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/30 text-sm italic mb-4">還沒有成績紀錄，趕快去測驗吧！</p>
              <Link to="/exam" className="inline-flex items-center gap-2 bg-amber-500 text-whisky-950 font-bold px-6 py-3 rounded-full hover:scale-105 transition-all text-sm">前往測驗</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentResults.map((result, idx) => (
                <div key={result.id || idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className={cn("text-xl font-serif font-bold", result.score >= 80 ? 'text-green-400' : result.score >= 60 ? 'text-amber-500' : 'text-red-400')}>
                      {result.score}%
                    </div>
                    <div className="text-xs text-white/30 mt-1">{new Date(result.created_at).toLocaleString('zh-TW')}</div>
                  </div>
                  <div className="text-right text-xs text-white/40">
                    <div>{result.total} 題</div>
                    <div>{formatTime(result.time_taken)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mistakes */}
        {mistakes.length > 0 && (
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><RotateCcw className="w-6 h-6 text-red-400" /> 錯題本</h2>
              <Link to="/exam/quiz?mode=mistakes" className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-full hover:bg-red-500/30 transition-all">
                開始複習
              </Link>
            </div>
            <div className="space-y-2">
              {mistakes.slice(0, 5).map((m, idx) => (
                <div key={idx} className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <p className="text-sm text-white/70">{m.question?.question}</p>
                  <p className="text-xs text-red-400 mt-1">錯誤 {m.fail_count} 次</p>
                </div>
              ))}
              {mistakes.length > 5 && <p className="text-xs text-white/30 text-center">...還有 {mistakes.length - 5} 道錯題</p>}
            </div>
          </div>
        )}
      </div>


      {/* ── Badge Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedBadge(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative glass-card p-8 max-w-sm w-full text-center border-amber-500/30 z-10"
            >
              <button onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Close className="w-4 h-4" />
              </button>

              <div className={cn(
                "w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4",
                earnedBadgeIds.has(selectedBadge.id)
                  ? "border-amber-500/50 shadow-2xl shadow-amber-500/20"
                  : "border-white/10 grayscale opacity-50"
              )}>
                <img src={selectedBadge.image} alt={selectedBadge.name} className="w-full h-full object-contain" />
              </div>

              <h3 className="text-2xl font-serif font-bold mb-2">{selectedBadge.name}</h3>
              <p className="text-white/40 text-sm mb-4">{selectedBadge.hint}</p>

              {earnedBadgeIds.has(selectedBadge.id) ? (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-500 rounded-full text-sm font-bold mb-6">
                    ✅ 已獲得
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowBadgeShare(!showBadgeShare)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all"
                    >
                      <Share2 className="w-4 h-4" /> 分享此徽章
                    </button>
                    {showBadgeShare && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Hidden badge share card */}
                        <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
                          <ShareCard
                            ref={badgeCardRef}
                            score={0}
                            correctCount={0}
                            total={0}
                            type="badge"
                            badgeName={selectedBadge.name}
                            badgeImage={selectedBadge.image}
                            userName={displayName}
                          />
                        </div>
                        <ShareButtons
                          onDownload={handleBadgeDownload}
                          onShare={handleBadgeShare}
                          isGenerating={isGenerating}
                          shareUrl={`${ogWorkerUrl}/badge/share?id=${selectedBadge.id}`}
                          shareText={`我在「有趣的威士忌故事書」獲得了「${selectedBadge.name}」徽章！`}
                        />
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white/30 rounded-full text-sm">
                  🔒 尚未解鎖 · {selectedBadge.hint}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
