import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ContinueExploring } from "../components/ContinueExploring";
import { PROCESS_OPTIONS } from "../constants";
import { cn } from "../lib/utils";

// ── 資料層 ──────────────────────────────────────────────────────────────────

const SPIRITS = [
  { id: "malt",   name: "麥芽威士忌", color: "#1D9E75" },
  { id: "grain",  name: "穀物威士忌", color: "#378ADD" },
  { id: "brandy", name: "白蘭地",     color: "#D85A30" },
  { id: "rum",    name: "蘭姆酒",     color: "#BA7517" },
  { id: "gin",    name: "琴酒",       color: "#7F77DD" },
];

const STAGES = [
  { id: "extract", name: "取糖",  en: "Fermentable Extract",
    goal: "取糖只是概念，目標是取得可發酵基質，包含糖份、氨基酸、維生素、礦物質和脂質。" },
  { id: "ferment", name: "發酵",  en: "Fermentation",
    goal: "無論是天然落菌還是人工添加，目標是將上一階段的可發酵基質轉換生成更多酵母細胞，再轉換成酒精、二氧化碳和芳香物質（不同代謝路徑的代謝物）。" },
  { id: "distill", name: "蒸餾",  en: "Distillation",
    goal: "將發酵液內的酒精和芳香物質提取出來，同時去除不良風味。" },
  { id: "mature",  name: "熟成",  en: "Maturation & Conditioning",
    goal: "蒸餾後會依不同酒種置放於不同容器中熟成一段時間。多數國家的威士忌法規要求至少兩年起，白蘭地也有不同的熟成時間；就算是伏特加、白蘭姆酒或琴酒，也不是從蒸餾器出來就直接裝瓶銷售，多會先靜置於大罐中與空氣接觸，揮發新酒的刺激性味道，某些酒廠甚至會充氧，加速不良風味揮發。" },
  { id: "post",    name: "後處理", en: "Post-Treatment",
    goal: "細分步驟相當多，常見的有調和、調色、稀釋、過濾與裝瓶。調和是混合多種酒液或調香調味；調色是加入焦糖或食用色素；稀釋是加水到目標酒精度；過濾是濾除木桶屑、冷凝漂浮物與油脂等殘留，避免客訴；裝瓶則泛指裝入瓶中（一級）、放入盒筒（二級）並裝入運輸箱棧（三級）。" },
];

const STAGE_COLORS: Record<string, string> = {
  extract: "#1D9E75",
  ferment: "#378ADD",
  distill: "#D85A30",
  mature:  "#BA7517",
  post:    "#F472B6",
};

const COMPARE: Record<string, Record<string, string>> = {
  extract: { grain: "外部酵素糖化穀物", brandy: "直接壓榨葡萄，天然含糖", rum: "蔗汁或糖蜜，無需糖化", gin: "穀物糖化或採購中性烈酒" },
  ferment: { grain: "較短、偏中性",     brandy: "葡萄酒發酵，保留果香",   rum: "時長決定酯香濃度",   gin: "追求中性，風味不延續至成品" },
  distill: { grain: "柱式連續蒸餾",     brandy: "壺式兩次蒸餾（干邑）",   rum: "壺式、柱式或混合",   gin: "植物再蒸餾是核心工序" },
  mature:  { grain: "橡木桶，風味吸收快", brandy: "法國橡木，10 年以上",  rum: "熱帶快速熟成，1 年 ≈ 3 年", gin: "通常不熟成，桶陳為新風格" },
  post:    { grain: "調和基底",         brandy: "加水加糖（dosage）",      rum: "添加物爭議最大",     gin: "加水即可，倫敦乾不可加香料" },
};

interface Step { name: string; desc: string; inputs?: string[]; }
interface StageData { desc: string; note: string; steps: Step[]; }
type AllData = Record<string, Record<string, StageData>>;

const DATA: AllData = {
  malt: {
    extract: { desc: "大麥芽利用自身澱粉酶自糖化，無需外加酵素，是麥芽威士忌風味基礎的起點。", note: "自糖化（self-converting）是大麥芽特有能力",
      steps: [
        { name: "破碎",    desc: "研磨大麥芽暴露澱粉粒，粗細度影響糖化效率。" },
        { name: "糖化",    desc: "以 64–78°C 熱水活化酵素，分解澱粉為麥芽糖。", inputs: ["熱水（三次加水）"] },
        { name: "過濾",    desc: "麥汁穿過穀糟床自然過濾，取得澄清麥汁。" },
        { name: "洗糟",    desc: "再次注水沖洗穀糟，最大化糖分回收率。" },
        { name: "冷卻",    desc: "麥汁冷卻至 18–20°C，準備進入發酵槽。" },
      ]},
    ferment: { desc: "酵母將麥汁糖分轉化為酒精與風味前驅物，發酵時長與菌株選擇形塑果香層次。", note: "木製 washback 保留野生乳酸菌，帶來更複雜風味",
      steps: [
        { name: "加入酵母", desc: "特定菌株決定酯類與果香特徵。", inputs: ["酵母菌株"] },
        { name: "主發酵",   desc: "在 washback 槽中發酵 48–96 小時。" },
        { name: "發酵完成", desc: "產出酒汁（wash），酒精度約 7–8% ABV。" },
      ]},
    distill: { desc: "銅製壺式蒸餾器兩次蒸餾，是蘇格蘭麥芽威士忌的法規要求，蒸餾器形狀直接影響風格。", note: "蒸餾器越高頸越長，回流越多，酒液越輕盈",
      steps: [
        { name: "一次蒸餾", desc: "酒汁在 wash still 中蒸餾，得到約 25% ABV 低度酒。" },
        { name: "二次蒸餾", desc: "低度酒在 spirit still 中精餾，切取酒心。" },
        { name: "酒心切取", desc: "去除酒頭與酒尾，僅取中段（約 65–75% ABV）。" },
      ]},
    mature: { desc: "法規要求在橡木桶中熟成至少 3 年，桶型與前手酒種決定風味走向。", note: "每年約蒸發 2% 酒液，稱為「天使的份額」",
      steps: [
        { name: "入桶",        desc: "新酒填入橡木桶，桶型與前手酒種決定風味。", inputs: ["橡木桶"] },
        { name: "倉儲熟成",    desc: "溫濕度循環使酒液與木材持續交換物質。" },
        { name: "潤飾 Finish", desc: "轉入雪莉、葡萄酒等桶進行二次熟成。", inputs: ["特殊前手桶"] },
      ]},
    post: { desc: "出桶後混調、調整與裝瓶，確保每批次風格一致。", note: "原桶強度（Cask Strength）：不稀釋不過濾，最原始風味",
      steps: [
        { name: "調和 Blend", desc: "首席調酒師從多桶中挑選調配，維持品牌一致性。" },
        { name: "通濾",       desc: "冷凝過濾（可選）防止加冰後混濁。" },
        { name: "調色",       desc: "添加 E150a 焦糖色素維持批次視覺一致性。", inputs: ["焦糖（選用）"] },
        { name: "稀釋",       desc: "調整至裝瓶強度，通常 40–46% ABV。", inputs: ["RO 水"] },
        { name: "裝瓶",       desc: "灌裝、封蓋、貼標，完成產品。" },
      ]},
  },
  grain: {
    extract: { desc: "以小麥或玉米為主，需加入少量麥芽提供外部酵素，並以高溫糊化處理。", note: "依賴外部酵素，非自糖化",
      steps: [
        { name: "穀物粉碎", desc: "小麥或玉米磨碎，澱粉比大麥更難處理。" },
        { name: "糊化",     desc: "高溫蒸煮破壞澱粉結構，使其易被酵素分解。" },
        { name: "酵素糖化", desc: "加入麥芽澱粉酶，將澱粉轉化為可發酵糖。", inputs: ["麥芽（外部酵素）"] },
      ]},
    ferment: { desc: "與麥芽威士忌發酵原理相同，但穀物麥汁組成不同，發酵速度通常較快。", note: "穀物威士忌的發酵時間通常短於麥芽",
      steps: [
        { name: "加入酵母", desc: "注入酵母，穀物麥汁發酵速度較快。", inputs: ["酵母"] },
        { name: "發酵",     desc: "產出酒汁，準備進入連續蒸餾。" },
      ]},
    distill: { desc: "使用柱式蒸餾器（Coffey Still）進行連續蒸餾，效率高，可得高純度中性烈酒。", note: "連續蒸餾成就了穀物威士忌輕盈中性的風格",
      steps: [
        { name: "分析柱", desc: "酒汁進入分析柱，蒸氣將酒精從液體分離。" },
        { name: "精餾柱", desc: "多次回流精餾，達到約 94% ABV 的高純度。" },
      ]},
    mature: { desc: "同樣需橡木桶熟成，但中性酒液更快吸收桶味，常見香草與奶油調。", note: "穀物威士忌常作為調和威士忌的主體基底",
      steps: [
        { name: "入桶熟成", desc: "快速吸收香草與焦糖風味。", inputs: ["美國橡木桶"] },
      ]},
    post: { desc: "與麥芽威士忌後處理相似，調和比例是調和威士忌品質的關鍵。", note: "全球暢銷調和威士忌中，穀物威士忌通常佔 60–80%",
      steps: [
        { name: "調和",    desc: "與麥芽威士忌按比例混合，決定調和威士忌風格。" },
        { name: "稀釋裝瓶", desc: "調整酒精度後裝瓶。", inputs: ["RO 水"] },
      ]},
  },
  brandy: {
    extract: { desc: "葡萄本身含天然果糖，壓榨後直接可發酵，完全跳過糖化步驟。", note: "天然含糖，無需糖化——最直接的取糖方式",
      steps: [
        { name: "採收", desc: "葡萄於最佳成熟期採收，酸度與糖分比例至關重要。" },
        { name: "壓榨", desc: "輕柔壓榨取得果汁，避免過度萃取單寧。" },
        { name: "澄清", desc: "靜置使固體物沉澱，取清澈果汁進入發酵。" },
      ]},
    ferment: { desc: "以釀酒酵母進行酒精發酵，目標是產出風味豐富的低度葡萄酒而非高純度酒精。", note: "不過濾不澄清，保留更多風味前驅物",
      steps: [
        { name: "酒精發酵",     desc: "果糖轉化為酒精，產出約 8–10% ABV 葡萄酒。", inputs: ["釀酒酵母"] },
        { name: "蘋果乳酸發酵", desc: "部分產區允許乳酸菌二次發酵，降低酸度（可選）。" },
      ]},
    distill: { desc: "干邑規定使用夏朗德壺式蒸餾器兩次蒸餾；雅馬邑則多用連續蒸餾。", note: "蒸餾須在每年 3 月 31 日前完成（干邑法規）",
      steps: [
        { name: "一次蒸餾", desc: "得到 brouillis，酒精度約 28–32%。" },
        { name: "二次蒸餾", desc: "取酒心 bonne chauffe，約 68–72% ABV。" },
      ]},
    mature: { desc: "在利穆贊或托賽斯橡木桶中熟成，法國橡木帶來丹寧、辛香與深邃色澤。", note: "XO 等級至少熟成 10 年，頂級干邑可達數十年",
      steps: [
        { name: "入桶熟成", desc: "丹寧、辛香料與乾果風味逐漸發展。", inputs: ["法國橡木桶"] },
        { name: "換桶調配", desc: "不同年份酒液定期調配，老酒帶領新酒成熟。" },
      ]},
    post: { desc: "以水與糖漿調整酒精度與甜度，部分產品添加焦糖色素。", note: "年份干邑不調配不加糖，呈現單一年份風貌",
      steps: [
        { name: "調配",   desc: "首席調酒師混合不同年份、莊園原酒。" },
        { name: "加水調整", desc: "調整至 40% ABV，可添加少量糖漿。", inputs: ["蒸餾水", "糖漿（可選）"] },
        { name: "裝瓶",   desc: "裝入標誌性瓶型，完成產品。" },
      ]},
  },
  rum: {
    extract: { desc: "蘭姆酒以甘蔗汁或糖蜜為原料，直接含有大量可發酵糖分，原料選擇決定風味走向。", note: "農業蘭姆（Rhum Agricole）用鮮榨蔗汁；傳統蘭姆用糖蜜",
      steps: [
        { name: "甘蔗收割壓榨", desc: "鮮榨蔗汁（農業蘭姆酒），帶強烈草本與花香。" },
        { name: "糖蜜取得",     desc: "製糖副產品，含糖量高，風味濃郁厚重。" },
        { name: "稀釋備料",     desc: "糖蜜加水稀釋至適合發酵的糖分濃度。", inputs: ["水"] },
      ]},
    ferment: { desc: "發酵時間差異極大，從 24 小時到超過 2 週，直接決定最終酯香濃度。", note: "牙買加「酯香炸彈」來自超長發酵與刻意引入的野生菌",
      steps: [
        { name: "快速發酵",     desc: "24–48 小時，輕盈中性，適合白蘭姆。", inputs: ["商業酵母"] },
        { name: "慢速自然發酵", desc: "7–21 天，高酯含量，強烈熱帶果香。" },
        { name: "回用酵母泥",   desc: "部分酒廠將前次殘留加入新批次，延續風味連續性。" },
      ]},
    distill: { desc: "壺式與柱式蒸餾均廣泛使用，是蒸餾方式最多元的烈酒品類。", note: "蒸餾方式多元，直接反映加勒比海各島的文化差異",
      steps: [
        { name: "壺式蒸餾", desc: "保留更多酯類，帶來複雜重身風格。" },
        { name: "柱式蒸餾", desc: "輕身中性，常見於輕盈型白蘭姆。" },
        { name: "壺柱混合", desc: "兼顧風味複雜度與生產效率（部分產區）。" },
      ]},
    mature: { desc: "熱帶氣候使蒸發率高達每年 5–10%，桶味融合速度遠快於蘇格蘭。", note: "部分高端蘭姆在熱帶熟成後，移至歐洲進行二次陳化",
      steps: [
        { name: "熱帶橡木桶熟成",       desc: "高溫加速交換，香草與椰子風味顯著。", inputs: ["前手波本桶"] },
        { name: "索雷拉系統（可選）",   desc: "西班牙語系蘭姆酒的分層混合熟成法。" },
        { name: "歐洲二次陳化（可選）", desc: "移至歐洲低溫倉庫繼續熟成，增添細膩層次。" },
      ]},
    post: { desc: "蘭姆酒後處理爭議最大，部分生產商大量添加糖與香料，目前業界正爭論強制標示規範。", note: "許多市售蘭姆酒含大量添加物，但無強制揭露義務",
      steps: [
        { name: "調色調甜",              desc: "添加焦糖與蔗糖增加甜感，目前無強制揭露規定。", inputs: ["焦糖", "蔗糖（部分品牌）"] },
        { name: "香料添加（Spiced Rum）", desc: "加入香草、肉桂等，創造特定商業風格。" },
        { name: "裝瓶",                  desc: "調整酒精度後裝瓶。" },
      ]},
  },
  gin: {
    extract: { desc: "基底烈酒通常使用穀物，需完整糖化流程。許多琴酒廠直接購入高純度中性烈酒（NGS）跳過前段。", note: "自製基底烈酒的酒廠標榜「Distillery Gin」以示區別",
      steps: [
        { name: "穀物糖化",   desc: "與穀物威士忌相似，需外加酵素糖化。" },
        { name: "或採購 NGS", desc: "直接購入中性穀物烈酒，跳過取糖與發酵階段。" },
      ]},
    ferment: { desc: "若自製基底烈酒，發酵目標是取得中性乾淨的酒液，以突出後續植物的香氣。", note: "發酵風味幾乎不延續至成品，中性是目標",
      steps: [
        { name: "酒精發酵", desc: "與穀物烈酒相同，追求中性乾淨的酒精基底。", inputs: ["酵母"] },
      ]},
    distill: { desc: "琴酒蒸餾的核心在於植物浸漬與再蒸餾。杜松子（Juniper）是法定必要成分。", note: "倫敦乾琴酒（London Dry）法規禁止蒸餾後添加任何香料",
      steps: [
        { name: "植物浸漬",   desc: "植物浸泡於基底烈酒中，萃取香氣。", inputs: ["杜松子", "其他植物原料"] },
        { name: "再蒸餾",     desc: "含植物的烈酒再蒸餾，揮發性香氣隨酒精蒸出。" },
        { name: "或蒸氣浸漬", desc: "植物置於蒸氣路徑中，萃取更輕盈細緻的香氣。" },
      ]},
    mature: { desc: "傳統琴酒不需熟成，透明清澈是其特徵。桶陳琴酒（Barrel-aged Gin）是近年興起的新分類。", note: "不熟成是琴酒的傳統定義核心，桶陳琴酒是當代創新",
      steps: [
        { name: "無需熟成（傳統）", desc: "蒸餾後即可裝瓶，倫敦乾等傳統分類無熟成要求。" },
        { name: "桶陳（現代風格）", desc: "存放木桶數月，賦予金黃色澤與木質香氣。" },
      ]},
    post: { desc: "加水稀釋至裝瓶強度，倫敦乾法規禁止加糖加香。現代琴酒有時添加天然色素。", note: "Compound Gin（冷調）：不蒸餾直接加香料精萃，品質差異大",
      steps: [
        { name: "稀釋",            desc: "加水降至 37.5–47% ABV。", inputs: ["純水"] },
        { name: "色彩添加（現代）", desc: "部分品牌添加蝴蝶豌豆花等天然色素。" },
        { name: "裝瓶",            desc: "裝入特色瓶型，完成產品。" },
      ]},
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export function SpiritsProcessFull() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950">
      <div className="max-w-5xl mx-auto">

        {/* 頁首 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PROCESS_OPTIONS.map((opt) => (
              <Link
                key={opt.name}
                to={opt.path}
                className={cn(
                  "px-5 py-2 rounded-xl border transition-all text-[11px] md:text-sm font-bold tracking-wider flex items-center gap-2",
                  opt.path === '/process/full'
                    ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 text-white/40 border-white/10 hover:border-amber-500/50 hover:text-white/80"
                )}
              >
                <opt.icon className={cn("w-3.5 h-3.5", opt.path === '/process/full' ? "text-black" : "text-amber-500/50")} />
                {opt.name}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            烈酒製程基礎版
          </h1>
          <div className="text-white/50 max-w-2xl mx-auto leading-relaxed space-y-4 text-left md:text-center">
            <p>以農業原料為出發點的釀酒系統架構：取糖、發酵、蒸餾、熟成和後處理。</p>
            <p>
              每階段都有基礎邏輯，全球 99.99% 的烈酒都是按照這五階段生產。過去建廠設計、經營運作、產品開發和顧問教學時都會不停強調；
              不過每種烈酒在不同階段會有各自重點，內部細節不在此討論。
            </p>
            <p>這五階段的目標如下：</p>
          </div>
        </motion.div>

        {/* 五階段流程圖 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-2xl mx-auto mb-12"
        >
          {STAGES.map((st, i) => {
            const isLast = i === STAGES.length - 1;
            return (
              <div key={st.id}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-white/30">0{i + 1}</span>
                    <h3 className="text-lg font-serif font-bold" style={{ color: STAGE_COLORS[st.id] }}>
                      {st.name}
                    </h3>
                    <span className="text-[11px] text-white/30 uppercase tracking-widest">{st.en}</span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{st.goal}</p>
                </div>
                {!isLast && (
                  <div className="flex justify-center py-1.5">
                    <ChevronDown className="w-5 h-5 text-amber-500/40" />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <p className="text-center text-white/45 text-sm mb-16">
          經過這五階段就來到架上，到達你的手中。
        </p>

        <p className="text-center text-white/40 text-sm leading-relaxed max-w-2xl mx-auto mt-10">
          想更完整理解全球烈酒的分類邏輯，可以搭配{' '}
          <Link to="/process/classification" className="text-amber-500/80 hover:text-amber-400 underline underline-offset-2">
            烈酒分類地圖
          </Link>
          {' '}一起看，就能更理解全球烈酒到底在玩什麼。
        </p>

        <div className="mt-16">
          <ContinueExploring />
        </div>
      </div>
    </div>
  );
}
