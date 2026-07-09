import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function IrishRegulations() {
  const act1980Rows = [
    { id: `1.—(1)`, en: `For the purposes of any statute or instrument made under statute spirits described as Irish whiskey shall not be regarded as corresponding to that description unless the requirements regarding spirits contained in subsection (3) of this section are complied with as regards the spirits.`, cn: `就任何成文法或依據成文法制定之規範而言，凡標示為「愛爾蘭威士忌（Irish whiskey）」之烈酒，除非其符合本條第（3）款所規定之相關要求，否則不得視為符合該描述之酒類。` },
    { id: `1.—(2)`, en: `For any of the purposes mentioned in subsection (1) of this section spirits described as blended Irish whiskey shall not be regarded as corresponding to that description unless—`, cn: `就本條第（1）款所述之任何適用情形而言，凡標示為「調和愛爾蘭威士忌（blended Irish whiskey）」之烈酒，除非符合下列條件，否則不得視為符合該描述之酒類：` },
    { id: `1.—(2) (a)`, en: `the spirits comprise a blend of two or more distillates, and`, cn: `該烈酒係由兩種或以上之蒸餾酒液所調和而成，且` },
    { id: `1.—(2) (b)`, en: `the requirements regarding spirits contained in subsection (3) of this section are complied with as regards each of the distillates.`, cn: `且各該蒸餾酒液均須符合本條第（3）款所規定之相關要求。` },
    { id: `1.—(3)`, en: `The following are the requirements referred to in subsections (1) and (2) of this section regarding spirits;`, cn: `下列為本條第（1）款及第（2）款所述，關於烈酒之相關要求：` },
    { id: `1.—(3) (a)`, en: `the spirits shall have been distilled in the State or in Northern Ireland from a mash of cereals which has been—`, cn: `該烈酒應係於本國或北愛爾蘭境內，將穀物製成之醪液進行蒸餾所得，且該醪液須已：` },
    { id: `1.—(3) (a) (i)`, en: `saccharified by the diastase of malt contained therein, with or without other natural diastases,`, cn: `並已藉由其中所含麥芽之澱粉酶進行糖化，可加或不加其他天然澱粉酶。` },
    { id: `1.—(3) (a) (ii)`, en: `fermented by the action of yeast, and`, cn: `並經由酵母作用進行發酵，且` },
    { id: `1.—(3) (a) (iii)`, en: `distilled at an alcoholic strength of less than 94.8% by volume in such a way that the distillate has an aroma and flavour derived from the materials used, and`, cn: `並蒸餾時低於94.8%vol，使蒸餾酒液具有源自原料之香氣與風味，且` },
    { id: `1.—(3) (b)`, en: `the spirits shall have been matured in wooden casks—`, cn: `該烈酒需於木桶中進行熟成，` },
    { id: `1.—(3) (b) (i)`, en: `in warehouse in the State for a period of not less than three years, or`, cn: `於本國境內之倉庫中熟成，期間不得少於3年，或` },
    { id: `1.—(3) (b) (ii)`, en: `in warehouse in Northern Ireland for such a period, or`, cn: `或於北愛爾蘭境內之倉庫中熟成同等期間，或` },
    { id: `1.—(3) (b) (iii)`, en: `in warehouse in the State and in Northern Ireland for periods the aggregate of which is not less than three years.`, cn: `或於本國及北愛爾蘭之倉庫中分別熟成，其合計期間不得少於3年。` },
    { id: `1.—(4)`, en: `For the purposes of subsection (3) of this section the alcoholic strength at which spirits are distilled shall be ascertained in the same manner as that in which such ascertainment is for the time being arrived at for the purposes of customs and excise.`, cn: `為本條第（3）款之適用目的，蒸餾時之酒精濃度應依據當時海關及消費稅（customs and excise）所採用之方式予以測定。` },
  ];

  const technicalFileRows = [
    { id: `1.1.`, en: `Name: Irish Whiskey/Uisce Beatha Eireannach/Irish Whisky`, cn: `名稱：愛爾蘭威士忌` },
    { id: `1.2.`, en: `Category of spirit drink: Whisky/Whiskey (Category 2 in Annex II to Regulation (EC) No 110/2008).`, cn: `烈酒類別：威士忌／Whiskey（依據歐盟第110/2008號規章附錄二第2類）。(陳正穎補充，現為EU 2019/787)` },
    { id: `2.1.`, en: `Principal Physical Characteristics:`, cn: `主要物理特徵` },
    { id: `2.1.1.`, en: `Product description`, cn: `產品描述` },
    { id: ``, en: `“Irish Whiskey/Uisce Beatha Eireannach/Irish Whisky” is a spirit distilled on the Island of Ireland, including Northern Ireland, from a mash of malted cereals with or without whole grains of other cereals and which has been:`, cn: `「Irish Whiskey／Uisce Beatha Eireannach／Irish Whisky」係指於愛爾蘭島（包括北愛爾蘭）境內，將發芽穀物製成之醪液（可添加或不添加其他穀類穀粒）進行蒸餾所得之烈酒，且該醪液須已：` },
    { id: `2.1.1. a)`, en: `saccharified by the diastase of malt contained therein, with or without other natural enzymes;`, cn: `藉由其中所含麥芽之澱粉酶進行糖化，可加或不加其他天然酶製劑。` },
    { id: `2.1.1. b)`, en: `fermented by the action of yeast;`, cn: `經由酵母作用進行發酵，且` },
    { id: `2.1.1. c)`, en: `distilled at an alcoholic strength of less than 94.8% by volume in such a way that the distillate has an aroma and taste derived from the materials used;`, cn: `蒸餾時低於94.8%vol，使蒸餾酒液具有源自原料之香氣與風味，且` },
    { id: `2.1.1. d)`, en: `subject to the maturation of the final distillate for at least three years in wooden casks, such as oak, not exceeding 700 litres capacity.`, cn: `最終蒸餾酒液須於容量不超過700公升之木製桶（例如橡木桶）中熟成至少3年。` },
    { id: ``, en: `The distillate, to which only water and plain caramel colouring may be added, retains its colour, aroma and taste derived from the production process referred to in points (a) to (d).`, cn: `該蒸餾酒液除得添加水及普通焦糖色素外，應保有源自前述(a)至(d)各項生產程序所形成之色澤、香氣及風味。` },
    { id: `4. 1.3.1`, en: `Distillation using Pot Stills`, cn: `蒸餾製程使用壺式蒸餾器` },
    { id: ``, en: `...The fermented liquid (the ‘Wash’) is added in discreet batches into the first copper pot still....`, cn: `……發酵後之液體（稱為「Wash」）以分批方式加入第一座銅製壺式蒸餾器中……` },
    { id: `4.1.3.2`, en: `Distillation using Column Stills`, cn: `蒸餾製程使用柱式蒸餾器` },
    { id: ``, en: `“Grain Irish Whiskey/Irish Grain Whiskey” can only be distilled through column stills.`, cn: `「穀物愛爾蘭威士忌/愛爾蘭穀物威士忌」僅得使用柱式蒸餾器進行蒸餾。` },
    { id: `4.2.`, en: `Production Processes for the varieties of Irish Whiskey/Uisce Beatha Eireannach/Irish Whisky`, cn: `愛爾蘭威士忌（Irish Whiskey／Uisce Beatha Eireannach／Irish Whisky）各類型之生產製程` },
    { id: `4.2.1.`, en: `Pot Still Irish Whiskey/Irish Pot Still Whiskey`, cn: `壺式愛爾蘭威士忌/愛爾蘭壺式威士忌` },
    { id: ``, en: `“Pot Still Irish Whiskey/Irish Pot Still Whiskey” is defined as a spirit distilled from a mash of a combination of malted barley, unmalted barley and other unmalted cereals. The mash must contain a minimum of 30% malted barley and a minimum of 30% unmalted barley and be:`, cn: `「壺式愛爾蘭威士忌/愛爾蘭壺式威士忌」係指以發芽大麥、未發芽大麥及其他未發芽穀物混合製成之醪液進行蒸餾所得之烈酒。該醪液中，麥芽大麥之比例不得低於30%，未發芽大麥之比例亦不得低於30%，且該醪液須：` },
    { id: `4.2.1. c)`, en: `distilled in pot stills in such manner that the distillate has an aroma and taste derived from the materials used.`, cn: `以壺式蒸餾器進行蒸餾，使蒸餾所得之酒液具有源自所使用原料之香氣與風味。` },
    { id: `4.2.2.`, en: `Malt Irish Whiskey/Irish Malt Whiskey`, cn: `麥芽愛爾蘭威士忌/愛爾蘭麥芽威士忌` },
    { id: ``, en: `“Malt Irish Whiskey/Irish Malt Whiskey” is defined as a spirit made from a mash of 100% malted barley and:`, cn: `「麥芽愛爾蘭威士忌/愛爾蘭麥芽威士忌」係指以100%發芽大麥製成之醪液所生產之烈酒，且：` },
    { id: `4.2.2. c)`, en: `distilled in pot stills in such manner that the distillate has an aroma and taste derived from the materials used.`, cn: `以壺式蒸餾器進行蒸餾，使蒸餾所得之酒液具有源自所使用原料之香氣與風味。` },
    { id: `4.2.3.`, en: `Grain Irish Whiskey/Irish Grain Whiskey`, cn: `穀物愛爾蘭威士忌/愛爾蘭穀物威士忌` },
    { id: ``, en: `“Grain Irish Whiskey/Irish Grain Whiskey” is produced from malted barley (not exceeding 30%) and includes whole unmalted cereals usually maize, wheat or barley.`, cn: `「穀物愛爾蘭威士忌/愛爾蘭穀物威士忌」係以發芽大麥（比例不得超過30%）為原料製成，並包含完整之未發芽穀物，通常為玉米、小麥或大麥。` },
    { id: `4.2.3. c)`, en: `distilled in column stills in such manner that the distillate has an aroma and taste derived from the materials used and the column distillation method.`, cn: `以柱式蒸餾器進行蒸餾，使蒸餾所得之酒液具有源自所使用原料之香氣與風味。` },
    { id: `4.2.4.`, en: `Blended Irish Whiskey/Irish Blended Whiskey`, cn: `調和愛爾蘭威士忌/愛爾蘭調和威士忌` },
    { id: ``, en: `“Blended Irish Whiskey/Irish Blended Whiskey” means a blend of two or more different whiskey types from the “Pot Still Irish Whiskey/Irish Pot Still Whiskey”, “Malt Irish Whiskey/Irish Malt Whiskey” and “Grain Irish Whiskey/Irish Grain Whiskey” varieties.`, cn: `「調和愛爾蘭威士忌/愛爾蘭調和威士忌」係指由兩種或以上不同類型之威士忌調和而成，包括「壺式愛爾蘭威士忌/愛爾蘭壺式威士忌」、「麥芽愛爾蘭威士忌/愛爾蘭麥芽威士忌」及「穀物愛爾蘭威士忌/愛爾蘭穀物威士忌」等類型。` },
    { id: `10.`, en: `SPECIFIC LABELLING RULES:`, cn: `特定標籤規則` },
    { id: ``, en: `“Irish Whiskey/Uisce Beatha Eireannach/Irish Whisky” cannot be labelled, packaged, sold, advertised or promoted in a way that includes any reference to a period of maturation or age of the whiskey unless it is to the period of maturation or age of the youngest whiskey in the drink expressed in years and consisting of one number (which may be expressed either as a numeral or as a word), and provided that the whiskey was aged under appropriate control and verification.`, cn: `「Irish Whiskey／Uisce Beatha Eireannach／Irish Whisky」於標示、包裝、販售、廣告或推廣時，不得以任何方式標示威士忌之熟成年份或酒齡，除非該標示係指該酒品中「最年輕威士忌之熟成期間或酒齡」，並以「年」為單位，以單一數字表示（得以數字或文字形式呈現），且該威士忌之熟成須經適當之管理與驗證。` },
    { id: ``, en: `The term ‘Single’ can only be applied to the varieties of “Pot Still Irish Whiskey/Irish Pot Still Whiskey”, “Malt Irish Whiskey/Irish Malt Whiskey” and “Grain Irish Whiskey/Irish Grain Whiskey”, provided all of the whiskey in the product is distilled totally on the site of a single distillery and comes from one of these three varieties. The varieties may use either the spelling ‘Whiskey’ or ‘Whisky’.`, cn: `「Single（單一間）」一詞僅得用於「壺式愛爾蘭威士忌/愛爾蘭壺式威士忌」、「麥芽愛爾蘭威士忌/愛爾蘭麥芽威士忌」及「穀物愛爾蘭威士忌/愛爾蘭穀物威士忌」等類型，且其前提為產品中所有威士忌均須完全於同一間蒸餾廠場所蒸餾，並且僅來自上述三種類型之一。上述各類型得使用「Whiskey」或「Whisky」兩種拼寫方式。` },
    { id: ``, en: `In English, the Geographical Indication allows for two spellings, “IRISH WHISKEY” and “IRISH WHISKY”; Irish Whiskey with an “e” is the customary term. The customary term for the plural of Irish Whiskey is ‘Irish Whiskeys’.`, cn: `於英文中，該地理標示（Geographical Indication）允許使用兩種拼寫方式：「IRISH WHISKEY」及「IRISH WHISKY」；其中，以帶有字母「e」之「Irish Whiskey」為慣用表述。另，「Irish Whiskey」之複數慣用形式為「Irish Whiskeys」。` },
  ];

  const expertComments = [
    { title: '愛爾蘭島的統一性', desc: '法律明確定義愛爾蘭威士忌的生產範圍涵蓋整個「愛爾蘭島」，包括愛爾蘭共和國與屬於英國的北愛爾蘭，這是愛爾蘭民族一直以來的包容性展現。' },
    { title: '獨特的「壺式」(Pot Still) 類別', desc: '愛爾蘭威士忌的獨特類別，使用發芽與「未發芽」大麥混合，賦予酒液獨特的香料感與油脂感。' },
    { title: '蒸餾次數的自由', desc: '大眾普遍認為愛爾蘭威士忌是用「三次蒸餾」，但法律和技術文件並未強制規定蒸餾次數，這取決於酒廠的風格選擇。' },
    { title: '復興中的巨人', desc: '愛爾蘭威士忌曾是全球威士忌市場的領導者，歷經衰退後現正處於復興階段，越來越多新興酒廠正在探索威士忌的邊界。' }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20"
          >
            <Gavel className="w-3.5 h-3.5" />
            Irish Whiskey Act 1980 & Technical File
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">愛爾蘭威士忌法規</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            曾被英國政府打壓的愛爾蘭威士忌在近代復興，以清爽順口風味見長，是一直被低估的威士忌種類。
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-green-500/10 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-center border-collapse min-w-[900px] table-fixed">
                <thead className="bg-green-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm font-bold text-white/90 border-r border-green-500/10 last:border-r-0">
                      <div>🇮🇪 愛爾蘭</div>
                      <div className="text-sm font-normal">1. Irish Whiskey Act 1980</div>
                      <div className="text-sm font-normal">2. 技術文件 2014</div>
                    </td>
                    <td className="p-4 text-xs text-green-500 font-bold border-r border-green-500/10 last:border-r-0 text-left leading-relaxed">
                      <div>1. 壺式</div>
                      <div>2. 麥芽</div>
                      <div>3. 穀物</div>
                      <div>4. 調和</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-green-500/10 last:border-r-0 text-left">
                      <div>1. 壺式：≥30% 大麥芽 + ≥30% 大麥</div>
                      <div>2. 麥芽：100% 大麥芽</div>
                      <div>3. 穀物：≤30% 大麥芽</div>
                    </td>
                    <td className="p-4 text-sm text-green-500 font-bold border-r border-green-500/10 last:border-r-0 text-center">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">僅酵母</td>
                    <td className="p-4 text-[11px] leading-relaxed text-green-500 font-bold border-r border-green-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 壺式/麥芽：批次銅壺 (技術文件規範第一次需銅製蒸餾器)</div>
                      <div>2. 穀物：柱式蒸餾</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">≤94.8% vol</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-center border-collapse min-w-[900px] border-t border-green-500/20 table-fixed">
                <thead className="bg-green-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 border-b border-r border-green-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center text-balance">無規定</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">≤700L</td>
                    <td className="p-4 text-sm text-green-500 font-bold border-r border-green-500/10 last:border-r-0 text-center text-balance">木桶</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">最少 3 年</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center">最年輕年份</td>
                    <td className="p-4 text-sm text-green-500 border-r border-green-500/10 last:border-r-0 text-center font-bold">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-green-500/10 last:border-r-0 text-center text-balance border-balance underline decoration-green-500/30">40%vol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Detailed Clauses - Act 1980 */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-green-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要：愛爾蘭威士忌法 1980</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: Irish Whiskey Act 1980
             </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/40 w-24">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 w-1/2">原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {act1980Rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs text-green-500/50 font-mono align-top">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Detailed Clauses - Technical File */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-green-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要：技術文件</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: Irish Whiskey Technical File
             </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/40 w-24">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 w-1/2">原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-green-500/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {technicalFileRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs text-green-500/50 font-mono align-top">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-green-500/5 border border-green-500/10 p-6 rounded-2xl flex gap-4 items-start">
               <AlertCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
               <div className="text-sm text-white/50 leading-relaxed">
                  <span className="text-green-500 font-bold">法律提示：</span> 以上內容為《愛爾蘭威士忌法 1980》與技術文件摘要。法律效力以愛爾蘭與英國官方發布之原始版本為準。
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-green-500/10 bg-green-500/5">
            <div className="prose prose-invert prose-green max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                曾被英國政府打壓的愛爾蘭威士忌在近代復興，以清爽順口風味見長，是一直被低估的威士忌種類。原始愛爾蘭威士忌法規1980中簡潔有力，但其技術文件和協會提供的參考文件是很完整而且相當複雜的。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-green-500 font-bold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                       {comment.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-green-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/irish"
                  className="group flex items-center gap-3 bg-green-500 text-white font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「翡翠島浪人」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold font-serif">法律文件連結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://www.ibec.ie/drinksireland/irish-whiskey/your-association/technical/regulations-governing-irish-whiskey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-green-500/10 hover:border-green-500/30 hover:bg-green-500/5 transition-all group"
            >
              <h3 className="text-green-500 font-bold mb-2 group-hover:text-green-400 transition-colors">1. 愛爾蘭威士忌技術文件</h3>
              <p className="text-white/50 text-xs mb-4">Irish Whiskey Technical File - Detailed Production Standards</p>
              <div className="flex items-center gap-2 text-green-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://www.irishstatutebook.ie/eli/1980/act/33/enacted/en/print.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-green-500/10 hover:border-green-500/30 hover:bg-green-500/5 transition-all group"
            >
              <h3 className="text-green-500 font-bold mb-2 group-hover:text-green-400 transition-colors">2. 愛爾蘭威士忌法 1980</h3>
              <p className="text-white/50 text-xs mb-4">Irish Whiskey Act, 1980 - Official Irish Legislation</p>
              <div className="flex items-center gap-2 text-green-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
