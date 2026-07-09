import { motion } from 'motion/react';
import { Gamepad2, RotateCcw, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import { useState, useEffect } from 'react';
import { getUserMistakes } from '../services/supabaseService';

export function ExamHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mistakeCount, setMistakeCount] = useState(0);

  useEffect(() => {
    async function fetchMistakes() {
      if (user) {
        const mistakes = await getUserMistakes(user.id);
        setMistakeCount(mistakes.length);
      }
    }
    fetchMistakes();
  }, [user]);

  const startQuiz = (mode: string, module?: string) => {
    let path = `/exam/quiz?mode=${mode}`;
    if (module) path += `&module=${encodeURIComponent(module)}`;
    navigate(path);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            考試模式選擇
          </motion.h1>
          <p className="text-white/40 max-w-lg mx-auto">選擇最適合你的練習方式，累積經驗並解鎖更深層的知識。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.button whileHover={{ y: -5 }} onClick={() => startQuiz('random')}
            className="group glass-card p-10 text-left border-amber-500/20 hover:border-amber-500/60 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
              <Gamepad2 className="w-24 h-24" />
            </div>
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
              <Gamepad2 className="w-7 h-7 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">全題庫隨機 10 題</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">從所有模塊中隨機抽樣，模擬真實考試環境。適合檢驗綜合能力。</p>
            <div className="flex items-center gap-2 text-amber-500 font-bold group-hover:translate-x-2 transition-transform">
              立即開始 <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>

          <motion.button whileHover={{ y: -5 }}
            onClick={() => user ? startQuiz('mistakes') : navigate('/login')}
            className={cn("group glass-card p-10 text-left border-amber-500/10 hover:border-amber-500/40 transition-all relative overflow-hidden", !user && "opacity-60")}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-amber-500">
              <RotateCcw className="w-24 h-24" />
            </div>
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
              <RotateCcw className="w-7 h-7 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-amber-400">錯題強化模式</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              {user ? `針對您曾經答錯的 ${mistakeCount} 個問題進行專項訓練。` : "登錄以啟用錯題紀錄與強化訓練功能。"}
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-bold group-hover:translate-x-2 transition-transform">
              {user ? "開始複習" : "前往登錄"} <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl flex gap-4 items-start mb-16">
          <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-white/50 leading-relaxed">
            <span className="text-amber-500 font-bold">說明：</span> 登錄後您的成績與錯題將自動存儲。我們會紀錄您最好的 20 次成績並計算月度平均分。排行榜顯示近 30 天最高分記錄。
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="space-y-10 border-t border-white/5 pt-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-amber-500 mb-6">為何要經常來玩？</h2>
            <div className="space-y-6 text-white/70 leading-loose">
              <p>大家取得文憑或證照後，若無經常複習，按照<span className="text-white">學習曲線理論</span>一定會很快忘記！建立這個網站的目的就是讓愛好者和從業人員，可以經常測驗，穩固自己已有的知識。</p>
              <div className="glass-card p-8 border-white/10 bg-white/5">
                <p className="text-sm italic text-white/50 mb-4 font-serif">資料來源與架構</p>
                <p className="text-white/80">我們的題目源自世界各國威士忌法規、製造行業經驗，並參考全球公認的
                  <span className="text-amber-500/80">英國葡萄酒與烈酒教育基金會 (WSET)</span> 和
                  <span className="text-amber-500/80">英國釀造與蒸餾學會 (IBD)</span> 的架構建立。
                </p>
              </div>
              <p className="text-lg text-white/90 font-medium">希望拓展大家對於烈酒的知識系統，以利未來更進一步的學習其他酒類相關知識！</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
