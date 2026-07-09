import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { grantBadge, saveExamResult } from '../services/supabaseService';
import { getAllQuestions } from '../services/supabaseService';
import { UNIT_EXAM_CONFIGS } from '../data/unitExams';
import { Trophy, ArrowRight, Award, AlertCircle, CheckCircle2, XCircle, BookOpen, ChevronDown, ChevronUp, User } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Question } from '../types';
import confetti from 'canvas-confetti';

type Step = 'intro' | 'quiz' | 'result';

export function UnitExam() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const config = unitId ? UNIT_EXAM_CONFIGS[unitId] : null;

  const [step, setStep] = useState<Step>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [history, setHistory] = useState<(Question & { userSelection: string })[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [badgesAwarded, setBadgesAwarded] = useState<{ name: string; image: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number[]>([]);

  useEffect(() => {
    if (!config) return;
    // Filter questions by keyword
    const all = getAllQuestions();
    const filtered = all.filter(q => q.keyword === config.keyword);
    // Shuffle and take up to 10
    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="glass-card p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">單元不存在</h2>
          <Link to="/regulations" className="text-amber-500 underline">返回法規頁面</Link>
        </div>
      </div>
    );
  }

  if (!user && step === 'intro') {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center">
        <div className="glass-card p-12 max-w-md w-full text-center border-amber-500/20">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-6 opacity-60" />
          <h2 className="text-2xl font-serif font-bold mb-4">需要登入帳戶</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            請先登錄以開始本單元的複習考試，並獲得專屬徽章紀錄。
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-amber-500 text-whisky-950 font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            前往登入
          </button>
          <button
            onClick={() => setStep('quiz')}
            className="w-full mt-3 bg-white/5 text-white/60 font-bold py-3 rounded-xl hover:bg-white/10 transition-all text-sm"
          >
            以訪客身份繼續（不儲存成績）
          </button>
        </div>
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500 shadow-blue-500/20 border-blue-500/30',
    amber: 'bg-amber-500 shadow-amber-500/20 border-amber-500/30',
    green: 'bg-green-500 shadow-green-500/20 border-green-500/30',
    indigo: 'bg-indigo-500 shadow-indigo-500/20 border-indigo-500/30',
    pink: 'bg-pink-500 shadow-pink-500/20 border-pink-500/30',
    red: 'bg-red-500 shadow-red-500/20 border-red-500/30',
  };
  const btnColor = colorMap[config.color] || colorMap.amber;
  const textColor = config.color === 'amber' ? 'text-amber-500' : `text-${config.color}-400`;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center border-white/10"
          >
            <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-opacity-10", `bg-${config.color}-500/10`)}>
              <BookOpen className={cn("w-10 h-10", textColor)} />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-3">{config.name}</h1>
            <p className={cn("font-bold text-sm uppercase tracking-widest mb-6", textColor)}>單元複習考試</p>
            <p className="text-white/50 mb-10 leading-relaxed max-w-md mx-auto">
              本複習共 <span className="text-white font-bold">{Math.min(questions.length, 10)} 題</span>，完成後可獲得專屬徽章。滿分可解鎖限定大師徽章！
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10 text-left">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-amber-500/60 text-[11px] font-bold uppercase tracking-widest mb-3">
                  <Award className="w-3 h-3" /> 完成徽章
                </div>
                <img src={config.badgeExplorer.image} alt={config.badgeExplorer.name} className="w-14 h-14 object-contain mb-2" />
                <div className="text-white font-bold text-sm">{config.badgeExplorer.name}</div>
                <div className="text-[11px] text-white/30 mt-1">完成測驗即可獲得</div>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-amber-500/60 text-[11px] font-bold uppercase tracking-widest mb-3">
                  <Trophy className="w-3 h-3" /> 大師徽章
                </div>
                <img src={config.badgeMaster.image} alt={config.badgeMaster.name} className="w-14 h-14 object-contain mb-2" />
                <div className="text-white font-bold text-sm">{config.badgeMaster.name}</div>
                <div className="text-[11px] text-white/30 mt-1">獲得 100 分時解鎖</div>
              </div>
            </div>

            {questions.length === 0 ? (
              <p className="text-white/30 italic mb-6">此單元目前沒有題目，請稍後再試。</p>
            ) : (
              <button
                onClick={() => setStep('quiz')}
                className={cn("group flex items-center gap-3 font-bold px-12 py-4 rounded-full shadow-xl text-white mx-auto", btnColor)}
              >
                <BookOpen className="w-5 h-5" />
                開始複習測驗
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (step === 'quiz') {
    if (questions.length === 0) {
      return (
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-white/40">載入題目中...</div>
        </div>
      );
    }

    const currentQ = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    const handleSelect = (key: string) => {
      if (!isAnswered) setSelectedAnswer(key);
    };

    const handleConfirm = () => {
      if (!selectedAnswer || isAnswered) return;
      setIsAnswered(true);
      setHistory(prev => [...prev, { ...currentQ, userSelection: selectedAnswer }]);
    };

    const handleNext = async () => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(i => i + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Finish
        const fullHistory = [...history];
        const correct = fullHistory.filter(q => q.userSelection === q.correctAnswer).length;
        const finalScore = Math.round((correct / questions.length) * 100);
        const mistakes = fullHistory.filter(q => q.userSelection !== q.correctAnswer);

        setScore(finalScore);
        setCorrectCount(correct);
        setStep('result');

        if (finalScore >= 80) {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#ffd700', '#ffffff'] });
        }

        if (user) {
          setIsSaving(true);
          try {
            const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Anonymous';
            await saveExamResult(user.id, displayName, finalScore, questions.length, mistakes, 0);

            const earned: { name: string; image: string }[] = [];
            await grantBadge(user.id, config.badgeExplorer.id, config.badgeExplorer.name);
            earned.push(config.badgeExplorer);

            if (finalScore === 100) {
              await grantBadge(user.id, config.badgeMaster.id, config.badgeMaster.name);
              earned.push(config.badgeMaster);
            }
            setBadgesAwarded(earned);
          } catch (err) {
            console.error('Failed to save unit exam result', err);
          } finally {
            setIsSaving(false);
          }
        }
      }
    };

    return (
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className={cn("font-bold text-sm", textColor)}>{config.name}</span>
              <span className="text-white/40 font-mono text-sm">第 {currentIdx + 1} / {questions.length} 題</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={cn("h-full", `bg-${config.color}-500`)}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex gap-2">
                <span className={cn("text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", `bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/20`)}>
                  {currentQ.module}
                </span>
                <span className="bg-white/5 text-white/40 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">
                  {currentQ.keyword}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-snug">{currentQ.question}</h2>

              <div className="grid grid-cols-1 gap-4">
                {Object.entries(currentQ.options).map(([key, value]) => {
                  const isCorrect = key === currentQ.correctAnswer;
                  const isSelected = selectedAnswer === key;
                  let style = "border-white/10 hover:border-amber-500/40 bg-white/5";
                  if (isAnswered) {
                    if (isCorrect) style = "border-green-500/50 bg-green-500/10 text-green-400";
                    else if (isSelected) style = "border-red-500/50 bg-red-500/10 text-red-400";
                    else style = "border-white/5 bg-white/3 opacity-40";
                  } else if (isSelected) {
                    style = `border-${config.color}-500 bg-${config.color}-500/10 text-${config.color}-400`;
                  }

                  return (
                    <button
                      key={key}
                      disabled={isAnswered}
                      onClick={() => handleSelect(key)}
                      className={cn("flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group", style)}
                    >
                      <span className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold border transition-colors",
                        isSelected && !isAnswered ? `bg-${config.color}-500 border-${config.color}-500 text-white` : "bg-white/5 border-white/10 text-white/40 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-whisky-950"
                      )}>
                        {key}
                      </span>
                      <p className="pt-1 text-base">{value}</p>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-green-500" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 ml-auto shrink-0 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6"
                >
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">解析</p>
                  <p className="text-white/70 leading-relaxed">{currentQ.explanation}</p>
                </motion.div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/5">
                {!isAnswered ? (
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedAnswer}
                    className={cn("font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 text-white", `bg-${config.color}-500`)}
                  >
                    送出答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-white text-whisky-950 font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    {currentIdx === questions.length - 1 ? "查看成果" : "下一題"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  const scoreColor = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-amber-500' : 'text-red-400';
  const scoreLabel = score === 100 ? '完美！大師徽章解鎖！' : score >= 80 ? '優秀！探險家徽章獲得！' : score >= 60 ? '良好，繼續加油！' : '再接再厲！';

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center border-amber-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold mb-2">{config.name} 單元複習完成！</h1>
          <p className="text-white/40 italic mb-8">{scoreLabel}</p>

          <div className={cn("text-7xl font-black font-serif mb-4", scoreColor)}>
            {score}<span className="text-2xl ml-1 opacity-50">%</span>
          </div>

          <div className="flex justify-center gap-8 text-sm text-white/40 mb-8">
            <div><span className="text-green-400 font-bold text-xl">{correctCount}</span> 答對</div>
            <div><span className="text-red-400 font-bold text-xl">{questions.length - correctCount}</span> 答錯</div>
          </div>

          {/* Badges */}
          {(isSaving || badgesAwarded.length > 0) && (
            <div className="mb-8">
              <h3 className="text-xs font-bold text-amber-500/60 uppercase tracking-widest mb-6">
                {isSaving ? '正在儲存徽章...' : '🎖️ 獲得新徽章！'}
              </h3>
              {isSaving ? (
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <div className="flex justify-center gap-8">
                  {badgesAwarded.map((badge, i) => (
                    <motion.div
                      key={badge.name}
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.2, type: 'spring' }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-24 h-24 rounded-full border-4 border-amber-500/40 shadow-xl shadow-amber-500/20 mb-3 overflow-hidden bg-whisky-900 p-1">
                        <img src={badge.image} alt={badge.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-white font-bold text-sm">{badge.name}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!user && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-500 mb-6">
              💡 <Link to="/login" className="underline font-bold">登錄帳號</Link> 才能儲存成績和獲得徽章！
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={config.returnPath}
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-full border border-white/10 hover:bg-white/20 transition-all"
            >
              返回單元
            </Link>
            <button
              onClick={() => { setStep('intro'); setCurrentIdx(0); setSelectedAnswer(null); setIsAnswered(false); setHistory([]); setBadgesAwarded([]); }}
              className={cn("flex items-center justify-center gap-2 font-bold px-8 py-3 rounded-full text-white transition-all hover:scale-105", `bg-${config.color}-500`)}
            >
              再試一次
            </button>
            {user && (
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 bg-amber-500 text-whisky-950 font-bold px-8 py-3 rounded-full hover:scale-105 transition-all"
              >
                <User className="w-4 h-4" /> 查看我的徽章
              </Link>
            )}
          </div>
        </motion.div>

        {/* Review */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ChevronDown className="w-6 h-6 text-amber-500" /> 題目回顧與解析
          </h2>
          {history.map((q, idx) => {
            const isCorrect = q.userSelection === q.correctAnswer;
            const isExpanded = expandedIdx.includes(idx);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={cn("glass-card overflow-hidden", isCorrect ? "border-green-500/20" : "border-red-500/20")}
              >
                <button
                  className="w-full p-6 text-left flex items-start gap-4"
                  onClick={() => setExpandedIdx(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}
                >
                  {isCorrect
                    ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    : <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-relaxed">{q.question}</p>
                    {!isCorrect && (
                      <p className="mt-1 text-xs text-red-400">
                        你的答案：{q.userSelection}. {q.options[q.userSelection as keyof typeof q.options]}
                      </p>
                    )}
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                      <p className="text-xs text-green-400 font-bold mb-1">正確答案</p>
                      <p className="text-sm">{q.correctAnswer}. {q.options[q.correctAnswer]}</p>
                    </div>
                    {q.explanation && (
                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                        <p className="text-xs text-amber-500 font-bold mb-1">解析</p>
                        <p className="text-sm text-white/70 leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
