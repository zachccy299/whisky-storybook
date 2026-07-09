import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { RegulationSummaryTable } from '../components/RegulationSummaryTable';

export function ScotchRegulations() {
  const regulationRows = [
    { id: `3.—(1)`, en: `In these Regulations “Scotch Whisky” means a whisky produced in Scotland—`, cn: `在本規章中，「蘇格蘭威士忌」指在蘇格蘭生產的威士忌：` },
    { id: `3.—(1)(a)`, en: `that has been distilled at a distillery in Scotland from water and malted barley (to which only whole grains of other cereals may be added) all of which have been—`, cn: `必須在蘇格蘭的蒸餾廠中，由水與發芽大麥（僅能額外添加其他穀物的整粒穀粒）進行生產，且全數過程必須：` },
    { id: `3.—(1)(a)(i)`, en: `processed at that distillery into a mash;`, cn: `在該蒸餾廠內加工成穀漿 (Mash)；` },
    { id: `3.—(1)(a)(ii)`, en: `converted at that distillery into a fermentable substrate only by endogenous enzyme systems; and`, cn: `在該蒸餾廠內，僅透過內源酶系統 (Endogenous Enzyme Systems) 轉化為可發酵的基質；以及` },
    { id: `3.—(1)(a)(iii)`, en: `fermented at that distillery only by the addition of yeast;`, cn: `在該蒸餾廠內，僅透過加入酵母進行發酵；` },
    { id: `3.—(1)(b)`, en: `that has been distilled at an alcoholic strength by volume of less than 94.8 per cent so that the distillate has an aroma and taste derived from the raw materials used in, and the method of, its production;`, cn: `蒸餾後的酒精濃度低於 94.8%vol，以確保蒸餾液具有源自原料及其生產方式的香氣與風味；` },
    { id: `3.—(1)(c)`, en: `that has been matured only in oak casks of a capacity not exceeding 700 litres;`, cn: `僅能熟成於容量不超過 700 公升的橡木桶中；` },
    { id: `3.—(1)(d)`, en: `that has been matured only in Scotland;`, cn: `必須全程在蘇格蘭境內進行熟成；` },
    { id: `3.—(1)(e)`, en: `that has been matured for a period of not less than three years;`, cn: `熟成期間不得少於3年；` },
    { id: `3.—(1)(f)`, en: `that has been matured only in an excise warehouse or a permitted place;`, cn: `僅能在保稅倉庫或核可的場所進行熟成；` },
    { id: `3.—(1)(g)`, en: `that retains the colour, aroma and taste derived from the raw materials used in, and the method of, its production and maturation;`, cn: `必須保留源自原料、生產方式及熟成過程所產生的色澤、香氣與風味；` },
    { id: `3.—(1)(h)`, en: `to which no substance has been added, or to which no substance has been added except—`, cn: `不得添加任何物質，但下列物質除外：` },
    { id: `3.—(1)(h)(i)`, en: `water;`, cn: `水；` },
    { id: `3.—(1)(h)(ii)`, en: `plain caramel colouring; or`, cn: `普通焦糖著色劑；或` },
    { id: `3.—(1)(h)(iii)`, en: `water and plain caramel colouring; and`, cn: `水與普通焦糖著色劑；以及` },
    { id: `3.—(1)(i)`, en: `that has a minimum alcoholic strength by volume of 40%.`, cn: `裝瓶後的最低酒精濃度為 40%vol。` },
    { id: `3.—(2)`, en: `In these Regulations—`, cn: `在本規章中：` },
    { id: `3.—(2) Single Malt`, en: `“Single Malt Scotch Whisky” means a Scotch Whisky that has been distilled in one or more batches—`, cn: `「單一麥芽蘇格蘭威士忌」指符合下列條件，並採批次蒸餾的蘇格蘭威士忌：` },
    { id: `3.—(2)(a)`, en: `at a single distillery;`, cn: `在單一蒸餾廠內蒸餾；` },
    { id: `3.—(2)(b)`, en: `from water and malted barley without the addition of any other cereals; and`, cn: `原料僅使用水與發芽大麥，不添加任何其他穀物；以及` },
    { id: `3.—(2)(c)`, en: `in pot stills;`, cn: `使用壺式蒸餾器 (Pot Stills) 進行蒸餾；` },
    { id: `3.—(2) Single Grain`, en: `“Single Grain Scotch Whisky” means a Scotch Whisky that has been distilled at a single distillery except—`, cn: `「單一穀物蘇格蘭威士忌」指在單一蒸餾廠內蒸餾，但不屬於下列類別的蘇格蘭威士忌：` },
    { id: `3.—(2)(a)`, en: `Single Malt Scotch Whisky; or`, cn: `單一麥芽蘇格蘭威士忌；或` },
    { id: `3.—(2)(b)`, en: `a Blended Scotch Whisky;`, cn: `調和蘇格蘭威士忌；` },
    { id: `3.—(2) Blended Malt`, en: `“Blended Malt Scotch Whisky” means a blend of two or more Single Malt Scotch Whiskies that have been distilled at more than one distillery;`, cn: `「調和麥芽蘇格蘭威士忌」指由兩款或以上，產自不同蒸餾廠的單一麥芽蘇格蘭威士忌所調配而成的產品；` },
    { id: `3.—(2) Blended Grain`, en: `“Blended Grain Scotch Whisky” means a blend of two or more Single Grain Scotch Whiskies that have been distilled at more than one distillery; and`, cn: `「調和穀物蘇格蘭威士忌」指由兩款或以上，產自不同蒸餾廠的單一穀物蘇格蘭威士忌所調配而成的產品；以及` },
    { id: `3.—(2) Blended Scotch`, en: `“Blended Scotch Whisky” means a blend of one or more Single Malt Scotch Whiskies with one or more Single Grain Scotch Whiskies.`, cn: `「調和蘇格蘭威士忌」指由一款或多款單一麥芽蘇格蘭威士忌，與一款或多款單一穀物蘇格蘭威士忌調配而成的產品。` },
    { id: `5.—(1)`, en: `A person must not manufacture a whisky distillate in Scotland unless it is manufactured in the manner described in regulation 3(1)(a) and (b).`, cn: `除非按照第 3(1)(a) 條及 (b) 條所述方式生產，否則任何人不得在蘇格蘭製造威士忌蒸餾液。` },
    { id: `5.—(2)`, en: `A person must not manufacture any whisky in Scotland except Scotch Whisky.`, cn: `除蘇格蘭威士忌外，任何人不得在蘇格蘭製造任何威士忌。` },
    { id: `6.—(1)`, en: `A person must not label, package, sell, advertise or promote any drink as Scotch Whisky or Scotch if it is not Scotch Whisky.`, cn: `若非蘇格蘭威士忌，任何人不得將任何飲料作為蘇格蘭威士忌進行標示、包裝、銷售、廣告或促銷。` },
    { id: `6.—(2)`, en: `A person must not label, package, sell, advertise or promote any drink in any other way that creates a likelihood of confusion on the part of the public as to whether the drink is Scotch Whisky.`, cn: `任何人不得以任何其他可能導致公眾對該飲料是否為蘇格蘭威士忌產生混淆的方式，對任何飲料進行標示、包裝、銷售、廣告或促銷。` },
    { id: `7.—(1)`, en: `A person must not move any of the following categories of Scotch Whisky from Scotland to another country in a wooden cask or other wooden holder—`, cn: `任何人不得以木桶或其他木製容器，將下列類別的蘇格蘭威士忌從蘇格蘭移運至另一個國家：` },
    { id: `7.—(1)(a)`, en: `Single Grain Scotch Whisky;`, cn: `單一穀物蘇格蘭威士忌；` },
    { id: `7.—(1)(b)`, en: `Blended Malt Scotch Whisky;`, cn: `調和麥芽蘇格蘭威士忌；` },
    { id: `7.—(1)(c)`, en: `Blended Grain Scotch Whisky; or`, cn: `調和穀物蘇格蘭威士忌；或` },
    { id: `7.—(1)(d)`, en: `Blended Scotch Whisky.`, cn: `調和蘇格蘭威士忌。` },
    { id: `7.—(2)`, en: `During the period until (and including) 22nd November 2012, a person must not move any Single Malt Scotch Whisky from Scotland to another country in a wooden cask or other wooden holder.`, cn: `在 2012 年 11 月 22 日（含）前的期間內，任何人不得以木桶或其他木製容器將任何單一麥芽蘇格蘭威士忌從蘇格蘭移運至另一個國家。` },
    { id: `7.—(3)`, en: `On and after 23rd November 2012 a person must not move any Single Malt Scotch Whisky from Scotland to another country except in a bottle (made of any inert material) that is labelled for retail sale.`, cn: `自 2012 年 11 月 23 日起，任何人不得將單一麥芽蘇格蘭威士忌從蘇格蘭移運至另一個國家，除非是裝在已貼上零售標籤的瓶中（由任何惰性材料製成）。` },
    { id: `7.—(4)`, en: `For the purposes of this regulation a person is regarded as having moved Scotch Whisky from Scotland to another country if they—`, cn: `就本條而言，若任何人符合下列情況，即被視為已將蘇格蘭威士忌從蘇格蘭移運至另一個國家：` },
    { id: `7.—(4)(a)`, en: `physically move the whisky from Scotland to another country; or`, cn: `親自將威士忌從蘇格蘭運送至另一個國家；或` },
    { id: `7.—(4)(b)`, en: `arrange (whether directly or through a third party) for another person to physically move the whisky from Scotland to another country.`, cn: `（不論是直接或透過第三方）安排他人將威士忌從蘇格蘭運送至另一個國家。` },
    { id: `7.—(5)`, en: `In this regulation “retail sale” means any sale except a sale for use or resale in the course of a trade or business.`, cn: `在本條中，「零售」指除貿易或商業過程中的使用或轉售以外的任何銷售。` },
    { id: `10.—(5)`, en: `The protected localities are—`, cn: `受保護的產地 (Locality) 為：` },
    { id: `10.—(5)(a)`, en: `“Campbeltown”, comprising the South Kintyre ward of the Argyll and Bute Council as that ward is constituted in the Argyll and Bute (Electoral Arrangements) Order 2006(a); and`, cn: `「坎貝爾鎮」(Campbeltown)，包含根據《2006年阿蓋爾-比特（選舉安排）令》構成的阿蓋爾-比特議會南金泰爾選區；以及` },
    { id: `10.—(5)(b)`, en: `“Islay”, comprising the Isle of Islay in Argyll.`, cn: `「艾雷島」(Islay)，包含阿蓋爾郡的艾雷島。` },
    { id: `10.—(6)`, en: `The protected regions are—`, cn: `受保護的產區 (Region) 為：` },
    { id: `10.—(6)(a)`, en: `“Highland”, comprising that part of Scotland that is north of the line dividing the Highland region from the Lowland region;`, cn: `「高地」(Highland)，包含蘇格蘭境內高地與低地分界線以北的部分；` },
    { id: `10.—(6)(b)`, en: `“Lowland”, comprising that part of Scotland that is south of the line dividing the Highland region from the Lowland region; and`, cn: `「低地」(Lowland)，包含蘇格蘭境內高地與低地分界線以南的部分；以及` },
    { id: `10.—(6)(c)`, en: `“Speyside”, comprising—`, cn: `「詩貝區」(Speyside)，包含：` },
    { id: `10.—(6)(c)(i)`, en: `the wards of Buckie, Elgin City North, Elgin City South, Fochabers Lhanbryde, Forres, Heldon and Laich, Keith and Cullen and Speyside Glenlivet of the Moray Council as those wards are constituted in the Moray (Electoral Arrangements) Order 2006(b); and`, cn: `根據《2006年馬里（選舉安排）令》構成的馬里議會下屬之巴基、北埃爾金市、南埃爾金市、福哈伯斯-蘭布賴德、福里斯、赫爾登與萊奇、凱斯與卡倫，以及斯貝賽-格蘭利威等選區；以及` },
    { id: `10.—(6)(c)(ii)`, en: `the Badenoch and Strathspey ward of the Highland Council as that ward is constituted in the Highland (Electoral Arrangements) Order 2006(c).`, cn: `根據《2006年高地（選舉安排）令》構成的高地議會巴德諾赫與斯特拉斯佩選區。` },
    { id: `11.—`, en: `A person must not label, package, sell, advertise or promote any Scotch Whisky in a way that includes—`, cn: `任何人不得以包含下列內容的方式對蘇格蘭威士忌進行標示、包裝、銷售、廣告或促銷：` },
    { id: `11.(a)`, en: `the phrase ‘pure malt’ or any derivation of that phrase; or`, cn: `「純麥」(pure malt) 一詞或該詞的任何衍生詞；或` },
    { id: `11.(b)`, en: `the words ‘pure’ and ‘malt’, or any derivation of those words in a way that, although the words are separated from each other (whether by text or otherwise), the word ‘pure’ (or any derivation of it) is used adjectivally in connection with the word ‘malt’ (or any derivation of it).`, cn: `「純」(pure) 與「麥芽」(malt) 字樣或其任何衍生字，若兩字雖然分開（不論是透過文字或其他方式），但「純」字（或其衍生字）被作為形容詞與「麥芽」字（或其衍生字）結合使用。` },
    { id: `12.—(1)`, en: `Without prejudice to the obligation to comply with the directly applicable requirements of Article 12(3) of Regulation (EC) No 110/2008 (which requires, among other things, that any maturation period or age may only be specified in the description, presentation or labelling of a spirit drink where it refers to the youngest alcoholic component in the drink), a person must not label, package, sell, advertise or promote any Scotch Whisky in a way that includes a reference to its maturation period or age unless the maturation period or age is expressed in years.`, cn: `在不影響遵守歐盟第 110/2008 號規章第 12(3) 條直接適用之規定義務（該條要求包括：烈酒飲料的描述、呈現或標示中，若有註明任何熟成期間或酒齡，必須係指該飲料中酒齡最年輕的酒精成分）的前提下，任何人對蘇格蘭威士忌進行標示、包裝、銷售、廣告或促銷時，不得包含其熟成期間或酒齡之參考資料，除非該熟成期間或酒齡是以「年」來表示。` },
    { id: `12.—(2)`, en: `A person must not label, package, sell, advertise or promote any Scotch Whisky in a way that includes a reference relating to when it was distilled unless—`, cn: `任何人不得以包含與其蒸餾時間相關參考資料的方式標示、包裝、銷售、廣告或促銷蘇格蘭威士忌，除非：` },
    { id: `12.—(2)(a)`, en: `the reference relates to a single calendar year;`, cn: `該參考資料係指單一曆年；` },
    { id: `12.—(2)(b)`, en: `all of the whisky in the drink was distilled in that year;`, cn: `該飲料中所有的威士忌皆於該年份蒸餾；` },
    { id: `12.—-2)(c)`, en: `the presentation of the whisky also includes a reference to—`, cn: `威士忌的呈現方式亦包含下列參考資料之一：` },
    { id: `12.—(2)(c)(i)`, en: `the year of bottling of the whisky;`, cn: `威士忌的裝瓶年份；` },
    { id: `12.—(2)(c)(ii)`, en: `the maturation period of the whisky; or`, cn: `威士忌的熟成期限；或` },
    { id: `12.—(2)(c)(iii)`, en: `the age of the whisky; and`, cn: `威士忌的年份（酒齡）；以及` },
    { id: `12.—(2)(d)`, en: `the reference to the year of bottling, the maturation period, or age of the whisky appears in the same field of vision as the reference to the year of distillation.`, cn: `裝瓶年份、熟成期限或酒齡的參考資料，必須與蒸餾年份的參考資料出現在同一個視線範圍內。` },
    { id: `12.—(3)`, en: `A person must not label, package, sell, advertise or promote any Scotch Whisky in a way that includes a reference to any number (however expressed) if the reference to that number may create a likelihood of confusion on the part of the public as to whether the number relates to the maturation period of the whisky, its age or when it was distilled.`, cn: `若任何數字（不論以何種方式表達）的參考資料可能導致公眾對該數字係指熟成期限、酒齡或蒸餾時間產生混淆，任何人不得以包含該數字參考資料的方式對蘇格蘭威士忌進行標示、包裝、銷售、廣告或促銷。` },
  ];

  const expertComments = [
    { title: '糖化與過濾的細節', desc: '條文 3.—(1)(a)(i) 指的是穀漿 (Mash) 而非麥汁 (Wort)。這是因為穀物蒸餾廠通常不進行過濾（因為不過濾），而麥芽蒸餾廠則在糖化後過濾。一般麥芽廠製造麥漿後會過濾成麥汁，少數採用壓榨法。' },
    { title: '核可場所的範疇', desc: '條文 3.—(1)(f) 的熟成場所除保稅倉庫外，也包含核可的科研單位，這為威士忌的技術研發留下了法律空間。' },
    { title: '焦糖著色的法規演進', desc: '條文 3.—(1)(h)(ii) 提到的普通焦糖，現依據歐盟法規 EU 2019/787 標示為 E150a，原文對應時間點為 EC 110:2008。' },
    { title: '產區劃分的真相', desc: '法律保護的產區僅有五個：坎貝爾鎮、艾雷島、高地、低地、詩貝區。大眾常說的「島嶼區 (Islands)」在法律定義中是被劃在「高地 (Highland)」內的。' },
    { title: 'Pure Malt 的歷史警告', desc: '條文11嚴禁使用 Pure Malt，是因為歷史上曾經多次被不肖廠商用 "Pure Malt" 字眼搭配不存在的蒸餾廠名，誤導消費者以為是Single Malt。但近期某跨國集團在亞洲某國出威士忌產品時使用Pure Malt混淆視聽，雖然蘇格蘭威士忌法規不管，但消費者極度反彈。' },
    { title: '最年輕酒液原則', desc: '條文 12.—(1) 規定年份標示必須係指「最年輕酒量成分」。這確保了年份標示的诚信度，杜絕了高低年份混淆視聽。' },
    { title: '境內生產唯一性', desc: '條文 5.—(2) 規定在蘇格蘭境內「只能」生產蘇格蘭威士忌，不得生產非法律定義的其他類別威士忌。' }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/20"
          >
            <Gavel className="w-3.5 h-3.5" />
            The Scotch Whisky Regulations 2009
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">蘇格蘭威士忌法規</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            這是早期出現、經典且較為嚴謹的威士忌法律框架，讓蘇格蘭威士忌在國際有著一定地位
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-blue-500/10 overflow-hidden text-center">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse min-w-[900px] table-fixed">
                <thead className="bg-blue-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm font-bold text-white/90 border-r border-blue-500/10 last:border-r-0">
                      <div>🏴󠁧󠁢󠁳󠁣󠁴󠁿 蘇格蘭</div>
                      <div className="text-sm font-normal">1. SWR 2009</div>
                      <div className="text-sm font-normal">2. 技術文件</div>
                    </td>
                    <td className="p-4 text-xs text-blue-500 font-bold border-r border-blue-500/10 last:border-r-0 text-left leading-relaxed">
                      <div>1. 單一麥芽</div>
                      <div>2. 調和麥芽</div>
                      <div>3. 單一穀物</div>
                      <div>4. 調和穀物</div>
                      <div>5. 調和威士忌</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-blue-500/10 last:border-r-0 text-left">
                      <div>1. 麥芽威士忌：100% 大麥芽</div>
                      <div>2. 穀物威士忌：大麥芽 + 穀物</div>
                    </td>
                    <td className="p-4 text-sm text-red-500 font-bold border-r border-blue-500/10 last:border-r-0 text-center">✗ 不允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">僅酵母</td>
                    <td className="p-4 text-[11px] leading-relaxed text-blue-500 font-bold border-r border-blue-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 麥芽：批次銅壺式 (技術文件規範)</div>
                      <div>2. 穀物：無限制</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">≤94.8% vol</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse min-w-[900px] border-t border-blue-500/20 table-fixed">
                <thead className="bg-blue-500/10">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-500/60 border-b border-r border-blue-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">無規定</td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">≤700L</td>
                    <td className="p-4 text-sm text-blue-500 font-bold border-r border-blue-500/10 last:border-r-0 text-center text-balance">橡木桶</td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center">最少 3 年</td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-blue-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 最年輕年份</div>
                      <div>2. 單一年份要全單一年度蒸餾</div>
                    </td>
                    <td className="p-4 text-sm text-green-500 border-r border-blue-500/10 last:border-r-0 text-center">✓ 允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-blue-500/10 last:border-r-0 text-center text-balance border-balance underline decoration-blue-500/30">40%vol</td>
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
               <FileText className="w-6 h-6 text-blue-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: The Scotch Whisky Regulations 2009
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
                    <td className="p-4 text-[11px] text-blue-500/50 font-mono align-top">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex gap-4 items-start">
               <AlertCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
               <div className="text-sm text-white/50 leading-relaxed">
                  <span className="text-blue-500 font-bold">法律提示：</span> 以上內容為《蘇格蘭威士忌法規 2009》之條款摘要翻譯。全文法律效力以英國官方發布之原始版本為準。
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-blue-500/10 bg-blue-500/5">
            <div className="prose prose-invert prose-blue max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                蘇格蘭威士忌法規（SWR 2009）是兩個世紀以來不停更新的法規，它是最早定義「何謂威士忌？」並全面從原料、製程和標籤給予規範，作為蘇格蘭威士忌能夠在常年席捲全球的基石。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-blue-500 font-bold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       {comment.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-blue-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/scotch"
                  className="group flex items-center gap-3 bg-blue-500 text-whisky-950 font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「氏族探險家」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold font-serif">法律文件連結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://www.legislation.gov.uk/uksi/2009/2890/contents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-blue-500/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
            >
              <h3 className="text-blue-500 font-bold mb-2 group-hover:text-blue-400 transition-colors">1. 蘇格蘭威士忌法規 (SWR 2009)</h3>
              <p className="text-white/50 text-xs mb-4">The Scotch Whisky Regulations 2009 - Official UK Legislation</p>
              <div className="flex items-center gap-2 text-blue-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://assets.publishing.service.gov.uk/media/5fd36667e90e07662ed92c85/Scotch_Whisky_Technical_File_-_June_2019.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-blue-500/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
            >
              <h3 className="text-blue-500 font-bold mb-2 group-hover:text-blue-400 transition-colors">2. 蘇格蘭威士忌技術文件 (PDF)</h3>
              <p className="text-white/50 text-xs mb-4">Scotch Whisky Technical File - June 2019 Revised Version</p>
              <div className="flex items-center gap-2 text-blue-500/60 text-xs font-bold">
                下載文件 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://assets.publishing.service.gov.uk/media/5a822113ed915d74e3401e13/Draft_Opinion_Alcohol_Declaration_Tolerances_Final.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-blue-500/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
            >
              <h3 className="text-blue-500 font-bold mb-2 group-hover:text-blue-400 transition-colors">3. 英國商業能源與產業策略部之化學分析公報 - 0.3%誤差出處</h3>
              <p className="text-white/50 text-xs mb-4">Draft Opinion: Alcohol Declaration Tolerances - BEIS</p>
              <div className="flex items-center gap-2 text-blue-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
