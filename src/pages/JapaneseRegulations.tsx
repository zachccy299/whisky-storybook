import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RegulationSummaryTable } from '../components/RegulationSummaryTable';

export function JapaneseRegulations() {
  const liquorTaxRows = [
    { id: `第一章`, jp: `総則`, cn: `總則` },
    { id: `十五`, jp: `ウイスキー　次に掲げる酒類（イ又はロに掲げるものについては、第九号ロからニまでに掲げるものに該当するものを除く。）をいう。`, cn: `係指下列各類酒類（但就下列イ或ロ所列之酒類，不包括符合第九號ロ至ニ所列之酒類）` },
    { id: `十五 イ`, jp: `発芽させた穀類及び水を原料として糖化させて、発酵させたアルコール含有物を蒸留したもの（当該アルコール含有物の蒸留の際の留出時のアルコール分が九十五度未満のものに限る。）`, cn: `以發芽之穀類及水為原料進行糖化、發酵並蒸餾後所得之含酒精產品（蒸餾之溜出酒精濃度未滿95%vol）。` },
    { id: `十五 ロ`, jp: `発芽させた穀類及び水によつて穀類を糖化させて、発酵させたアルコール含有物を蒸留したもの（当該アルコール含有物の蒸留の際の留出時のアルコール分が九十五度未満のものに限る。）`, cn: `以發芽之穀類及水對穀類進行糖化，發酵並蒸餾後所得之含酒精產品（蒸餾之溜出酒精濃度未滿95%vol）。` },
    { id: `十五 ハ`, jp: `イ又はロに掲げる酒類にアルコール、スピリッツ、香味料、色素又は水を加えたもの（イ又はロに掲げる酒類のアルコール分の総量がアルコール、スピリッツ又は香味料を加えた後の酒類のアルコール分の総量の百分の十以上のものに限る。）`, cn: `於イ或ロ所列之酒，可添加酒精、烈酒（spirit）、香料、色素或水之產品（但添加後產品中，原屬於イ或ロ之酒產品之酒精總量需占酒精總量10%以上）。` },
    { id: `第三章`, jp: `課税標準及び税率`, cn: `課稅標準及稅率` },
    { id: `第二十三条`, jp: `酒税の税率は、酒類の種類に応じ、一キロリットルにつき、次に定める金額とする。`, cn: `酒稅之稅率，應依酒類之種類區分，按每一千公升計算，適用下列所定之金額。` },
    { id: `第二十三条  - 3`, jp: `蒸留酒類のうちウイスキー、ブランデー及びスピリッツであつてアルコール分が三十七度未満のものに係る酒税の税率は、第一項の規定にかかわらず、一キロリットルにつき三十七万円とする。`, cn: `蒸餾酒類中之威士忌、白蘭地及蒸餾酒（spirit），其酒精濃度未滿三十七度者，其酒稅稅率不適用第一項之規定，改按每一千公升課徵三十七萬日圓。` },
  ];

  const enforcementOrderRows = [
    { id: `第八章`, jp: `雑則`, cn: `雜則` },
    { id: `第五十条 - 7 - 一`, jp: `蒸留酒類と水との混和をしてアルコール分が二十度以上（ウイスキー、ブランデー又はスピリッツと水との混和をした場合にあつては、アルコール分が三十七度以上）の酒類としたとき。`, cn: `當蒸餾酒類與水混合，使其成為酒精濃度達二十度以上之酒類時（但若為威士忌、白蘭地或蒸餾酒〔spirit〕與水混合之情形，則須達酒精濃度三十七度以上）。` },
  ];

  const jslmaRows = [
    { id: `Article 2 Definitions`, en: `Except as otherwise provided herein, the terms in the Labeling Standards have the meanings ascribed to them in the Liquor Tax Act (Act No. 6 of 1953) (hereinafter the "Liquor Tax Act"), the Act on the Preservation of Liquor Tax and Liquor Industry Association (Act No. 7 of 1953) (hereinafter referred to as the "Liquor Association Act"), the Fair Competition Code on the Labeling of Whisky (Japan Fair Trade Commission Public Notice No. 22, dated August 7, 1980) and the Enforcement Regulations of the Fair Competition Code on the Labeling of Whisky (as approved and enacted by the Japan Fair Trade Commission on July 30, 1980).`, cn: `第二條 除本規範另有規定外，本標示規範中所使用之用語，應依據以下法規所賦予之定義解釋：包括《酒稅法》（1953年第6號法）、《酒稅保全及酒類業組合法》（1953年第7號法）、《威士忌標示公平競爭規約》（日本公平交易委員會1980年8月7日第22號公告），以及《威士忌標示公平競爭規約施行細則》（經日本公平交易委員會於1980年7月30日核准施行）。` },
    { id: `Article 3 Scope`, en: `The Labeling Standards apply to whisky sold in Japan or sold from Japan for overseas use by business operators.`, cn: `第三條 本標示規範適用於業者在日本境內銷售之威士忌，或由日本出口供海外使用之威士忌產品。` },
    { id: `Article 5 Standards of Use of Specified Term for Whisky`, en: ``, cn: `第五條 威士忌特定用語使用標準` },
    { id: `5-(1)`, en: `The specified term for whisky listed in the left column of the following table may be used to label a whisky product only when such whisky satisfies the production method quality requirements set forth in the right column.`, cn: `表格左欄所列之威士忌特定用語，僅得於該威士忌產品符合右欄所規定之製造方法及品質要求時，方可用於其標示。` },
    { id: ``, en: `"Japanese whisky" or "Japanese whiskey"`, cn: `日本威士忌(Japanese whisky或Japanese whiskey)` },
    { id: ``, en: `Raw ingredients: Raw ingredients must be limited to malted grains, other cereal grains, and water extracted in Japan.`, cn: `原料應僅限於發芽穀物、其他穀物，以及於日本國內取得之水。` },
    { id: ``, en: `Malted grains must always be used.`, cn: `發芽穀物必須永遠使用` },
    { id: ``, en: `Production method: Production: Saccharification, fermentation, and distillation must be carried out at a distillery in Japan. Alcohol content at the time of distillation must be less than 95%.`, cn: `糖化、發酵及蒸餾必須於日本境內的蒸餾廠內進行；且蒸餾時之酒精濃度必須小於95%vol。` },
    { id: ``, en: `Production method: Aging: The distilled product must be poured into wooden casks not exceeding a capacity of 700 liters and matured in Japan for a period of at least 3 years thereafter.`, cn: `蒸餾所得之酒液必須裝入容量不超過700公升之木桶中，並於日本進行熟成至少3年。` },
    { id: ``, en: `Production method: Bottling: Bottling must take place only in Japan, with alcoholic strength of at least 40% as of such time`, cn: `裝瓶必須在日本境內進行，且裝瓶酒精濃度不得低於40%vol。` },
    { id: ``, en: `Production method: Other: Plain caramel coloring can be used.`, cn: `可使用普通焦糖色素調色(Plain Caramel)。` },
    { id: `5-(2)`, en: `The specified term set forth in paragraph 1 shall include the words “Japanese” and “whisky" (or "whiskey") in a unified and integrated manner without inserting additional words between them.`, cn: `第1項所定之特定用語，應以「Japanese」與「whisky」（或「whiskey」）作為一體且不可分割之表述方式使用，且其間不得插入任何其他字詞。` },
    { id: `5-(3)`, en: `For whisky that meets the production method quality requirements set forth in paragraph 1, the type of whisky may be indicated together with the specified term if based on the permissible labeling of types of whisky under the Fair Competition Code .`, cn: `對於符合第1項所規定之製造方法及品質要求之威士忌，得依據公平競爭規約所允許之威士忌類型標示方式，將其類型與該特定用語併同標示。` },
    { id: `5-(3)- Fair Competition Code Supplement`, en: `It is currently understood that the types of whisky permitted to be labeled under the Fair Competition Code include the following: "Malt Whisky", "Grain Whisky", "Blended Whisky", "Straight Whisky", "Single Whisky" and "Pure Whisky".`, cn: `目前一般理解為，依據公平競爭規約允許標示之威士忌類型，包括：「Malt Whisky（麥芽威士忌）」、「Grain Whisky（穀物威士忌）」、「Blended Whisky（調和威士忌）」、「Straight Whisky（純釀威士忌）」、「Single Whisky（單一威士忌）」以及「Pure Whisky（純威士忌）」。` },
    { id: `Article 6 Prohibition of Misleading Labeling`, en: ``, cn: `第六條 誤導性標示之禁止` },
    { id: `6-(1)`, en: `The specified terms set forth in Article 5 may not be used in labeling products unless the production method quality requirements set forth in Article 5 are satisfied, even if such terms are expressed through or with`, cn: `除非符合第5條所規定之製造方法及品質要求，否則不得於產品標示中使用第5條所列之特定用語；即使該等用語係透過下列方式表達，亦不得使用：` },
    { id: `6-(1)-(i)`, en: `(i) words that have the same meanings as those terms (e.g., "Nihon whisky” or "Japan whisky"),`, cn: `(i) 與該等用語具有相同意義之詞語（例如「Nihon whisky」或「Japan whisky」）；` },
    { id: `6-(1)-(ii)`, en: `(ii) translations into Japanese or a foreign language or`, cn: `(ii) 其日文或其他外國語言之翻譯，或；` },
    { id: `6-(1)-(iii)`, en: `(iii) terms such as "type" or "style".`, cn: `(iii) 使用「type」或「style」等字樣。` },
    { id: `6-(2)`, en: `Business operators shall not use labeling that includes any of the items below for products that do not satisfy the production method quality requirements set forth in Article 5, unless measures are taken to clarify that the product being labeled does not meet such requirements:`, cn: `對於未符合第5條所規定之製造方法及品質要求之產品，除非已採取措施明確說明該產品不符合上述要求，否則業者不得使用包含下列各項內容之標示：` },
    { id: `6-(2)-(i)`, en: `(i) Names of people that evoke Japan`, cn: `(i) 使人聯想到日本之人物名稱` },
    { id: `6-(2)-(ii)`, en: `(ii) Names of Japanese cities, regions, famous places, mountains and rivers`, cn: `(ii) 日本之城市、地區、名勝、山川等名稱` },
    { id: `6-(2)-(iii)`, en: `(iii) The Japanese flag or a Japanese era name`, cn: `(iii) 日本國旗或日本年號` },
    { id: `6-(2)-(iv)`, en: `(iv) Any other labeling that makes it likely that the product being labeled is mistaken for a product that satisfies the production method quality requirements set forth in Article 5.`, cn: `(iv) 其他任何可能使該產品被誤認為符合第5條製造方法及品質要求之標示` },
    { id: `6-(3)`, en: `Business operators shall not use labeling that makes it likely that alcohol products that do not meet the definition of "whisky" under the Liquor Tax Act are mistaken for whisky, and shall not supply, or cooperate in supplying, alcohol products to vendors that use such labeling.`, cn: `業者不得使用任何可能使不符合《酒稅法》所定義之「威士忌」之酒類產品被誤認為威士忌之標示，亦不得向使用此類標示之販售者供應或協助供應該等酒類產品。` },
    { id: `Article 7 Administration of Labeling Standards`, en: `Article 7 Administration of Labeling Standards`, cn: `第七條 標示規範之管理` },
  ];

  const expertComments = [
    { title: "透明化的里程碑", desc: "2021 年的 JSLMA 自律規範雖非法條，並無法律效力，而且只能要求「洋酒酒造組合」內的成員，但卻是產業邁向透明化的重要里程碑，旨在過濾掉「偽．日本威士忌」，讓消費者能更清楚識別產地。" },
    { title: "酒精度的差異", desc: "在酒稅法中允許威士忌的裝瓶酒精度為37%vol但標示為「日本威士忌」則不能低於40%vol。" },
    { title: "雖承襲蘇格蘭，但卻更加開放", desc: "讓更多企業能夠進入威士忌產業，蓬勃發展之餘能有更多創新。從法規中看到並無限制使用「外源酵素、酵母和其他菌種」也未現在「蒸餾器」種類，所以能看到更多日本酒廠有不同的創新玩法。" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-pink-500/20">
            <Gavel className="w-3.5 h-3.5" />
            Japanese Whisky Regulations & Standards
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">日本威士忌法律與規範</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            日本威士忌全球爆紅後，原始法規因為相當鬆散，造成大量假日威出現；日本洋酒酒造組合(協會)推動「日本威士忌」標示定義，保護真實正經釀造的日本威士忌能夠發揚光大。
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-pink-500/10 overflow-hidden text-center">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse min-w-[900px] table-fixed">
                <thead className="bg-pink-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm font-bold text-white/90 border-r border-white/5 last:border-r-0">
                      <div>🇯🇵 日本</div>
                      <div className="text-sm font-normal">1. 威士忌標示規範</div>
                      <div className="text-sm font-normal">2. 酒稅法</div>
                      <div className="text-sm font-normal">3. 酒稅法施行令</div>
                    </td>
                    <td className="p-4 text-sm text-pink-500 font-bold border-r border-white/5 last:border-r-0 text-center">日本威士忌</td>
                    <td className="p-4 text-sm leading-relaxed text-white/70 border-r border-white/5 last:border-r-0 text-center text-balance">
                      <div>發芽穀物 + 穀物</div>
                    </td>
                    <td className="p-4 text-sm text-pink-500 font-bold border-r border-white/5 last:border-r-0 text-center text-balance">－（允許）</td>
                    <td className="p-4 text-sm text-pink-500 font-bold border-r border-white/5 last:border-r-0 text-center text-balance">－（允許其他微生物）</td>
                    <td className="p-4 text-sm text-pink-500 font-bold border-r border-white/5 last:border-r-0 text-center text-balance">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center">≤95% vol</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse min-w-[900px] border-t border-pink-500/20 table-fixed">
                <thead className="bg-pink-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-500/60 border-b border-r border-pink-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center text-balance">無規定</td>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center">≤700L</td>
                    <td className="p-4 text-sm text-pink-500 font-bold border-r border-white/5 last:border-r-0 text-center">木桶</td>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center">最少 3 年</td>
                    <td className="p-4 text-xs text-white/70 border-r border-white/5 last:border-r-0 leading-relaxed text-center text-balance">
                      <div>無特別說明</div>
                      <div>（參照蘇格蘭威士忌）</div>
                    </td>
                    <td className="p-4 text-sm text-green-500 border-r border-white/5 last:border-r-0 text-center">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-white/5 last:border-r-0 text-center border-balance underline decoration-pink-500/30">40%vol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 1: Liquor Tax Act */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-pink-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 1：酒稅法</h2>
             </div>
             <div className="text-sm text-white/30 font-mono">昭和二十八年法律第六号</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-whisky-950 border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-16">條次</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-1/2">日文原文 (Japanese)</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {liquorTaxRows.map((row, idx) => (
                  <tr key={`${row.id}-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm font-mono text-white/30 align-top">{row.id}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/40 italic group-hover:text-white/60 align-top">{row.jp}</td>
                    <td className="p-4 text-base leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Enforcement Order */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-pink-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 2：酒稅法施行令</h2>
             </div>
             <div className="text-sm text-white/30 font-mono">酒税法施行令</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-whisky-950 border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-16">條次</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-1/2">日文原文 (Japanese)</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enforcementOrderRows.map((row, idx) => (
                  <tr key={`${row.id}-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm font-mono text-white/30 align-top">{row.id}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/40 italic group-hover:text-white/60 align-top">{row.jp}</td>
                    <td className="p-4 text-base leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: JSLMA Self-Regulation */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-pink-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 3：標示自律規範 (JSLMA)</h2>
             </div>
             <div className="text-sm text-white/30 font-mono">Standards for Labeling Japanese Whisky</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-whisky-950 border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-16">條次</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/40 w-1/2">原文 (English)</th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-white/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jslmaRows.map((row, idx) => (
                  <tr key={`${row.id}-${idx}`} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm font-mono text-white/30 align-top">{row.id}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/40 italic group-hover:text-white/60 align-top">{row.en}</td>
                    <td className="p-4 text-base leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-pink-500/5 border border-pink-500/10 p-6 rounded-2xl flex gap-4 items-start">
               <AlertCircle className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
               <div className="text-base text-white/50 leading-relaxed">
                  <span className="text-pink-500 font-bold">法律提示：</span> 以上內容為日本《酒稅法》、相關施行細則及自律規範之條款摘要翻譯。全文法律效力以日本官方與協會發布之原始版本為準。
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-pink-500/10 bg-pink-500/5">
            <div className="prose prose-invert prose-pink max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                日本威士忌的規範演進，標誌著一個產業從早期的「拿來主義」走向「文化自覺」。更嚴格的自律規範，除了保護產業發展，同時也保護消費者權益，讓日本威士忌在全球威士忌版圖上，擁有一定地位。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-pink-500 font-bold flex items-center gap-2 text-lg">
                       <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                       {comment.title}
                    </h4>
                    <p className="text-base text-white/60 leading-relaxed">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-pink-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/japanese"
                  className="group flex items-center gap-3 bg-pink-500 text-white font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「威士忌足輕」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold font-serif">法律與規範文件連結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              href="https://www.nikka.com/eng/img/topics/pdf/Standards_for_Labeling_Japanese_whisky.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-pink-500/10 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group"
            >
              <h3 className="text-pink-500 font-bold mb-2 group-hover:text-pink-400 transition-colors">1. 日本威士忌標準標示 (JSLMA)</h3>
              <p className="text-white/50 text-sm mb-4">Standards for Labeling Japanese Whisky (Japan Spirits & Liqueurs Makers Association)</p>
              <div className="flex items-center gap-2 text-white/60 text-sm font-bold font-mono">
                PDF DOCUMENT <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://elaws.e-gov.go.jp/document?lawid=328AC0000000006" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-pink-500/10 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group"
            >
              <h3 className="text-pink-500 font-bold mb-2 group-hover:text-pink-400 transition-colors">2. 日本酒稅法 (Liquor Tax Act)</h3>
              <p className="text-white/50 text-sm mb-4">Official Japanese legislation regarding alcohol definition and taxation.</p>
              <div className="flex items-center gap-2 text-white/60 text-sm font-bold font-mono">
                OFFICIAL SOURCE <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://laws.e-gov.go.jp/law/337CO0000000097?occasion_date=20250401" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-pink-500/10 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group"
            >
              <h3 className="text-pink-500 font-bold mb-2 group-hover:text-pink-400 transition-colors">3. 酒税法施行令</h3>
              <p className="text-white/50 text-sm mb-4">Order for Enforcement of the Liquor Tax Act.</p>
              <div className="flex items-center gap-2 text-white/60 text-sm font-bold font-mono">
                OFFICIAL SOURCE <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

