import React from 'react';
import { motion } from 'motion/react';
import { Split, ChevronRight, Quote, Gavel } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

import { REGIONS } from '../constants';

export function Regulations() {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20"
          >
            <Gavel className="w-3.5 h-3.5" />
            Global Whisky Law
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">法規與產區</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            威士忌的定義受法律嚴格保護。了解各國法規，是深入探索威士忌世界的第一步。
          </p>
        </section>

        {/* Philosophical Base */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 border-amber-500/30 bg-amber-500/5 relative overflow-hidden"
          >
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-amber-500/10 rotate-12" />
            <div className="relative z-10 text-center space-y-6">
              <p className="text-xl md:text-2xl font-serif text-amber-200 leading-relaxed italic">
                「液態法穀物蒸餾酒再加上木桶陳年」對應各國法規，就能明白對威士忌規範的態度：<br className="hidden md:block" />
                <span className="text-amber-500 font-bold not-italic">「酒怎麼來？桶怎麼用？在哪生產？」</span>
              </p>
              <p className="text-white/40 text-sm text-right pr-2">～陳正穎 Zach 老鼠</p>
              <div className="h-px w-20 bg-amber-500/30 mx-auto" />
              <p className="text-white/60 text-lg">
                濃縮成酒鬼們的最愛就是<br />
                <span className="text-amber-500 font-bold text-3xl mt-4 block tracking-tighter">「酒桶在哪？」</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Global Regulation Map */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-10">
            <Split className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold font-serif">探索全球威士忌法規 (Explore the Global Whisky Regulations)</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {REGIONS.map((reg) => (
  <Link 
    key={reg.name}
    to={reg.path}
    className={cn(
      "group relative aspect-square p-6 rounded-2xl border transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-between overflow-hidden",
      reg.color,
      location.pathname === reg.path ? "ring-2 ring-amber-500/50" : ""
    )}
  >
    {reg.bgImage && (
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 scale-100 group-hover:scale-110"
        style={{ backgroundImage: `url(${reg.bgImage})` }}
      />
    )}

    {/* 漸層遮罩，讓文字可讀 */}
    <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/60" />

    <div className="relative z-10">
      <div className="text-[11px] opacity-60 mb-1 font-bold uppercase tracking-widest text-white/70">Whisky Law</div>
      <div className="font-bold text-white group-hover:text-amber-200 transition-colors text-lg drop-shadow-lg">{reg.name}</div>
    </div>

    <div className="relative z-10 mt-auto flex items-center gap-1 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity text-amber-400">
      Explore <ChevronRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
))}
          </div>

          <div className="mt-12 glass-card p-12 text-center border-dashed border-white/10 opacity-60">
            <p className="text-white/40 italic">點擊區域，探索更詳盡的法規細節...</p>
          </div>
        </section>
      </div>
    </div>
  );
}

