import { motion } from 'motion/react';
import { Beaker, Droplets, Flame, Waves, ArrowRight, Cog, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ImageCarousel } from '../components/ImageCarousel';
import { ContinueExploring } from '../components/ContinueExploring';
import { PROCESS_OPTIONS } from '../constants';


const steps = [
  {
    title: '發芽 (Malting)',
    icon: Beaker,
    description: '將大麥浸泡在水中發芽，啟動酵素將澱粉轉化為麥芽糖和葡萄糖。',
    details: '發芽過程中，大麥長出小芽，內源酵素分解澱粉供應小芽生長。達一定長度後經乾燥（傳統使用泥煤和煤炭）停止生長，這也是威士忌煙燻泥煤風味的關鍵。',
    images: [
      '/whiskyprocessimage/1747458519447.jpg',
      '/whiskyprocessimage/1747458519448.jpg',
      '/whiskyprocessimage/1747458519449.jpg',
      '/whiskyprocessimage/1747458519450.jpg',
      '/whiskyprocessimage/1747458519451.jpg',
      '/whiskyprocessimage/1747458519452.jpg'
    ]
  },
  {
    title: '糖化 (Mashing)',
    icon: Droplets,
    description: '將磨碎的麥芽 (Grist) 與熱水混合，萃取帶有麥芽糖與胺基酸的麥汁 (Wort)。',
    details: '在糖化過濾槽中，熱水分階段加入，控制溫度並活化酵素，將麥芽碎粒中的澱粉與蛋白質分解，最終得到的麥芽汁將被冷卻後進入下一步。',
    images: [
      '/whiskyprocessimage/1747458519453.jpg',
      '/whiskyprocessimage/1747458519454.jpg',
      '/whiskyprocessimage/1747458519455.jpg',
      '/whiskyprocessimage/1747458519456.jpg',
      '/whiskyprocessimage/1747458519457.jpg',
      '/whiskyprocessimage/1747458519458.jpg'
    ]
  },
  {
    title: '發酵 (Fermentation)',
    icon: Waves,
    description: '加入酵母，將麥芽糖和葡萄糖轉化為酒精和二氧化碳，同時產生各種風味物質的發酵麥汁 (Wash)。',
    details: '發酵通常需要 48 到 120 小時或更久。除了酒精，酵母還會產生醇、酸、醛、酯類等各式風味物質(Congeners)，賦予威士忌花香、果香等關鍵特徵。',
    images: [
      '/whiskyprocessimage/1747458519459.jpg',
      '/whiskyprocessimage/1747458519460.jpg',
      '/whiskyprocessimage/1747458519461.jpg',
      '/whiskyprocessimage/1747458519462.jpg'
    ]
  },
  {
    title: '蒸餾 (Distillation)',
    icon: Flame,
    description: '利用酒精水溶液的沸點變化，產生不同酒精濃度的蒸餾液，進行純化與濃縮。',
    details: '蘇格蘭威士忌通常在大型銅製壺式蒸餾器 (Pot Still) 中進行兩次蒸餾。蒸餾師只取酒心 (Heart)，剔除酒頭 (Foreshot) 與酒尾 (Feint)，以獲得想要的風味新酒 (New Make)。',
    images: [
      '/whiskyprocessimage/1747458519463.jpg',
      '/whiskyprocessimage/1747458519464.jpg',
      '/whiskyprocessimage/1747458519465.jpg',
      '/whiskyprocessimage/1747458519466.jpg',
      '/whiskyprocessimage/1747458519467.jpg',
      '/whiskyprocessimage/1747458519468.jpg',
      '/whiskyprocessimage/1747458519469.jpg'
    ]
  },
  {
    title: '熟成 (Maturation)',
    icon: Waves,
    description: '在橡木桶 (oak cask) 中長時間熟成，發展出豐富的香氣、色澤與口感。',
    details: `威士忌在桶子裡透過萃取 (extraction) 橡木風味（如香草醛、焦糖）以及吸附 (absorption)去除雜質，同時揮發(evapouration) 不討喜的香氣，濃縮 (concentration) 更多強烈的香氣表現，以及酯化 (esterification)創造花香調，逐漸蛻變成琥珀色的液體黃金。木桶種類和環境溫濕度對此過程影響巨大。

威士忌常見的桶型和提供的風味為以下幾種：

波本桶：香草、奶油、椰子、柑橘、花香、堅果、香辛料…等
雪莉桶：葡萄果乾、巧克力、深色莓果、蜜餞、香辛料…等
新桶：椰子、香草、櫻桃、香辛料…等
STR桶：香草、奶油、椰子、水果乾…等

知道這些桶型的使用，通常就是威士忌風味解謎的開始，品飲者就會去找尋匹配的風味，同時挖掘跟平常想像不同的香氣與口感；這就是威士忌品飲的重要樂趣！`,
    images: [
      '/whiskyprocessimage/1747458519470.jpg',
      '/whiskyprocessimage/1747458519471.jpg',
      '/whiskyprocessimage/1747458519472.jpg',
      '/whiskyprocessimage/1747458519473.jpg',
      '/whiskyprocessimage/1747458519474.jpg',
      '/whiskyprocessimage/1747458519475.jpg',
      '/whiskyprocessimage/1747458519476.jpg',
      '/whiskyprocessimage/1747458519477.jpg',
      '/whiskyprocessimage/1747458519478.jpg',
      '/whiskyprocessimage/1747458519479.jpg'
    ]
  }
];

export function WhiskyProcess() {

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PROCESS_OPTIONS.map((opt) => (
              <Link
                key={opt.name}
                to={opt.path}
                className={cn(
                  "px-5 py-2 rounded-xl border transition-all text-[11px] md:text-sm font-bold tracking-wider flex items-center gap-2",
                  opt.path === '/process/whisky'
                    ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 text-white/40 border-white/10 hover:border-amber-500/50 hover:text-white/80"
                )}
              >
                <opt.icon className={cn("w-3.5 h-3.5", opt.path === '/process/whisky' ? "text-black" : "text-amber-500/50")} />
                {opt.name}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">一般麥芽威士忌(簡易版)</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed text-lg">
            每一滴威士忌都是大自然的饋贈與工匠心血的結晶。了解從穀物到琥珀色液體的奇幻旅程。
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-500/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-24 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-20",
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group relative">
                    <step.icon className="w-8 h-8 text-amber-500" />
                    <div className="absolute -inset-2 bg-amber-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-amber-500">{step.title}</h2>
                  <p className="text-xl font-medium mb-4 text-white/85">{step.description}</p>
                  <p className="text-white/45 leading-relaxed text-sm whitespace-pre-line">
                    {step.details}
                  </p>
                </div>

                <div className="md:w-1/2 w-full glass-card relative overflow-hidden group h-[400px]">
                  {(step as any).images ? (
                    <ImageCarousel images={(step as any).images} />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="absolute inset-0 bg-whisky-900/50" />
                      {/* Decorative element serving as placeholder for image */}
                      <div className="relative z-10 flex flex-col items-center gap-4 text-white/20">
                        <step.icon className="w-16 h-16 opacity-30 group-hover:scale-110 transition-transform duration-700" />
                        <span className="text-[11px] uppercase font-bold tracking-widest">{step.title} Visualization</span>
                      </div>
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 opacity-20 group-hover:opacity-40",
                        idx % 2 === 0 ? "from-amber-500/40 to-transparent" : "from-orange-500/40 to-transparent"
                      )} />
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-4xl font-serif font-black text-white/10 select-none">0{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <ContinueExploring />

      </div>
    </div>
  );
}
