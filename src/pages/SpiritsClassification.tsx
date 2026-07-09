import { motion } from 'motion/react';
import { Network } from 'lucide-react';
import { SPIRITS_CLASSIFICATIONS } from '../constants';

const COLOR_MAP: Record<
  string,
  { border: string; text: string; bgGrad: string; dot: string; lineBg: string; chip: string }
> = {
  amber: {
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bgGrad: 'from-amber-500/10 to-amber-500/0',
    dot: 'bg-amber-500',
    lineBg: 'bg-amber-500/20',
    chip: 'bg-amber-500/15',
  },
  rose: {
    border: 'border-rose-400/30',
    text: 'text-rose-300',
    bgGrad: 'from-rose-400/10 to-rose-400/0',
    dot: 'bg-rose-400',
    lineBg: 'bg-rose-400/20',
    chip: 'bg-rose-400/15',
  },
  sky: {
    border: 'border-sky-400/30',
    text: 'text-sky-300',
    bgGrad: 'from-sky-400/10 to-sky-400/0',
    dot: 'bg-sky-400',
    lineBg: 'bg-sky-400/20',
    chip: 'bg-sky-400/15',
  },
  emerald: {
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    bgGrad: 'from-emerald-400/10 to-emerald-400/0',
    dot: 'bg-emerald-400',
    lineBg: 'bg-emerald-400/20',
    chip: 'bg-emerald-400/15',
  },
};

export function SpiritsClassification() {
  return (
    <div className="min-h-screen bg-whisky-950 pt-28 md:pt-32 pb-40 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-black text-amber-500/60 uppercase tracking-[0.2em] mb-4">
            <Network className="w-3.5 h-3.5" />
            全球烈酒系統 · 系統分類
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            烈酒分類地圖
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            同一支烈酒，可以從不同的角度被認識。這裡用多種分類視角拆解全球烈酒——
            從原料的源頭、取糖與發酵的方式，到蒸餾與熟成的工藝，層層拆解風味背後的邏輯。
          </p>
        </motion.div>

        {SPIRITS_CLASSIFICATIONS.map((system, sIdx) => {
          const titleSuffix = system.title.slice(-2);
          const titleHighlight = system.title.slice(0, -2);
          return (
          <div
            key={system.id}
            className={sIdx > 0 ? 'mt-24 pt-20 border-t border-amber-500/10' : ''}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-amber-500 font-bold flex items-center justify-center gap-4 md:gap-5 flex-wrap">
                <span>依</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-amber-500/40 bg-whisky-900 shadow-[0_0_30px_rgba(212,175,55,0.15)] text-amber-400"
                >
                  <span className="text-xl md:text-2xl font-bold whitespace-nowrap">{titleHighlight}</span>
                  <span className="text-white/40 text-[11px] uppercase tracking-widest mt-1.5">
                    {system.rootLabelEn.toUpperCase()}
                  </span>
                </motion.span>
                <span>{titleSuffix}</span>
              </h2>
            </motion.div>

            {/* 連接線 */}
            <div className="flex flex-col items-center mb-2">
              <div className="w-px h-8 md:h-10 bg-amber-500/30" />
              <div className="hidden md:block w-2/3 h-px bg-amber-500/30" />
            </div>

            {/* Branches */}
            <div
              className={`grid gap-8 md:gap-8 ${
                system.branches.length === 4
                  ? 'md:grid-cols-2 lg:grid-cols-4'
                  : system.branches.length === 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2'
              }`}
            >
              {system.branches.map((branch, idx) => {
                const c = COLOR_MAP[branch.color];
                return (
                  <motion.div
                    key={branch.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="relative"
                  >
                    <div
                      className={`hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 ${c.dot} opacity-30`}
                    />
                    <div
                      className={`rounded-2xl border ${c.border} bg-gradient-to-b ${c.bgGrad} bg-whisky-900 p-6 h-full`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                        <h3 className={`font-serif text-xl font-bold ${c.text}`}>{branch.name}</h3>
                      </div>
                      <p className="text-white/40 text-xs mb-1">{branch.subtitle}</p>
                      <p className="text-white/50 text-sm mb-6 leading-relaxed">{branch.desc}</p>

                      <div className="relative pl-6">
                        <div
                          className={`absolute left-[5px] top-1 bottom-1 w-px ${c.lineBg}`}
                        />
                        <div className="space-y-2.5">
                          {branch.items.map((item, itemIdx) => (
                            <div
                              key={`${branch.name}-${item.name}-${itemIdx}`}
                              className="relative flex items-center gap-3"
                            >
                              <span
                                className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${c.dot}`}
                              />
                              <div className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all">
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${c.chip}`}>
                                  <item.icon className={`w-4 h-4 ${c.text}`} />
                                </span>
                                <span className="text-white/70 text-sm font-medium">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          );
        })}

        <p className="text-center text-white/30 text-xs mt-16">
          以上為「全球烈酒系統」目前收錄的分類視角，後續將持續擴充更多分類維度與細節內容。
        </p>
      </div>
    </div>
  );
}
