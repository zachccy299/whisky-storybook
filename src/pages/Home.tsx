import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { EXPLORE_SECTIONS } from '../constants';
import { MessageForm } from '../components/MessageForm';

export function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?q=80&w=2070&auto=format&fit=crop" 
            alt="Whisky Bar" 
            className="w-full h-full object-cover opacity-30 scale-105 blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-whisky-950/40 via-whisky-950/80 to-whisky-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 uppercase tracking-[0.3em] font-medium text-sm mb-4 block">
              The Spirits of the Spirits
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
              品味佳酩，<br />
              <span className="text-amber-500 italic">開拓</span>視野。
            </h1>
            <p className="text-lg md:text-xl text-white/65 mb-4 max-w-2xl mx-auto leading-relaxed">
              無論您是愛好者或從業人員，這裡提供全網最完整紮實的威士忌與各種烈酒的知識系統、法規解析、釀造生產和專業題目與詳解，與您一起踏入琥珀色的殿堂，持續探索The spirits of the Spirits。
            </p>
            <p className="text-xs text-white/35 mb-10 max-w-2xl mx-auto leading-relaxed">
              本站之知識系統架構為各國酒類相關法律資料、英國釀造與蒸餾學會(CIBD)、英國葡萄酒與烈酒教育基金會(WSET)和個人超過十年以上之酒廠建造、生產管理和技術研發和超過200間威士忌與烈酒相關酒廠與供應商之參訪交流經驗。
            </p>
            <Link 
              to="/exam"
              className="group relative inline-flex items-center gap-3 bg-amber-500 text-whisky-950 font-bold px-8 py-4 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              <span>立即挑戰測驗</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-1 h-12 rounded-full border border-white/20 flex justify-center p-1">
                <div className="w-1 h-3 bg-amber-500 rounded-full" />
            </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-amber-500/10 text-9xl font-serif select-none pointer-events-none">
            &ldquo;
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-white/85 leading-relaxed relative z-10 flex flex-col gap-2">
            <span>如何最簡單的定義威士忌，要我說就是一種</span>
            <span className="text-amber-500">液態法穀物蒸餾酒再加上木桶陳年</span>
          </p>
          <p className="mt-4 text-amber-500/60 font-medium tracking-widest text-sm">
            — by 陳正穎 Zach Chen (有趣酒業聯合創辦人)
          </p>
        </motion.div>
      </section>

      {/* Modules Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPLORE_SECTIONS.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={cat.path}
                className={cn(
                    "group glass-card p-8 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 relative overflow-hidden",
                    cat.path === '/exam' && "border-amber-500/40 amber-glow"
                )}
              >
                <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20 rounded-full bg-gradient-to-br", cat.color)} />
                
                <div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-colors">
                    <cat.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 group-hover:text-white/65 transition-colors">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-amber-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  進入探索 <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Message Section */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold mb-3">給老鼠留個話</h2>
          <p className="text-white/40">有任何問題、建議或想說的話，都歡迎留言！</p>
        </div>
        <MessageForm
          title="留下你的話"
          subtitle="老鼠會看到每一則留言 🐭🥃"
          placeholder="你好！我想說..."
        />
      </section>
    </div>
  );
}
