import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CanadianRegulations() {
  const crc870Rows = [
    { id: `B.02.002`, en: `Definition: Small Wood, means wood casks or barrels of not greater
than 700 L capacity.`, cn: `定義：小木桶，意指容量不超過700L的木桶` },
    { id: `B.02.017`, en: `No person shall blend or modify Scotch whisky that is imported in bulk for the purpose of bottling and sale in Canada as Scotch whisky except by`, cn: `任何人不得對以散裝形式進口、並以「蘇格蘭威士忌」名義於加拿大裝瓶及販售之蘇格蘭威士忌進行調和或修改（modify），但下列情況除外：` },
    { id: `B.02.017 (a)`, en: `blending with other Scotch whisky,`, cn: `調和其他蘇格蘭威士忌` },
    { id: `B.02.017 (b)`, en: `the addition of distilled or otherwise purified water to adjust to a required strength, or`, cn: `添加蒸餾水或其他經純化之水者，或` },
    { id: `B.02.017 (c)`, en: `the addition of caramel.`, cn: `添加調色焦糖` },
    { id: `B.02.019`, en: `No person shall blend or modify Irish whisky that is imported in bulk for the purpose of bottling and sale in Canada as Irish whisky except by`, cn: `任何人不得對以散裝形式進口、並以「愛爾蘭威士忌」名義於加拿大裝瓶及販售之愛爾蘭威士忌進行調和或修改（modify），但下列情況除外：` },
    { id: `B.02.019 (a)`, en: `blending with other Irish whisky,`, cn: `調和其他愛爾蘭威士忌` },
    { id: `B.02.019 (b)`, en: `the addition of distilled or otherwise purified water to adjust to a required strength, or`, cn: `添加蒸餾水或其他經純化之水者，或` },
    { id: `B.02.019 (c)`, en: `the addition of caramel.`, cn: `添加調色焦糖` },
    { id: `B.02.020 (2)`, en: `Subject to subsection (3), no person shall make any claim with respect to the age of Canadian whisky, other than for the period during which the whisky has been held in small wood.`, cn: `除第(3)款另有規定外，任何人不得就加拿大威士忌之酒齡作出任何聲明，但關於該威士忌於小木桶中儲存期間之聲明者，不在此限。` },
    { id: `B.02.020 (3)`, en: `Where Canadian whisky has been aged in small wood for a period of at least three years, any period not exceeding six months during which that whisky was held in other containers may be claimed as age.`, cn: `若加拿大威士忌於小木桶中熟成至少3年，則其後於其他容器中儲存之期間，如不超過六個月，得計入酒齡聲明。` },
    { id: `B.02.022`, en: `No person shall modify Bourbon whisky that is imported for the purpose of bottling and sale in Canada as Bourbon whisky except by the addition of distilled or otherwise purified water to adjust the Bourbon whisky to a required strength.`, cn: `任何人不得對以「波本威士忌」為名義進口之於加拿大裝瓶與販售進行修改（modify），但為調整至所需酒精度而添加蒸餾水或其他經純化之水者，不在此限。` },
    { id: `B.02.022.1`, en: `No person shall modify Tennessee whisky that is imported for the purpose of bottling and sale in Canada as Tennessee whisky except by the addition of distilled or otherwise purified water to adjust the Tennessee whisky to a required strength.`, cn: `任何人不得對以「田納西威士忌」為名義進口之於加拿大裝瓶與販售進行修改（modify），但為調整至所需酒精度而添加蒸餾水或其他經純化之水者，不在此限。` },
    { id: `B.02.023 (1)`, en: `No person shall sell whisky for consumption in Canada, other than Bourbon whisky or Tennessee whisky, unless it has been aged for at least three years in small wood.`, cn: `除波本威士忌或田納西威士忌外，任何人不得於加拿大販售供消費之威士忌，除非該威士忌已於小木桶中熟成至少3年。` },
    { id: `B.02.023 (2)`, en: `(2) Nothing in subsection (1) applies in respect of flavouring contained in whisky, but no person shall sell for consumption in Canada whisky containing any flavouring, other than wine, that has not been aged for a period of at least two years in small wood.`, cn: `第(1)款之規定不適用於威士忌中所含之調味物質（flavouring）；但任何人不得於加拿大販售供消費之威士忌，如其所含之任何調味物質（葡萄酒除外）未曾於小木桶中熟成至少2年。` },
    { id: `2019年版`, en: ``, cn: `` },
    { id: `(Repealed) B.02.020 (1)`, en: `(Repealed) Canadian Whisky, Canadian Rye Whisky or Rye Whisky`, cn: `加拿大威士忌, 加拿大裸麥威士忌, 或裸麥威士忌` },
    { id: `(Repealed) B.02.020 (1) (a) (i)`, en: `be a potable alcoholic distillate, or a mixture of potable alcoholic distillates, obtained from a mash of cereal grain or cereal grain products saccharified by the diastase of malt or by other enzymes and fermented by the action of yeast or a mixture of yeast and other micro-organisms,`, cn: `須為可飲用之酒精蒸餾液或可飲用酒精蒸餾液之混合物，其係由穀物或穀物製品之粥製成，並經由麥芽酵素或其他酵素進行糖化，再由酵母或酵母與其他微生物之混合物進行發酵而得；` },
    { id: `(Repealed) B.02.020 (1) (a) (ii)`, en: `be aged in small wood for not less than three years,`, cn: `在小木桶中陳年不少於3年` },
    { id: `(Repealed) B.02.020 (1) (a) (iii)`, en: `possess the aroma, taste and character generally attributed to Canadian whisky,`, cn: `須具有通常被認為屬於加拿大威士忌之香氣、風味與特徵。` },
    { id: `(Repealed) B.02.020 (1) (a) (iv)`, en: `be manufactured in accordance with the requirements of the Excise Act and the regulations made thereunder,`, cn: `須依據《Excise Act（消費稅法）》及其相關制定之法規要求進行製造；` },
    { id: `(Repealed) B.02.020 (1) (a) (v)`, en: `be mashed, distilled and aged in Canada, and`, cn: `在加拿大境內糖化、蒸餾和陳年` },
    { id: `(Repealed) B.02.020 (1) (a) (vi)`, en: `contain not less than 40 per cent alcohol by volume; and`, cn: `包裝酒精度不低於40%vol` },
    { id: `(Repealed) B.02.020 (1) (b)`, en: `may contain caramel and flavouring`, cn: `可含焦糖調色和香料` },
  ];

  const si2009Rows = [
    { id: `2`, en: `If whisky that is to be exported is a blend containing more than 9.090 per cent imported spirits, a Certificate of Age and Origin shall`, cn: `若擬出口之威士忌為含有超過9.090%進口烈酒之調和酒，則必須出具「酒齡與產地證明書（Certificate of Age and Origin）」。` },
    { id: `2 (a)`, en: `specify the percentage of domestic and imported spirits contained in the whisky; and`, cn: `應標明該威士忌中所含國產烈酒與進口烈酒之比例；且` },
    { id: `2 (b)`, en: `not refer to the whisky as Rye Whisky, Canadian Whisky or Canadian Rye Whisky.`, cn: `不可稱其威士忌為裸麥威士忌、加拿大威士忌或加拿大裸麥威士忌` },
    { id: `3 (1)`, en: `Subject to subsection (2), for the purpose of issuing a Certificate of Age and Origin in respect of spirits flavoured by blending into the spirits additional domestic or imported spirits or wine, the resultant product of the blended spirits is deemed to have been warehoused for a period equal to the period of warehousing of the most recently warehoused spirits contained in the resultant product.`, cn: `除第(2)款另有規定外，就因混入額外之國產或進口烈酒或葡萄酒而進行調味之烈酒而言，於簽發「酒齡與產地證明書時，該調和後產品之倉儲期間，視為等同於其中最晚入庫之烈酒所經歷之倉儲期間。(編注：就是包含調入酒的最低酒齡)` },
    { id: `3 (2)`, en: `If the absolute ethyl alcohol content of the spirits or wine that are added as flavouring does not exceed 9.090 per cent of the total quantity of absolute ethyl alcohol contained in the resultant product of the blended spirits, that resultant product is deemed to have been warehoused for a period equal to the period of warehousing of the spirits to which were added the spirits or wine for blending purposes.`, cn: `若作為調味用所添加之烈酒或葡萄酒中的絕對乙醇含量，未超過調和後產品中絕對乙醇總量之9.090%，則該調和後產品視為已儲存之期間，等同於「被添加調味烈酒或葡萄酒之前之」「原烈酒所經歷之儲存期間」。(編著：沒超過9.09%就使用原酒齡)` },
    { id: `5`, en: `A Certificate of Age and Origin shall not be issued in respect of spirits bottled for export that bear a label containing any reference to Canada, including the word “Canadian” in the trade name, to designate the type of spirits unless at least 75 per cent of the absolute ethyl alcohol content of those bottled spirits is derived from domestic spirits.`, cn: `對於裝瓶供出口之烈酒，如其酒標包含任何與加拿大相關之標示，包括於商品名稱中使用「加拿大」一詞以表示該烈酒類型，除非該裝瓶烈酒中至少75%之絕對乙醇含量來自國產烈酒，否則不得簽發「酒齡與產地證明書」。` },
  ];

  const expertComments = [
    { 
      title: '1. 關於 9.09% 規則 (The 9.09% Rule)', 
      desc: '9.09%法規，這是加拿大威士忌最著名的特色，也是歷史留存的原因。根據Davin de Kergommeaux的考究，當時美國給加拿大的一個貿易優惠，只要在酒液裡，加入一份體積的橘子白蘭地就可以免稅進入美國，於是 1 / (10 + 1) = 9.09% 就是這麼來的。有些人不認同，筆者認為酒產品就是完全消費市場，口味是被教育的，如果這樣的添加真的讓酒變好喝，有消費者願意買單，那也不失為一種好方法！' 
    },
    { 
      title: '2. 2024 年法規改版說明', 
      desc: '加拿大威士忌在2024年有大幅度改版，許多原訂的加拿大威士忌定義B.02.020 (1)已經被廢除，改放在其他法律文件中，但筆者已經花了一段時間找尋都沒找到，所以將未廢除前的法規放上。若有酒友們能夠提供，歡迎來訊。' 
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-red-500/20">
            <Gavel className="w-3.5 h-3.5" />
            Food and Drug Regulations of Canada
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">加拿大威士忌法規</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            傳統消費者認知的加拿大威士忌是以其高比例的裸麥威士忌（Rye）與著名的「9.09% 規則」。
            其法律體系由食品藥物法（FDR）、產地認證命令和食品查核機構之法規共同構成。
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-red-500/10 overflow-hidden text-center">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse min-w-[900px] table-fixed">
                <thead className="bg-red-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm font-bold text-white/90 border-r border-red-500/10 last:border-r-0">
                      <div>🇨🇦 加拿大</div>
                      <div className="text-sm font-normal">1. C.R.C. c870</div>
                      <div className="text-sm font-normal">2. SI/2009-61</div>
                    </td>
                    <td className="p-4 text-xs text-red-500 font-bold border-r border-red-500/10 last:border-r-0 text-left leading-relaxed">
                      <div>1. 加拿大威士忌</div>
                      <div>2. 裸麥威士忌</div>
                      <div>3. 裸麥麥芽威士忌</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-red-500/10 last:border-r-0 text-left">
                      穀物或穀物製品
                    </td>
                    <td className="p-4 text-sm text-green-500 font-bold border-r border-red-500/10 last:border-r-0 text-center">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center">酵母 + 微生物</td>
                    <td className="p-4 text-xs leading-relaxed text-red-500 font-bold border-r border-red-500/10 last:border-r-0 text-left">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center">－（無限制）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto custom-scrollbar border-t border-red-500/20">
              <table className="w-full border-collapse min-w-[900px] table-fixed">
                <thead className="bg-red-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500/60 border-b border-r border-red-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center">無規定</td>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center">≤700L</td>
                    <td className="p-4 text-sm text-red-500 font-bold border-r border-red-500/10 last:border-r-0 text-center text-balance">木桶</td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-red-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 威士忌熟成：最少 3 年</div>
                      <div>2. 調入酒熟成：最少 2 年</div>
                      <div>（葡萄酒不須陳年）</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-red-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 最年輕年份</div>
                      <div>2. 調入酒 &lt; 9.09%：按原始酒齡</div>
                      <div>3. 調入酒 &gt; 9.09%：按最年輕酒計算</div>
                    </td>
                    <td className="p-4 text-sm text-green-500 border-r border-red-500/10 last:border-r-0 text-center font-bold">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-red-500/10 last:border-r-0 text-center text-balance border-balance underline decoration-red-500/30">40%vol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold font-serif">法規條文摘要 1：CRC, c. 870</h2>
              </div>
            </div>
            <p className="mt-2 text-white/40 text-base italic">Food and Drug Regulations / 食品藥物條例</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-whisky-950 border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/40 w-16">條次</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/40">原文 (English)</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/60">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {crc870Rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs font-mono text-white/40 align-top">{row.id}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/35 italic align-top">{row.en}</td>
                    <td className="p-4 text-base leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold font-serif">法規條文摘要 2：SI/2009-61</h2>
              </div>
            </div>
            <p className="mt-2 text-white/40 text-base italic">Certificates of Age and Origin for Distilled Spirits Produced or Packaged in Canada Order</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-whisky-950 border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/40 w-16">條次</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/40">原文 (English)</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-red-500/60">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {si2009Rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs font-mono text-white/40 align-top">{row.id}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/35 italic align-top">{row.en}</td>
                    <td className="p-4 text-base leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div className="text-base text-white/50 leading-relaxed">
                <span className="text-red-500 font-bold">法律提示：</span> 本頁面提供之法規摘要僅供教育與參考用途。加拿大法律條文可能隨時更新，正確且完整之內容請務必參考加拿大聯邦官方網站 (Justice Laws Website)。
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-red-500/10 bg-red-500/5">
            <div className="prose prose-invert prose-red max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                加拿大的法規體系展現了與蘇格蘭截然不同的思維：它更重視貿易與混合的靈活性，而非單一純粹。這種靈活性造就了風格獨特的多樣性。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-red-500 font-bold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                       {comment.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed text-justify">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-red-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/canadian"
                  className="group flex items-center gap-3 bg-red-500 text-white font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「楓葉旅者」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold font-serif">法律文件連結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._870/page-19.html#h-569729" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-red-500/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all group"
            >
              <h3 className="text-red-500 font-bold mb-2 group-hover:text-red-400 transition-colors">1. 食品藥物條例 (CRC, c. 870)</h3>
              <p className="text-white/50 text-xs mb-4">Food and Drug Regulations - Government of Canada</p>
              <div className="flex items-center gap-2 text-red-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://laws-lois.justice.gc.ca/eng/regulations/SI-2009-61/20090618/P1TT3xt3.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-red-500/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all group"
            >
              <h3 className="text-red-500 font-bold mb-2 group-hover:text-red-400 transition-colors">2. 酒齡與產地證明書命令 (SI/2009-61)</h3>
              <p className="text-white/50 text-xs mb-4">Certificates of Age and Origin Order - Government of Canada</p>
              <div className="flex items-center gap-2 text-red-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

