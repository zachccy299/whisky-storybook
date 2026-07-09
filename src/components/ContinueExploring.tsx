import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EXPLORE_SECTIONS } from '../constants';
import { cn } from '../lib/utils';

export function ContinueExploring() {
  return (
    <div className="mt-24">
      <h3 className="text-2xl font-serif font-bold text-center mb-10 text-amber-500/80 uppercase tracking-widest">繼續探索</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXPLORE_SECTIONS.map((page, i) => (
          <motion.div
            key={page.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="group glass-card p-6 h-full flex flex-col justify-between hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className={cn("absolute -top-10 -right-10 w-24 h-32 blur-3xl opacity-10 rounded-full bg-gradient-to-br", page.color)} />
              <div>
                <Link to={page.path} className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  <page.icon className="w-5 h-5 text-amber-500" />
                </Link>
                <Link to={page.path}>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-amber-500 transition-colors">{page.title}</h4>
                </Link>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{page.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {page.subLinks.map(sub => (
                    <Link 
                      key={sub.name}
                      to={sub.path}
                      className="text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/40 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to={page.path} className="mt-6 flex items-center gap-1 text-xs font-bold text-amber-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                進入專區 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
