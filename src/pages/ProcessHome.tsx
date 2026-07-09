import { motion } from 'motion/react';
import { ArrowRight, Shapes, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContinueExploring } from '../components/ContinueExploring';

const ENTRY_LINKS = [
  {
    name: '系統分類',
    desc: '依原料來源拆解烈酒家族樹，看懂威士忌、白蘭地、琴酒之間的關係',
    path: '/process/classification',
    icon: Shapes,
  },
  {
    name: '製程',
    desc: '從取糖、發酵、蒸餾到熟成，深入了解烈酒誕生的每一個步驟',
    path: '/process/menu',
    icon: Cog,
  },
];

export function ProcessHome() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-amber-500">
            全球烈酒系統
          </h1>
        </motion.div>

        {/* 文字介紹 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl border border-amber-500/20 bg-white/[0.02] mb-12"
        >
          <p className="text-white/60 leading-relaxed text-base md:text-lg mb-5">
            全世界在13-14世紀後，因為歐洲、中亞和亞洲之間的貿易與戰爭，以及之後發展的大航海時代，讓蒸餾技術傳播世界各地。於是各地會依照當地能取得的農作物原料，透過發酵、蒸餾和熟成等，創造了具有各自風格的烈酒。
          </p>
          <p className="text-white/60 leading-relaxed text-base md:text-lg">
            本網站蒐集並整理全球常見的烈酒，依照不同的特點進行分類，讓喜歡和研究烈酒的同好們能夠快速了解各種烈酒的差異，在品嚐不同烈酒產品時，能透過其差異感受其中有趣的地方。
          </p>
        </motion.div>

        {/* 兩大入口 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ENTRY_LINKS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={item.path}
                className="group block relative p-8 rounded-3xl border border-amber-500/30 bg-white/5 hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-500 h-full overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-8 text-white/40 group-hover:text-white/60">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    進入探索 <ArrowRight className="w-4 h-4" />
                  </div>
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
