import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, XCircle, Info } from 'lucide-react';
import type { Question, ExamResult } from '../types';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import {
  getRandomQuestions, getQuestionsByModule, getUserMistakes,
  getUserProgress, updateUserProgress, saveExamResult, saveModuleReviewResult
} from '../services/supabaseService';

export function Quiz() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get('mode') || 'random';
  const module = searchParams.get('module');

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [history, setHistory] = useState<(Question & { userSelection: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());
  const seenIdsRef = useRef<string[]>([]);

  useEffect(() => {
    async function initQuiz() {
      setLoading(true);
      setErrorNotice(null);
      try {
        let seenIds: string[] = [];

        // Load from localStorage first
        const localSeen = localStorage.getItem('guest_seen_questions');
        if (localSeen) {
          try { seenIds = JSON.parse(localSeen); } catch (_) {}
        }

        if (user) {
          const remoteProgress = await getUserProgress(user.id);
          seenIds = Array.from(new Set([...seenIds, ...remoteProgress]));
        }

        seenIdsRef.current = seenIds;

        if (mode === 'mistakes' && user) {
          const userMistakes = await getUserMistakes(user.id);
          setQuizQuestions(userMistakes.map(m => m.question));
        } else if (mode === 'module' && module) {
          const moduleQs = getQuestionsByModule(module);
          const excluded = seenIds;
          const fresh = moduleQs.filter(q => !excluded.includes(q.id));
          setQuizQuestions((fresh.length > 0 ? fresh : moduleQs).sort(() => Math.random() - 0.5).slice(0, 10));
        } else {
          setQuizQuestions(getRandomQuestions(10, seenIds));
        }
      } catch (error: any) {
        setErrorNotice(error.message || '載入題目失敗');
      } finally {
        setLoading(false);
      }
    }
    initQuiz();
  }, [mode, module, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (errorNotice) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md text-center border-red-500/30">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">哎呀！出錯了</h2>
          <p className="text-white/60 mb-8">{errorNotice}</p>
          <button onClick={() => navigate('/exam')} className="w-full bg-amber-500 text-whisky-950 font-bold py-3 rounded-full hover:scale-105 transition-all">返回測驗中心</button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md text-center">
          <Info className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">暫無題目</h2>
          <p className="text-white/60 mb-8">此模組目前沒有可用的題目。</p>
          <button onClick={() => navigate('/exam')} className="w-full bg-amber-500 text-whisky-950 font-bold py-3 rounded-full hover:scale-105 transition-all">返回測驗中心</button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  const handleSelect = (key: string) => { if (!isAnswered) setSelectedAnswer(key); };

  const handleConfirm = () => {
    if (!selectedAnswer || isAnswered) return;
    setIsAnswered(true);
    setHistory(prev => [...prev, { ...currentQuestion, userSelection: selectedAnswer }]);
  };

  const nextQuestion = async () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsSubmitting(true);
      try {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const correctCount = history.filter(q => q.userSelection === q.correctAnswer).length;
        const scorePercentage = Math.round((correctCount / history.length) * 100);
        const mistakes = history.filter(q => q.userSelection !== q.correctAnswer);

        if (user) {
          const newSeenIds = Array.from(new Set([...seenIdsRef.current, ...quizQuestions.map(q => q.id)]));
          localStorage.setItem('guest_seen_questions', JSON.stringify(newSeenIds));
          await updateUserProgress(user.id, newSeenIds);

          const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Anonymous';

          if (mode === 'module' && module) {
            await saveModuleReviewResult(user.id, displayName, scorePercentage, quizQuestions.length, module, mistakes);
          } else {
            await saveExamResult(user.id, displayName, scorePercentage, quizQuestions.length, mistakes, timeTaken);
          }
        }

        const result: ExamResult = {
          score: scorePercentage,
          correctCount,
          total: quizQuestions.length,
          questions: history,
          timestamp: new Date().toISOString(),
          timeTaken,
        };
        sessionStorage.setItem('latest-exam-result', JSON.stringify(result));
        navigate('/exam/result');
      } catch (error: any) {
        setErrorNotice(`儲存成績時出錯: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold text-2xl">第 {currentIndex + 1}</span>
              <span className="text-white/40">/ {quizQuestions.length} 題</span>
            </div>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-amber-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
          </div>
        </div>

        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
          <div className="flex gap-2">
            <span className="bg-amber-500/20 text-amber-500 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/20">{currentQuestion.module}</span>
            <span className="bg-white/5 text-white/40 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">{currentQuestion.keyword}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-snug">{currentQuestion.question}</h2>

          <div className="grid grid-cols-1 gap-4">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isCorrect = key === currentQuestion.correctAnswer;
              const isSelected = selectedAnswer === key;
              let buttonState = "border-white/10 hover:border-amber-500/40 bg-white/5";
              if (isAnswered) {
                if (isCorrect) buttonState = "border-green-500/50 bg-green-500/10 text-green-400";
                else if (isSelected) buttonState = "border-white ring-2 ring-white bg-white/10 text-white";
                else buttonState = "border-white/10 bg-white/5 opacity-50";
              } else if (isSelected) {
                buttonState = "border-amber-500 bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/50";
              }
              return (
                <button key={key} disabled={isAnswered} onClick={() => handleSelect(key)}
                  className={cn("flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group", buttonState)}>
                  <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold border transition-colors",
                    isSelected ? "bg-amber-500 border-amber-500 text-whisky-950" : "bg-white/5 border-white/10 text-white/40 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-whisky-950")}>
                    {key}
                  </span>
                  <p className="pt-1 text-lg">{value}</p>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 ml-auto shrink-0 text-green-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">解析</p>
              <p className="text-white/70 leading-relaxed">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <footer className="pt-8 flex justify-end items-center gap-4 border-t border-white/5">
            {!isAnswered ? (
              <button onClick={handleConfirm} disabled={!selectedAnswer}
                className="bg-amber-500 disabled:bg-white/10 disabled:text-white/20 text-whisky-950 font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                送出答案
              </button>
            ) : (
              <button onClick={nextQuestion} disabled={isSubmitting}
                className="bg-white disabled:opacity-50 text-whisky-950 font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                {isSubmitting ? "正在儲存..." : (currentIndex === quizQuestions.length - 1 ? "查看成果" : "下一題")}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            )}
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
