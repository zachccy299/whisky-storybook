import { Construction } from 'lucide-react';
import { motion } from 'motion/react';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 max-w-lg border-amber-500/20"
      >
        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-amber-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">{title}</h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          我們正在精心釀造這部分的內容，就像熟成中的威士忌一樣，卓越需要時間。敬請期待！
        </p>
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500 font-bold border-b border-amber-500/30 hover:border-amber-500 transition-all pb-1"
        >
          返回上一頁
        </button>
      </motion.div>
    </div>
  );
}
