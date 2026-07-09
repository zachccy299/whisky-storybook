import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RegulationSummaryTable } from '../components/RegulationSummaryTable';

export function EURegulations() {
  const regulationRows = [
    { id: `ANNEX I`, en: `CATEGORIES OF SPIRIT DRINKS`, cn: `烈酒的分類` },
    { id: `I - 2`, en: `Whisky or whiskey`, cn: `威士忌` },
    { id: `(a)`, en: `Whisky or whiskey is a spirit drink produced exclusively by carrying out all of the following production operations:`, cn: `威士忌（Whisky 或 Whiskey）係指僅透過執行下列全部生產程序所製成之烈酒飲品：` },
    { id: `(a) (i)`, en: `distillation of a mash made from malted cereals, with or without whole grains of unmalted cereals, which has been:`, cn: `由發芽穀物製成之醪漿(mash)（和/不和未發芽整粒穀物）進行蒸餾，其該醪液須已：` },
    { id: `(a) (i) -`, en: `— saccharified by the diastase of the malt contained therein, with or without other natural enzymes,`, cn: `- 由內含麥芽之酵素糖化，可加/不加其他天然酶製劑` },
    { id: `(a) (i) -`, en: `— fermented by the action of yeast;`, cn: `- 由酵母進行發酵` },
    { id: `(a) (ii)`, en: `each and every distillation is carried out at less than 94,8 % vol., so that the distillate has an aroma and taste derived from the raw materials used;`, cn: `每一次蒸餾都低於94.8%vol，所以蒸餾液可保留原物料的香氣與口感` },
    { id: `(a) (iii)`, en: `maturation of the final distillate for at least three years in wooden casks not exceeding 700 litres capacity.`, cn: `在不超過700公升的木桶中，陳年3年以上` },
    { id: `(a)`, en: `The final distillate, to which only water and plain caramel (for colouring) may be added, shall retain the colour, aroma and taste it derived from the production process referred to in points (i), (ii) and (iii).`, cn: `最後的蒸餾液(產品)，只允許添加水和普通調色用焦糖，需保留在(i)(ii)(iii)製程中所取得之顏色、香氣和口感` },
    { id: `(b)`, en: `The minimum alcoholic strength by volume of whisky or whiskey shall be 40 %`, cn: `最低裝瓶酒精度40%vol` },
    { id: `(c)`, en: `No addition of alcohol, diluted or not, shall take place.`, cn: `不可加入酒精稀釋` },
    { id: `(d)`, en: `Whisky or whiskey shall not be sweetened, even for rounding off the taste, or flavoured, or contain any additives other than plain caramel (E 150a) used for adjusting the colour.`, cn: `威士忌不可為了口感和風味而調甜、調香和其他添加物，只有普通焦糖(E150a)可用來調色` },
    { id: `(e)`, en: `The legal name of ‘whisky’ or ‘whiskey’ may be supplemented by the term ‘single malt’ only if it has been distilled exclusively from malted barley at a single distillery.`, cn: `若要合法稱為「單一麥芽」則必須在同一間蒸餾廠內完成使用發芽大麥的蒸餾製程。` },
  ];

  const expertComments = [
    { title: "與蘇格蘭法規的差別", desc: "歐盟法規允許「木桶熟成」（Wooden casks），而蘇格蘭則嚴格限制為「橡木桶」（Oak casks），所以在歐盟法規的框架下其他國家的威士忌有更多木桶種類可以玩。" },
    { title: "地理標誌 (GI) 保護", desc: "歐盟建立了一套完善的地理標誌體系，蘇格蘭威士忌、愛爾蘭威士忌等都在此架構下獲得法律上的專有名詞保護。" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20"
          >
            <Gavel className="w-3.5 h-3.5" />
            Regulation (EU) 2019/787
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">歐盟威士忌法規</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            歐盟法規是歐洲境內所有成員國威士忌法律的基礎規定，各國依此標準建立更深入詳細的要求。
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-indigo-500/10 overflow-hidden text-center">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse min-w-[900px] table-fixed">
                <thead className="bg-indigo-500/10">
                  <tr>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-base font-bold text-white/90 border-r border-indigo-500/10 last:border-r-0">
                      <div>🇪🇺 歐盟</div>
                      <div className="text-sm font-normal">EU 2019/787</div>
                    </td>
                    <td className="p-4 text-base text-indigo-500 font-bold border-r border-indigo-500/10 last:border-r-0 text-center">威士忌</td>
                    <td className="p-4 text-sm leading-relaxed text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">
                      <div>發芽穀物 + 穀物</div>
                    </td>
                    <td className="p-4 text-sm text-indigo-500 font-bold border-r border-indigo-500/10 last:border-r-0 text-center">－（允許）</td>
                    <td className="p-4 text-sm text-indigo-500 font-bold border-r border-indigo-500/10 last:border-r-0 text-center">僅酵母</td>
                    <td className="p-4 text-sm text-indigo-500 font-bold border-r border-indigo-500/10 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">≤94.8% vol</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse min-w-[900px] border-t border-indigo-500/20 table-fixed">
                <thead className="bg-indigo-500/10">
                  <tr>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-indigo-500/60 border-b border-r border-indigo-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">無規定</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">≤700L</td>
                    <td className="p-4 text-sm text-indigo-500 font-bold border-r border-indigo-500/10 last:border-r-0 text-center">木桶</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">最少 3 年</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 leading-relaxed text-center">
                      最年輕年份
                    </td>
                    <td className="p-4 text-sm text-green-500 border-r border-indigo-500/10 last:border-r-0 text-center">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-indigo-500/10 last:border-r-0 text-center">40%vol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Full Text/Detailed Clauses */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-indigo-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: Regulation (EU) 2019/787 (ANNEX I)
             </div>
          </div>
          
          <div className="max-h-[800px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-white/40 w-32">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-white/60 w-2/5">英文原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-white/60">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {regulationRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-[11px] text-indigo-500/50 font-mono align-top">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl flex gap-4 items-start">
               <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
               <div className="text-sm text-white/50 leading-relaxed">
                  <span className="text-indigo-500 font-bold">法律提示：</span> 本頁面引用自歐盟 2019/787 號烈酒法規。歐盟境內不同產地（如愛爾蘭、德國）可能有更嚴格的地方性地理標誌 (GI) 要求。
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-indigo-500/10 bg-indigo-500/5">
            <div className="prose prose-invert prose-indigo max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                歐盟威士忌法規訂定了最基本的威士忌生產標準
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-indigo-400 font-bold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                       {comment.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-indigo-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/eu"
                  className="group flex items-center gap-3 bg-indigo-500 text-whisky-950 font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「酒魂探索者」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-bold font-serif">法律文件連結</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <a 
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R0787" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-indigo-500/10 hover:border-indigo-400/30 hover:bg-indigo-400/5 transition-all group"
            >
              <h3 className="text-indigo-400 font-bold mb-2 group-hover:text-indigo-300 transition-colors">1. 歐盟 2019/787 號規章 (全文)</h3>
              <p className="text-white/50 text-xs mb-4">Regulation (EU) 2019/787 on the definition, description, presentation and labelling of spirit drinks.</p>
              <div className="flex items-center gap-2 text-indigo-400/60 text-xs font-bold">
                前往 EUR-Lex <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
