import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getTopScores } from '../services/supabaseService';
import { Trophy, Medal, Award, User } from 'lucide-react';

export function Leaderboard() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopScores().then(data => { setScores(data); setLoading(false); });
  }, []);

  const maskName = (name: string) => {
    if (!name) return 'Anonymous';
    if (/[\u4e00-\u9fa5]/.test(name)) {
      return name.length <= 1 ? name : 'O'.repeat(name.length - 1) + name.slice(-1);
    }
    return name.split(' ')[0];
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  if (loading) {
    return <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <section className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Trophy className="w-12 h-12 text-amber-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">成績排行榜</h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/40 uppercase tracking-widest mb-6">
            <Award className="w-3 h-3 text-amber-500/50" />
            顯示近 30 天內前 30 名不重複玩家
          </div>
          <p className="text-white/60 leading-relaxed max-w-xl mx-auto italic">「理解法規與製程，開啟另一種欣賞佳釀的角度。」</p>
        </section>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 items-end gap-2 md:gap-6 pt-12">
          {[1, 0, 2].map((rank) => {
            const s = scores[rank];
            const heights = [24, 44, 20];
            const colors = ['slate-400', 'amber-500', 'orange-700'];
            const medals = [Medal, Trophy, Award];
            const MedalIcon = medals[rank];
            if (!s) return <div key={rank} />;
            return (
              <div key={rank} className="flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rank * 0.1 }}
                  className={`text-center mb-4 ${rank === 0 ? 'scale-110' : ''}`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-${colors[rank]} p-1 mb-2 overflow-hidden bg-whisky-900`}>
                    <User className="w-full h-full opacity-50" />
                  </div>
                  <div className={`text-xs font-bold text-${colors[rank]} uppercase truncate max-w-[100px] mb-1`}>{maskName(s.user_name)}</div>
                  <div className={`text-[16px] font-serif font-black text-${colors[rank]}`}>{s.score}%</div>
                  <div className="text-[10px] text-white/30 font-mono">{formatTime(s.time_taken)}</div>
                </motion.div>
                <div className={`w-full h-${heights[rank]} bg-gradient-to-t from-${colors[rank]}/20 to-${colors[rank]}/5 border-x border-t border-${colors[rank]}/30 rounded-t-2xl flex items-center justify-center relative`}>
                  <MedalIcon className={`w-8 h-8 text-${colors[rank]}`} />
                  <span className={`absolute -bottom-6 text-xl font-serif font-bold text-${colors[rank]}`}>{rank + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <section className="pt-12">
          <div className="glass-card border-white/5 divide-y divide-white/5">
            {scores.slice(3).map((s, idx) => (
              <div key={s.id || idx} className="p-6 flex items-center gap-6 group hover:bg-white/5 transition-colors">
                <div className="w-8 text-[14px] font-mono text-white/20 font-bold">#{idx + 4}</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                  <User className="w-5 h-5 text-white/20" />
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-white/80 group-hover:text-amber-500 transition-colors uppercase text-sm">{maskName(s.user_name)}</div>
                  <div className="flex items-center gap-3 text-[11px] text-white/20 font-mono mt-0.5">
                    <span>{new Date(s.created_at).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span>{formatTime(s.time_taken)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-serif font-bold text-amber-500">{s.score}<span className="text-[11px] ml-1 opacity-50">%</span></div>
                  <div className="text-[11px] text-white/30 uppercase tracking-widest">{s.total} Questions</div>
                </div>
              </div>
            ))}
            {scores.length === 0 && (
              <div className="p-20 text-center text-white/20 italic"><p>玩家排行榜等待排名。</p></div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
