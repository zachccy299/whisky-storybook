import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { PROCESS_OPTIONS } from '../constants';
import { ContinueExploring } from '../components/ContinueExploring';

export function ProcessMenu() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-amber-500">製程與熟成</h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-lg">
            探索生命之水的誕生過程。從原料選擇到橡木桶裡的歲月沉澱，了解每一種烈酒背後的科學與藝術。
          </p>
        </motion.div>

        {/* 引言 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-8 border-amber-500/30 bg-amber-500/5 relative overflow-hidden mb-4"
        >
          <div className="relative z-10 text-center space-y-4">
            <p className="text-lg md:text-xl font-serif text-amber-200 leading-relaxed italic">
              「整個烈酒世界的基礎系統邏輯就是建構在這五步驟：<br className="hidden md:block" />
              <span className="text-amber-500 font-bold not-italic">取糖、發酵、蒸餾、熟成和後處理</span>」<br />
              只要完全理解這五步驟，就能打通烈酒世界的任督二脈
            </p>
            <p className="text-white/40 text-sm text-right pr-2">～陳正穎 Zach 老鼠</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_OPTIONS.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={opt.path}
                className={cn(
                  "group block relative p-8 rounded-3xl border transition-all duration-500 h-full overflow-hidden",
                  opt.status === 'active'
                    ? "bg-white/5 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10"
                    : "bg-white/[0.02] border-white/5 cursor-default grayscale opacity-60"
                )}
              >
                {/* Background Glow */}
                <div className={cn(
                  "absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-150",
                  opt.color
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500",
                    opt.status === 'active'
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black"
                      : "bg-white/5 border-white/10 text-white/20"
                  )}>
                    <opt.icon className="w-7 h-7" />
                  </div>

                  <h3 className={cn(
                    "text-xl font-bold mb-4 transition-colors duration-300",
                    opt.status === 'active' ? "text-white group-hover:text-amber-500" : "text-white/40"
                  )}>
                    {opt.name}
                  </h3>
                  
                  <p className={cn(
                    "text-sm leading-relaxed mb-8",
                    opt.status === 'active' ? "text-white/40 group-hover:text-white/60" : "text-white/20"
                  )}>
                    {opt.desc}
                  </p>

                  {opt.status === 'active' ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      進入探索 <ArrowRight className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-white/20 uppercase tracking-widest px-3 py-1 rounded-full border border-white/5 inline-block">
                      Coming Soon
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <ContinueExploring />
      </div>
    </div>
  );
}
