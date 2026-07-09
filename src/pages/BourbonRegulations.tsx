import { motion } from 'motion/react';
import { Gavel, CheckCircle2, FileText, AlertCircle, Info, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BourbonRegulations() {
  const cfrPart5Rows = [
    { id: `Title 27 —`, en: `Alcohol, Tobacco Products and Firearms`, cn: `酒精、菸草製品和火器` },
    { id: `Chapter I`, en: `Alcohol and Tobacco Tax and Trade Bureau, Department of the Treasury`, cn: `美國財政部酒類與菸草稅務暨貿易局` },
    { id: `Part 5 —`, en: `Labeling and Advertising of Distilled Spirits`, cn: `蒸餾酒之標示與廣告` },
    { id: `§5.1`, en: `Definitions. Distilling season. The period from January 1 through June 30, which is the spring distilling season, or the period from July 1 through December 31, which is the fall distilling season.`, cn: `定義：蒸餾季（Distilling season）係指：每年1月1日至6月30日為春季蒸餾季（spring distilling season）；或
每年7月1日至12月31日為秋季蒸餾季（fall distilling season）。` },
    { id: `§5.1`, en: `Definitions. Proof gallon. A gallon of liquid at 60 degrees Fahrenheit that contains 50 percent by volume of ethyl alcohol having a specific gravity of 0.7939 at 60 degrees Fahrenheit, referred to water at 60 degrees Fahrenheit as unity, or the alcoholic equivalent thereof.`, cn: `定義：「酒度加侖」係指一加侖液體於華氏60度（60°F）時含有50%vol之乙醇，其液體在華氏60度時之比重為0.7939，以華氏60度之水比重為1作為基準；或指與其具有相同酒精含量之等價液體。` },
    { id: `§5.87`, en: `“Barrel Proof” and similar terms`, cn: `桶強與相似詞` },
    { id: `§5.87 (a)`, en: `The term “barrel proof” or “cask strength” may be used to refer to distilled spirits stored in wood barrels only when the bottling proof is not more than two degrees lower than the proof of the spirits when the spirits are dumped from the barrels.`, cn: `「木桶強度」或「桶強」一詞，僅得用於儲存於木桶中之蒸餾酒，且其裝瓶酒精度不得低於該酒液自木桶出桶時酒精度超過2proof (編注1%vol)。` },
    { id: `§5.87 (b)`, en: `The term “original proof,” “original barrel proof,” “original cask strength,” or “entry proof” may be used only if the distilled spirits were stored in wooden barrels and the proof of the spirits entered into the barrel and the proof of the bottled spirits are the same.`, cn: `「原始酒精度」、「原始入桶酒精度」、「原始木桶桶強」或「入桶酒精度」等用語，僅得使用於儲存於木桶中之蒸餾酒，且該酒液入桶時之酒精度與裝瓶時之酒精度必須完全相同。` },
    { id: `§5.88`, en: `Bottled in bond.`, cn: `保稅裝瓶` },
    { id: `§5.88 (a)`, en: `The term “bond,” “bonded,” “bottled in bond,” or “aged in bond,” or phrases containing these or synonymous terms, may be used (including as part of the brand name) only if the distilled spirits are:`, cn: `「保稅」、「保稅」、「保稅裝瓶」或「保稅陳年」等用語，或包含該等用語或其同義詞之詞句（包括作為品牌名稱之一部分），僅得於符合下列條件之蒸餾酒上使用：` },
    { id: `§5.88 (a) (1)`, en: `Composed of the same kind (type, if one is applicable to the spirits, otherwise class) of spirits distilled from the same class of materials;`, cn: `須由相同種類之烈酒所組成（若該烈酒適用類型〔type〕分類者，則須為相同類型 type；否則須為相同類別class），且該等烈酒須由相同類別之原料蒸餾而成；` },
    { id: `§5.88 (a) (2)`, en: `Distilled in the same distilling season (as defined in§ 5.1) by the same distiller at the same distillery.`, cn: `須由同一蒸餾師於同一蒸餾廠，在相同蒸餾季（依§5.1之定義）內蒸餾。` },
    { id: `§5.88 (a) (3)`, en: `Stored for at least 4 years in wooden containers wherein the spirits have been in contact with the wood surface, except for vodka, which must be stored for at least 4 years in wooden containers coated or lined with paraffin or other substance which will preclude contact of the spirits with the wood surface, and except for gin, which must be stored in paraffin-lined or unlined wooden containers for at least 4 years;`, cn: `須於木製容器中儲存至少4年，且酒液須與木材表面接觸；但伏特加除外，其必須於塗覆或內襯石蠟（paraffin）或其他可避免酒液與木材表面接觸之物質的木製容器中儲存至少4年；琴酒亦為例外，其須於有或無石蠟內襯之木製容器中儲存至少4年；` },
    { id: `§5.88 (a) (4)`, en: `Unaltered from their original condition or character by the addition or subtraction of any substance other than by filtration, chill proofing, or other physical treatments (which do not involve the addition of any substance which will remain in the finished product or result in a change in class or type);`, cn: `其原始狀態或特性不得因添加或移除任何物質而改變；但過濾、冷卻降度處理(編注：冷凝過濾)或其他物理處理除外，惟該等處理不得涉及任何會殘留於最終產品中的物質之添加，亦不得導致產品類別（class）或類型（type）之改變；` },
    { id: `§5.88 (a) (5)`, en: `Reduced in proof by the addition of only pure water to 50 percent alcohol by volume (100 degrees of proof); and`, cn: `其酒精度僅得透過添加純水調降至50%vol（100 proof）；且` },
    { id: `§5.88 (a) (6)`, en: `Bottled at 50 percent alcohol by volume (100 degrees of proof).`, cn: `以50%vol（100 proof）裝瓶。` },
    { id: `§5.88 (b)`, en: `Imported spirits labeled as “bottled in bond” or other synonymous term described above must be manufactured in accordance withparagraphs (a)(1) through (6) of this section and may only be so labeled if the laws and regulations of the country in which the spirits are manufactured authorize the bottling of spirits in bond and require or specifically authorize such spirits to be so labeled. 

The “bottled in bond” or synonymous statement must be immediately followed, in the same font and type size, by the name of the country under whose laws and regulations such distilled spirits were so bottled.`, cn: `進口蒸餾酒若標示為「保稅裝瓶」或上述其他同義用語，必須符合本條第(a)(1)至(a)(6)款之規定，且僅於該蒸餾酒製造國之法律與法規允許保稅裝瓶，並要求或特別授權該蒸餾酒如此標示時，方得使用該標示。

「保稅裝瓶」或其他同義聲明之後，必須立即以相同字體與字級標示該蒸餾酒依據其法律與法規進行保稅裝瓶之國家名稱。` },
    { id: `§5.88 (c)`, en: `Domestically manufactured spirits labeled as “bottled in bond” or with some other synonymous statement must bear the real name of the distillery or the trade name under which the distiller distilled and warehoused the spirits, and the number of the distilled spirits plant in which distilled, and the number of the distilled spirits plant in which bottled. 

The label may also bear the name or trade name of the bottler.`, cn: `於國內製造並標示為「保稅裝瓶」或其他同義聲明之蒸餾酒，必須標示蒸餾並儲存該酒液之蒸餾廠真實名稱或商業名稱，以及蒸餾該酒液之蒸餾酒工廠編號，並標示裝瓶該酒液之蒸餾酒工廠編號。

酒標亦得標示裝瓶商之名稱或商業名稱。` },
    { id: `§5.89`, en: `Multiple distillation claims.`, cn: `宣稱多次蒸餾` },
    { id: `§5.89 (a)`, en: `Truthful statements about the number of distillations, such as “double distilled,” “distilled three times,” or similar terms to convey multiple distillations, may be used if they are truthful statements of fact. For the purposes of this section only, the term “distillation” means a single run through a pot still or a single run through a column of a column (reflux) still. For example, if a column still has three separate columns, one complete additional run through the system would constitute three additional distillations.`, cn: `有關蒸餾次數之真實陳述，例如「雙重蒸餾」、「三次蒸餾」或其他表達多次蒸餾之類似用語，如屬真實事實陳述，得予使用。僅就本條而言，「蒸餾一次」(a single run)係指用壺式蒸餾器（pot still）中之一次完整蒸餾運行；或柱式蒸餾器〔column（reflux）still〕中單一塔柱（column）之一次完整運行。
例如：若一座柱式蒸餾器具有三個獨立塔柱，則完整通過整個系統一次，即構成「額外的三次蒸餾」。` },
    { id: `§5.89 (b)`, en: `The number of distillations may be understated but may not be overstated.`, cn: `蒸餾次數可低報，但不得高報` },
    { id: `§5.90`, en: `Terms related to Scotland.`, cn: `蘇格蘭相關術語` },
    { id: `§5.90 (a)`, en: `The words “Scotch,” “Scots,” “Highland,” or “Highlands,” and similar words connoting, indicating, or commonly associated with Scotland, may be used to designate only distilled spirits wholly manufactured in Scotland, except that the term “Scotch whisky” may appear in the designation for a flavored spirit (“Flavored Scotch Whisky”) or in a truthful statement of composition (“Scotch whisky with natural flavors”) where the base distilled spirit meets the requirements for a Scotch whisky designation, regardless of where the finished product is manufactured.`, cn: `「蘇格蘭威士忌」、「蘇格蘭的」、「高地」、「高地的」以及其他暗示、表示或通常與蘇格蘭相關之類似詞語，僅得用於標示完全於蘇格蘭製造之蒸餾酒。但「蘇格蘭威士忌」一詞得用於風味烈酒之標示名稱中（例如：「風味蘇格蘭威士忌」），或用於真實成分說明中（例如：「含天然香料之蘇格蘭威士忌」），前提為其基底蒸餾酒符合蘇格蘭威士忌法規之要求，而不論最終產品於何處製造。` },
    { id: `§5.90 (b)`, en: `In accordance with§ 5.127, statements relating to government supervision may appear on Scotch whisky containers only if such labeling statements are required or specifically authorized by the applicable regulations of the United Kingdom.`, cn: `依據§5.127之規定，關於政府監管之聲明，僅於英國相關法規要求或特別授權該等標示時，方得出現在蘇格蘭威士忌之容器上。` },
    { id: `§5.91`, en: `Use of the term “pure.”`, cn: `「純」(Pure)的術語使用` },
    { id: ``, en: `Distilled spirits labels, containers, or packaging may not bear the word “pure” unless it:`, cn: `蒸餾酒之酒標、容器或包裝不得標示「pure（純）」一詞，除非其符合下列條件：` },
    { id: `§5.91 (a)`, en: `Refers to a particular ingredient used in the production of the distilled spirits, and is a truthful representation about that ingredient;`, cn: `係指用於該蒸餾酒生產之特定原料，且該陳述對於該原料屬真實表示；` },
    { id: `§5.91 (b)`, en: `Is part of the bona fide name of a permittee or retailer for which the distilled spirits are bottled; or`, cn: `係屬於該蒸餾酒所裝瓶之許可持有人或零售商之真實名稱（bona fide name）之一部分；或` },
    { id: `§5.91 (c)`, en: `Is part of the bona fide name of the permittee that bottled the distilled spirits.`, cn: `係屬於裝瓶該蒸餾酒之許可持有人真實名稱（bona fide name）之一部分。` },
    { id: `§5.142`, en: `Neutral spirits or alcohol.`, cn: `中性烈酒或中性酒精` },
    { id: `§5.142 (a)`, en: `The class neutral spirits. “Neutral spirits” or “alcohol” are distilled spirits distilled from any suitable material at or above 95 percent alcohol by volume (190° proof), and, if bottled, bottled at not less than 40 percent alcohol by volume (80° proof). Neutral spirits other than the type “grain spirits” may be designated as “neutral spirits” or “alcohol” on a label. 

Neutral spirits (other than the type “grain spirits”) may not be aged in wood barrels at any time.`, cn: `「中性酒精」或「酒精」係指由任何適當原料蒸餾而成之蒸餾酒，其蒸餾酒精度須達95%vol（190 proof）以上；若進行裝瓶，其裝瓶酒精度不得低於40%vol（80 proof）。
除「穀物烈酒」類型外，其他中性酒精得於酒標上標示為「中性酒精」或「酒精」。

中性酒精（不包括「穀物烈酒」類型）於任何時候均不得於木桶中熟成。` },
    { id: `§5.142 (b)`, en: `Types. The following chart lists the types of neutral spirits and the rules that apply to the type designation.`, cn: `類型
下列表格列出了中性酒精之各類型及適用於該類型標示名稱之相關規定。` },
    { id: `§5.142 (b) (1)`, en: `Vodka`, cn: `伏特加` },
    { id: ``, en: `Neutral spirits which may be treated with up to two grams per liter of sugar and up to one gram per liter of citric acid. Products to be labeled as vodka may not be aged or stored in wood barrels at any time except when stored in paraffin-lined wood barrels and labeled as bottled in bond pursuant to§ 5.88. 

Vodka treated and filtered with not less than one ounce of activated carbon or activated charcoal per 100 wine gallons of spirits may be labeled as “charcoal filtered.” 

Addition of any other flavoring or blending materials changes the classification to flavored vodka or to a distilled spirits specialty product, as appropriate. 

Vodka must be designated on the label as “neutral spirits,” “alcohol,” or “vodka”.`, cn: `中性酒精得添加不超過2g/L之糖，以及不超過1g/L之檸檬酸。標示為伏特加之產品不得於任何時間進行木桶熟成或儲存，但依§5.88規定，使用石蠟膜內襯木桶儲存並標示為 「保稅裝瓶(bottled in bond)」者不在此限。

若伏特加每100 葡萄酒加侖(wine gallons)酒液使用不少於1盎司活性碳或活性木炭處理與過濾，得標示為「木炭過濾」。

若添加其他香料或調和材料，則應改分類為「風味伏特加」或其他蒸餾酒特殊產品。

伏特加之酒標必須標示為「中性酒精」、「酒精」或「伏特加」` },
    { id: `§5.142 (b) (2)`, en: `Grain Spirits`, cn: `穀物烈酒` },
    { id: ``, en: `Neutral spirits distilled from a fermented mash of grain and stored in oak barrels.

“Grain spirits” must be designated as such on the label. 

Grain spirits may not be designated as “neutral spirits” or “alcohol” on the label.`, cn: `由穀物發酵醪液蒸餾所得之中性酒精，並儲存於橡木桶中。

「穀物烈酒」必須於酒標上如此標示。

「穀物烈酒」不得於酒標上標示為「中性酒精」或「酒精」。` },
    { id: `§5.143`, en: `Whisky.`, cn: `威士忌` },
    { id: `§5.143 (a)`, en: `The class whisky. “Whisky” or “whiskey” is distilled spirits that is an alcoholic distillate from a fermented mash of any grain distilled at less than 95 percent alcohol by volume (190° proof) having the taste, aroma, and characteristics generally attributed to whisky, stored in oak barrels (except that corn whisky need not be so stored), and bottled at not less than 40 percent alcohol by volume (80° proof), and also includes mixtures of such distillates for which no specific standards of identity are prescribed.`, cn: `威士忌類別。「Whisky」或「Whiskey」係指由任何穀物之發酵醪液蒸餾所得之蒸餾酒，其蒸餾酒精濃度須低於95%酒精體積濃度（190 proof），並具有一般被認為屬於威士忌之風味、香氣及特徵；須儲存於橡木桶中（但玉米威士忌得不受此限），且裝瓶時酒精濃度不得低於40%vol（80 proof）；亦包括未另訂特定類別標準之此類蒸餾酒混合物。` },
    { id: `§5.143 (b)`, en: `Label designations. The word whisky may be spelled as either “whisky” or “whiskey”.`, cn: `標示名稱。「威士忌」一英文詞可拼寫為「whisky」或「whiskey」。` },
    { id: `§5.143 (b)`, en: `The place, State, or region where the whisky was distilled may appear as part of the designation on the label if the distillation and any required aging took place in that location (e.g., “New York Bourbon Whisky” must be distilled and aged in the State of New York); however, blending and bottling need not have taken place in the same place, State, or region.`, cn: `若威士忌之蒸餾及任何必要之熟成皆於某地點、州或地區完成，則該地點、州或地區名稱得作為標示名稱之一部分出現在酒標上（例如：「New York Bourbon Whisky」必須於紐約州蒸餾及熟成）；然而，調和與裝瓶則不必於相同地點、州或地區進行。` },
    { id: `§5.143 (b)`, en: `However, if any whisky is made partially from whisky distilled in a country other than that indicated by the type designation, the label must indicate the percentage of such whisky and the country where that whisky was distilled. Additionally, the label of whisky that does not meet one of the standards for specific types of whisky and that is comprised of components distilled in more than one country must contain a statement of composition indicating the country of origin of each component (such as “Whisky—50% from Japan, 50% from the United States”).`, cn: `然而，若任何威士忌的部分係由其他國家蒸餾製成的非標示類型威士忌，則酒標必須標示該部分威士忌之比例，以及該威士忌之蒸餾國家。
此外，若某威士忌不符合特定威士忌類型標準，且係由來自多個國家蒸餾之成分所組成，其酒標必須包含成分說明，並標示各成分之原產國（例如：「威士忌—50%來自日本，50%來自美國」）。` },
    { id: `§5.143 (b)`, en: `The word “bourbon” may not be used to describe any whisky or whisky-based distilled spirits not distilled and aged in the United States. The whiskies defined in paragraphs (c)(2)through(6)and(10)through(14)of this section are distinctive products of the United States and must have the country of origin stated immediately adjacent to the type designation if it is distilled outside of the United States, or the whisky designation must be proceeded by the term “American type” if the country of origin appears elsewhere on the label. For example, “Brazilian Corn Whisky,” “Rye Whisky distilled in Sweden,” and “Blended Whisky—Product of Japan” are statements that meet this country of origin requirement.`, cn: `「波本威士忌」一詞不得用於描述任何未於美國蒸餾及熟成之威士忌或以威士忌為基底之蒸餾酒。
本條第(c)(2)至(6)款及第(10)至(14)款所定義之威士忌，屬於美國之特色產品；若其於美國境外蒸餾，則必須於類型標示旁立即標示原產國，或若原產國標示於酒標其他位置，則威士忌類型名稱前必須加註「美式(American type)」字樣。
例如：
「巴西玉米威士忌(Brazilian Corn Whisky)」
「於瑞典蒸餾之裸麥威士忌(Rye Whisky distilled in Sweden)」
「調和威士忌—日本產品(Blended Whisky—Product of Japan)」
均屬符合原產國標示要求之表示方式。` },
    { id: `§5.143 (b)`, en: `“Light whisky”, “Blended light whisky”, and “Whisky distilled from bourbon (rye, wheat, malt, rye malt, or other named grain) mash” may only be produced in the United States.`, cn: `「輕威士忌」、「調和輕威士忌」以及「以波本〔裸麥、小麥、大麥芽、裸麥芽或其他指定穀物〕糊蒸餾之威士忌）」僅得於美國生產。` },
    { id: `§5.143 (c)`, en: `Types of whisky. The following tables set out the designations for whisky. Table 1 sets forth the standards for whisky that are defined based on production, storage, and processing standards, while Table 2 sets forth rules for the types of whisky that are defined as distinctive products of certain foreign countries.`, cn: `威士忌類型
下列表格列出了威士忌之標示名稱。
表1規定依據生產、儲存及加工標準所定義之威士忌標準；表2則規定被定義為特定外國國家特色產品之威士忌類型相關規則。` },
    { id: `§5.143 (c)`, en: `For the whiskies listed in Table 1, a domestic whisky may be labeled with the designation listed, when it complies with the production standards in the subsequent columns.`, cn: `對於表1所列之威士忌，國內生產之威士忌如符合後續欄位所列之生產標準，即得使用該標示名稱。` },
    { id: `§5.143 (c)`, en: `The “source” column indicates the source of the grain mash used to make the whisky.`, cn: `「原料」欄位，係指製作該威士忌所使用穀物漿液之來源。` },
    { id: `§5.143 (c)`, en: `The “distillation proof” indicates the allowable distillation proof for that type.`, cn: `「蒸餾酒精度」欄位，係指該類型威士忌允許之蒸餾酒精度上限。` },
    { id: `§5.143 (c)`, en: `The “storage” column indicates the type of packages (barrels) in which the spirits must be stored and limits for the proof of the spirits when entering the packages.`, cn: `「儲藏」欄位，係指烈酒必須儲存之容器（桶）類型，以及入桶時酒液酒精度限制。` },
    { id: `§5.143 (c)`, en: `The “neutral spirits permitted” column indicates whether neutral spirits may be used in the product in their original state (and not as vehicles for flavoring materials), and if so, how much may be used.`, cn: `「允許使用中性酒精」欄位，係指產品中是否允許使用未經改變之中性酒精（且非作為香料載體使用）；若允許，則會規定可使用之數量。` },
    { id: `§5.143 (c)`, en: `The “harmless coloring, flavoring, blending materials permitted” column indicates whether harmless coloring, flavoring, or blending materials, other than neutral spirits in their original form, described in §5.142, may be used in the product.`, cn: `「允許使用無害色素、香料與調和材料」欄位，係指是否允許於產品中使用§5.142所述、除原始型態中性酒精外之無害色素、香料或調和材料。` },
    { id: `§5.143 (c)`, en: `The use of the word “straight” is a further designation of a type, and is optional.`, cn: `「純(Straight)」一詞屬於對威士忌類型之進一步標示，且為選擇性使用。` },
    { id: `5.143 (c) Table 1`, en: `PARAGRAPH (c)—TYPES OF WHISKY AND PRODUCTION, STORAGE, AND
PROCESSING STANDARDS`, cn: `(c）款表1. 威士忌類型及其生產、儲存與加工標準 (編注：下方表格表列)` },
    { id: `5.143 (c) Table 2`, en: `PARAGRAPH (c)—TYPES OF WHISKY THAT ARE DISTINCTIVE PRODUCTS`, cn: `(c）款表2. 屬於特色產品之威士忌類型 (編注：下方表格表列)` },
    { id: `§5.143 (d)`, en: `Transition period. A label with the designation “American single malt whisky” or “straight American single malt whisky” may be used on distilled spirits bottled before January 19, 2030, if the distilled spirits conform to the applicable standards set forth in this part in effect prior to January 19, 2025.`, cn: `過渡期間
於2030年1月19日之前裝瓶之蒸餾酒，如符合2025年1月19日之前本章節所生效之相關標準，則其酒標得使用「美國單一麥芽威士忌 (American single malt whisky)」或「純美國單一麥芽威士忌(straight American single malt whisky)」之標示名稱。` },
    { id: `§5.150 (b) (2)`, en: `(2) Rye liqueur, bourbon liqueur (or rye cordial or bourbon cordial)`, cn: `(2) 裸麥利口酒、波本利口酒（或裸麥糖漿、波本糖漿）` },
    { id: ``, en: `Liqueurs, bottled at not less than 30 percent alcohol by volume, in which not less than 51 percent, on a proof gallon basis, of the distilled spirits used are, respectively, rye or bourbon whisky, straight rye or straight bourbon whisky, or whisky distilled from a rye or bourbon mash, and which possess a predominant characteristic rye or bourbon flavor derived from such whisky. Wine, if used, must be within the 2.5 percent limitation provided in§ 5.155for coloring, flavoring, and blending materials.`, cn: `利口酒產品，其裝瓶酒精度不得低於30%vol，且其中所使用之蒸餾酒，按酒度加侖計算不得少於51%，分別為裸麥威士忌或波本威士忌、純裸麥威士忌或純波本威士忌，或由裸麥或波本糊蒸餾所得之威士忌，並須具有主要源自該等威士忌之裸麥或波本特徵風味。

若使用葡萄酒，其使用量須符合§5.155中關於色素、香料及調和材料之2.5%限制規定。` },
    { id: `§5.150 (b) (3)`, en: `(3) Rock and rye; Rock and bourbon; Rock and brandy; Rock and rum`, cn: `(3) 冰糖裸麥酒、冰糖波本酒、冰糖白蘭地和冰糖蘭姆酒` },
    { id: `§5.150 (b) (3)`, en: `Liqueurs, bottled at not less than 24 percent alcohol by volume, in which, in the case of rock and rye and rock and bourbon, not less than 51 percent, on a proof gallon basis, of the distilled spirits used are, respectively, rye or bourbon whisky, straight rye or straight bourbon whisky, or whisky distilled from a rye or bourbon mash, and, in the case of rock and brandy and rock and rum, the distilled spirits used are all grape brandy or rum, respectively; containing rock candy or sugar syrup, with or without the addition of fruit, fruit juices, or other natural flavoring materials, and possessing, respectively, a predominant characteristic rye, bourbon, brandy, or rum flavor derived from the distilled spirits used. Wine, if used, must be within the 2.5 percent limitation provided in§ 5.155for harmless coloring, flavoring, and blending materials.`, cn: `利口酒產品，其裝瓶酒精度不得低於24%vol；其中，就「冰糖裸麥酒」及「冰糖波本酒」而言，所使用之蒸餾酒按酒度加侖計算，不得少於51%，原料分別為裸麥威士忌或波本威士忌、純裸麥威士忌或純波本威士忌，或由裸麥或波本糊液蒸餾所得之威士忌。
就「冰糖白蘭地」及「冰糖蘭姆酒」而言，所使用之蒸餾酒則必須全部分別為葡萄白蘭地或蘭姆酒。
產品須含有冰糖或糖漿，並得添加水果、果汁或其他天然香味材料，且應分別具有主要源自所使用蒸餾酒之裸麥酒、波本酒、白蘭地或蘭姆酒特徵風味。
若使用葡萄酒，其使用量須符合§5.155中關於無害色素、香料及調和材料之2.5%限制規定。` },
    { id: `§5.151`, en: `Flavored spirits.`, cn: `調味烈酒` },
    { id: `§5.151 (a)`, en: `The class flavored spirits. “Flavored spirits” are distilled spirits that are spirits conforming to one of the standards of identity set forth in §5.142 through §5.148 to which have been added nonbeverage natural flavors, wine, or nonalcoholic natural flavoring materials, with or without the addition of sugar, and bottled at not less than 30 percent alcohol by volume (60° proof). 

The flavored spirits must be specifically designated by the single base spirit and one or more of the most predominant flavors (for example, “Pineapple Flavored Tequila” or “Cherry Vanilla Flavored Bourbon Whisky”). 

The base spirit must conform to the standard of identity for that spirit before the flavoring is added. 

Base spirits that are a distinctive product of a particular place must be manufactured in accordance with the laws and regulations of the country as designated in the base spirit's standard of identity. 

If the finished product contains more than 2.5 percent by volume of wine, the kinds and percentages by volume of wine must be stated as a part of the designation (whether the wine is added directly to the product or whether it is first mixed into an intermediate product), except that a flavored brandy may contain an additional 12.5 percent by volume of wine, without label disclosure, if the additional wine is derived from the particular fruit corresponding to the labeled flavor of the product.`, cn: `風味烈酒類別。風味烈酒，係指符合§5.142至§5.148所規定之類型類別標準之蒸餾酒，並添加非飲料用途之天然香料、葡萄酒或非酒精之天然風味材料，得添加或不添加糖，且裝瓶酒精度不得低於30%vol（60 proof）。

風味烈酒之標示必須以單一基底烈酒名稱搭配一種或以上之主要風味名稱進行特定標示（例如：「鳳梨風味龍舌蘭酒(Pineapple Flavored Tequila)」或「櫻桃香草風味波本威士忌(Cherry Vanilla Flavored Bourbon Whisky)」）。

基底烈酒於添加風味材料之前，必須已符合該烈酒之類型類別標準。

若基底烈酒屬於特定地區之特色產品，則其製造方式必須符合該烈酒身分類別標準所指定國家之法律及法規。

若最終產品中葡萄酒含量超過2.5%（按體積計），則酒標標示中必須載明葡萄酒種類及其體積百分比（無論該葡萄酒係直接添加於產品中，或先混合於中間產品後再加入）。

但若為風味白蘭地，且額外添加之葡萄酒係來自與產品標示風味相對應之水果，則得額外含有最多12.5%體積之葡萄酒，而無須於酒標揭露。` },
    { id: `§5.152`, en: `Imitations`, cn: `仿製酒` },
    { id: `§5.152 (a)`, en: `Imitations must bear, as a part of the designation thereof, the word “imitation” and include the following:`, cn: `仿製型產品必須在酒名中標示「仿製(Imitation)」，而且包含以下幾種類型。` },
    { id: `§5.152 (a) (3)`, en: `Any class or type of distilled spirits (except cordials, liqueurs and specialties marketed under labels which do not indicate or imply that a particular class or type of distilled spirits was used in the manufacture thereof) to which has been added any whisky essence, brandy essence, rum essence, or similar essence or extract which simulates or enhances, or is used by the trade or in the particular product to simulate or enhance, the characteristics of any class or type of distilled spirits;`, cn: `任何種類或類型之蒸餾酒（但不包括酒標未標示或未暗示使用特定蒸餾酒種類或類型製成之糖漿酒、利口酒及特殊產品），若添加任何威士忌香精、白蘭地香精、蘭姆酒香精或其他類似香精或萃取物，而該等香精或萃取物係用以模擬、增強，或於業界或特定產品中被用以模擬或增強任何蒸餾酒種類或類型之特徵者；` },
    { id: `§5.152 (a) (4)`, en: `Any type of whisky to which beading oil has been added;`, cn: `任何添加了起珠油/掛珠油(beading oil)(編注，能夠在玻璃杯上產生酒腳/淚痕的油脂)之威士忌類型；` },
    { id: `§5.152 (b)`, en: `If any of the standards set forth inparagraphs (a)(1) through (7) of this section apply, the “Imitation” class designation must be used in front of the appropriate class as part of the designation (for example, Imitation Whisky)`, cn: `若本條第(a)(1)至(a)(7)款所列任一標準適用，則其標示名稱中必須於相應酒類名稱前加註「仿製」，作為名稱之一部分（例如：「仿製威士忌(Imitation Whisky)」）。` },
    { id: `§5.154`, en: `Rules for geographical designations.`, cn: `產地標志規則` },
    { id: `§5.154 (b)`, en: `Products without geographical designations but distinctive of a particular place.`, cn: `產品無產地標志但係為特定地區特色產品` },
    { id: ``, en: `The whiskies of the types specified in paragraphs (c)(2) through (6) and (10) through (14) of §5.143 are distinctive products of the United States and if produced in a foreign country shall be designated by the applicable designation prescribed in such paragraphs, together with the words “American type” or the words “produced (distilled, blended) in ____”, the blank to be filled in with the name of the foreign country:

Provided, That the word “bourbon” shall not be used to describe any whisky or whisky-based distilled spirits not produced in the United States. 

If whisky of any of these types is composed in part of whisky or whiskies produced in a foreign country there shall be stated, on the brand label, the percentage of such whisky and the country of origin thereof.`, cn: `§5.143 第(c)(2)至(6)款及第(10)至(14)款所列之各類型威士忌，均屬於美國之特色產品；若於外國生產，則應使用該等款項所規定之相應標示名稱，並加註「美式(American type)」字樣，或加註「於____生產（蒸餾、調和）(produced（distilled, blended） in ____)」之文字，空格處應填入該外國國家名稱。

但「波本」一詞不得用於描述任何非於美國生產之威士忌或以威士忌為基底之蒸餾酒。

若任何此類型威士忌部分由外國生產之威士忌所組成，則其品牌標籤上應標示該等威士忌之比例及其原產國。` },
    { id: `§5.155`, en: `Alteration of class and type.`, cn: `類別與類型之變更` },
    { id: `§5.155 (a)`, en: `Definitions`, cn: `定義` },
    { id: ``, en: `Coloring, flavoring, or blending material. For the purposes of this section, the term “coloring, flavoring, or blending material” means a harmless substance that is an essential component of the class or type of distilled spirits to which it is added; or a harmless substance, such as caramel, straight malt or straight rye malt whiskies, fruit juices, sugar, infusion of oak chips when approved by the Administrator, or wine, that is not an essential component part of the distilled spirits product to which it is added but which is customarily employed in the product in accordance with established trade usage.`, cn: `色素、香料或調和原料。就本條而言「色素、香料或調和原料」係指：屬於添加於該蒸餾酒之類別或類型中不可或缺成分之無害物質；或雖非該蒸餾酒產品之必要組成部分，但依既有業界慣例通常會使用於該產品中之無害物質，例如：調色焦糖, 純麥芽威士忌, 純裸麥芽威士忌, 果汁, 糖, 經主管機關核准之橡木片浸泡液, 葡萄酒等。` },
    { id: `§5.155 (c)`, en: `Special rules. The addition of the following will require a redesignation of the class or type of the distilled spirits product to which added:`, cn: `特殊規定。添加下列物質於蒸餾酒產品中時，將導致該蒸餾酒產品之類別或類型必須重新標示。` },
    { id: `§5.155 (c) (3)`, en: `Any material whatsoever added to neutral spirits or straight whisky, except that vodka may be treated with sugar, in an amount not to exceed two grams per liter, and with citric acid, in an amount not to exceed one gram per liter;`, cn: `任何添加於中性酒精或純威士忌中的物質(但伏特加可添加糖），不得超過2g/L，並可添加檸檬酸，不得超過1g/L。` },
    { id: `§5.155 (d)`, en: `Extractions from distilled spirits. The removal of any constituents from a distilled spirits product to such an extent that the product no longer possesses the taste, aroma, and characteristics generally attributed to that class or type of distilled spirits will alter the class or type of the product, and the resulting product must be redesignated appropriately. 

In addition, in the case of straight whisky, the removal of more than 15 percent of the fixed acids, volatile acids, esters, soluble solids, or higher alcohols, or the removal of more than 25 percent of the soluble color, constitutes an alteration of the class or type of the product and requires a redesignation of the product.`, cn: `蒸餾酒之萃取處理。若自蒸餾酒產品中移除任何成分，致使該產品不再具有一般被認為屬於該類別或類型蒸餾酒之風味、香氣及特徵，則該產品之類別或類型即視為已被改變，並必須適當地重新標示。

此外，就純威士忌而言，若移除下列任一成分超過15%：固定酸, 揮發酸, 酯類, 可溶性固形物, 高級醇或移除超過25%之可溶性呈色物質，即構成產品類別或類型之變更，並須重新標示該產品。` },
  ];


  const cfrTableRows = [
    { en: `(1) Whisky, which may be used as the designation for any of the type designations under the class “whisky,” or may be used as the designation if the whisky does not meet one of the type designations but satisfies the class designation`, type: `(1) 威士忌，或任何在威士忌類別下的類型，或不屬於以下類型但滿足威士忌類別。`, source: `發酵穀物酒醪`, distillation: `低於 190°`, storage: `橡木桶 (Oak barrels)；無最短時間要求`, neutral: `否`, additives: `可` },
    { en: `(2) Bourbon Whisky, Rye Whisky, Wheat Whisky, Malt Whisky, Rye Malt Whisky, or [name of other grain] Whisky`, type: `(2) 波本威士忌, 裸麥威士忌, 小麥威士忌, 大麥芽威士忌, 裸麥芽威士忌, 或其他穀物名威士忌`, source: `分別由不少於 51% 玉米、裸麥、小麥、發芽大麥、發芽裸麥或「其他穀物」組成的發酵酒醪`, distillation: `160° 或以下`, storage: `炙烤新橡木桶 (Charred new oak barrels)，且125°以下`, neutral: `否`, additives: `可，但波本威士忌除外` },
    { en: `(3) Corn Whisky. (Whisky conforming to this standard must be designated as “corn whisky.”)`, type: `(3) 玉米威士忌(威士忌符合此標準必須標示為 “corn whisky”)`, source: `不少於 80% 玉米的發酵酒醪`, distillation: `160° 或以下`, storage: `僅在標籤上聲稱年份時才需要。若儲存，必須以 125° 以下儲存在舊橡木桶或未炙烤新橡木桶中`, neutral: `否`, additives: `可` },
    { en: `(4) Straight Whisky`, type: `(4) 純威士忌`, source: `不少於 51% 玉米、裸麥、小麥、發芽大麥、發芽裸麥或「其他穀物」組成的發酵酒醪（包含在同一州製造的純威士忌混合物）`, distillation: `160° 或以下`, storage: `125° 以下的炙烤新橡木桶，儲存至少 2 年`, neutral: `否`, additives: `否` },
    { en: `(5) Straight Bourbon Whisky, Straight Rye Whisky, Straight Wheat Whisky, Straight Malt Whisky, or Straight Rye Malt Whisky`, type: `(5) 純波本威士忌, 純裸麥威士忌, 純小麥威士忌, 純大麥芽威士忌或純裸麥芽威士忌`, source: `分別由不少於 51% 的玉米、裸麥、小麥、發芽大麥、發芽裸麥組成的發酵酒醪`, distillation: `160° 或以下`, storage: `125° 以下的炙烤新橡木桶，儲存至少 2 年`, neutral: `否`, additives: `否` },
    { en: `(6) Straight Corn Whisky`, type: `(6) 純玉米威士忌`, source: `不少於 80% 玉米的發酵酒醪`, distillation: `160° 或以下`, storage: `125° 以下儲存在舊橡木桶或未炙烤新橡木桶中，儲存至少 2 年`, neutral: `否`, additives: `否` },
    { en: `(7) Whisky distilled from Bourbon/Rye/Wheat/Malt/Rye Malt/[Name of other grain] mash`, type: `(7) 波本穀物糊/裸麥穀物糊/小麥穀物糊/大麥芽穀物糊/裸麥芽穀物糊/其他穀物糊蒸餾威士忌`, source: `分別由不少於 51% 的玉米、裸麥、小麥、發芽大麥、發芽裸麥或「其他穀物」組成的發酵酒醪`, distillation: `160° 或以下`, storage: `舊橡木桶 (Used oak barrels)`, neutral: `否`, additives: `可` },
    { en: `(8) Light Whisky`, type: `(8) 輕威士忌`, source: `穀物發酵酒醪`, distillation: `高於 160°`, storage: `舊或未炙烤新橡木桶`, neutral: `否`, additives: `可` },
    { en: `(9) Blended Light Whisky (Light Whisky—a blend)`, type: `(9) 調和輕威士忌 (輕威士忌 - 一種調和)`, source: `輕威士忌與少於 20% 的純威士忌調和（按酒度加侖計）`, distillation: `混合`, storage: `有一部分`, neutral: `否`, additives: `可` },
    { en: `(10) Blended Whisky (Whisky—a blend)`, type: `(10) 調和威士忌 (威士忌-一種調和)`, source: `至少 20% 的純威士忌（按酒度加侖計）加上威士忌或中性烈酒（單獨或組合）`, distillation: `160° 或以下`, storage: `部分有，部分無`, neutral: `最高 80% (按酒度加侖計)`, additives: `可` },
    { en: `(11) Blended Bourbon Whisky, Blended Rye Whisky, Blended Wheat Whisky, Blended Malt Whisky, Blended Rye Malt Whisky, Blended Corn Whisky (or Whisky—a blend)`, type: `(11) 調和波本威士忌, 調和裸麥威士忌, 調和小麥威士忌, 調和大麥芽威士忌, 調和裸麥芽威士忌, 調和玉米威士忌 (威士忌-一種調和)`, source: `至少 51% 的特定純威士忌（按酒度加侖計）；其餘由威士忌或中性烈酒組成`, distillation: `混合`, storage: `有一部分`, neutral: `最高 49% (按酒度加侖計)`, additives: `可` },
    { en: `(12) Blend of Straight Whiskies (Blended Straight Whiskies)`, type: `(12) 調和純威士忌`, source: `不符合“純威士忌”標準的調和純威士忌`, distillation: `160° 或以下`, storage: `包含至少一部分陳釀 2 年的烈酒`, neutral: `否，除非作為調香用一部分原料`, additives: `可` },
    { en: `(13) Blended Straight Bourbon Whiskies, Blended Straight Rye Whiskies, Blended Straight Wheat Whiskies, Blended Straight Malt Whiskies, Blended Straight Rye Malt Whiskies, Blended Straight Corn Whiskies, (or a blend of straight whiskies)`, type: `(13) 調和純波本威士忌, 調和純裸麥威士忌, 調和純小麥威士忌, 調和純大麥芽威士忌, 調和純裸麥芽威士忌, 調和純玉米威士忌(或一種調和純威士忌)`, source: `在不同州生產或在同州生產但含有色素、香料或調配原料的同類型純威士忌調和物`, distillation: `160° 或以下`, storage: `包含至少一部分陳釀 2 年的烈酒`, neutral: `否，除非作為調香用一部分原料`, additives: `可` },
    { en: `(14) Spirit Whisky`, type: `(14) 烈酒威士忌`, source: `中性烈酒與 5% 或更多的威士忌或純威士忌（或兩者組合）的調和物。純威士忌成分必須少於 20%（按酒度加侖計）`, distillation: `調配`, storage: `部分有，部分無`, neutral: `最高 95% (按酒度加侖計)`, additives: `可` },
    { en: `(15) American single malt whisky`, type: `(15) 美國單一麥芽威士忌`, source: `在美國境內生產的100% 發芽大麥的發酵酒醪`, distillation: `160° 或以下；在美國境內的同一家酒廠蒸餾`, storage: `舊桶、炙烤新桶或未炙烤新橡木桶；最大容量 700 公升；僅儲存在美國境內`, neutral: `否`, additives: `否，除非是焦糖色素且在標籤上揭露` },
    { en: `(16) Straight American single malt whisky`, type: `(16) 純美國單一麥芽威士忌`, source: `在美國境內生產的100% 發芽大麥的發酵酒醪`, distillation: `160° 或以下；在美國境內的同一家酒廠蒸餾`, storage: `舊桶、炙烤新桶或未炙烤新橡木桶儲放最少2年；最大容量 700 公升；僅儲存在美國境內`, neutral: `否`, additives: `否，除非是焦糖色素且在標籤上揭露` },
    { en: `(17) Scotch whisky`, type: `(17) 蘇格蘭威士忌`, source: `蘇格蘭的獨特威士忌產品，依據英國法規要求在蘇格蘭境內生產的蘇格蘭威士忌。若為混合產品，需標示為「調和蘇格蘭威士忌」 或「蘇格蘭威士忌—調和」。`, distillation: ``, storage: ``, neutral: ``, additives: `` },
    { en: `(18) Irish whisky`, type: `(18) 愛爾蘭威士忌`, source: `愛格蘭的獨特威士忌產品，依據他們的法規要求在愛爾蘭或北愛爾蘭境內生產的愛爾蘭威士忌。若為混合產品，需標示為「調和愛爾蘭威士忌」或「愛爾蘭威士忌—調和」。`, distillation: ``, storage: ``, neutral: ``, additives: `` },
    { en: `(19) Canadian whisky`, type: `(19) 加拿大威士忌`, source: `加拿大的獨特威士忌產品，依據加拿大法規要求加拿大境內生產的加拿大威士忌。若為調合產品，需標示為「調和加拿大威士忌」或「加拿大威士忌—調和」。`, distillation: ``, storage: ``, neutral: ``, additives: `` },
  ];

  const tennesseeRows = [
    { id: `§ 57-2-106 (a)`, en: `An intoxicating liquor may not be advertised, described, labeled, named, sold or referred to for marketing or sales purposes as "Tennessee Whiskey," "Tennessee Whisky," "Tennessee Sour Mash Whiskey," or "Tennessee Sour Mash Whisky" unless the intoxicating liquor is:`, cn: `除非該烈酒符合以下條件，否則不得以「田納西威士忌」或「田納西酸醪威士忌」之名稱進行廣告、描述、標示、命名、銷售，或作為行銷與銷售用途之稱呼：` },
    { id: `§ 57-2-106 (1)`, en: `Manufactured in Tennessee;`, cn: `在田納西州生產；` },
    { id: `§ 57-2-106 (2)`, en: `Made of a grain mixture that is at least fifty-one percent (51%) corn;`, cn: `穀物配方中玉米含量至少51%；` },
    { id: `§ 57-2-106 (3)`, en: `Distilled to no more than one hundred sixty (160) proof or eighty percent (80%) alcohol by volume`, cn: `蒸餾過程的酒精度不超過80%vol (160proof)；` },
    { id: `§ 57-2-106 (4)`, en: `Aged in new, charred oak barrels in Tennessee;`, cn: `於炙烤新橡木桶內熟成，於田納西州內` },
    { id: `§ 57-2-106 (5)`, en: `Filtered through maple charcoal prior to aging;`, cn: `在陳年前進行楓木炭過濾 (林肯郡過濾法)` },
    { id: `§ 57-2-106 (6)`, en: `Placed in the barrel at no more than one hundred twenty-five (125) proof or sixty-two and one-half percent (62.5%) alcohol by volume; and`, cn: `入桶的酒精度不超過62.5%vol (125proof)；` },
    { id: `§ 57-2-106 (7)`, en: `Bottled at not less than eighty (80) proof or forty percent (40%) alcohol by volume.`, cn: `裝瓶酒精度不低於40%vol (80proof)。` },
  ];

  const ttbCh8Rows = [
    { id: `1`, en: `DEFINITION OF “AGE”`, cn: `「陳年」的定義` },
    { id: `2`, en: `Age is the period during which, after distillation and before bottling, distilled spirits have been stored in oak containers`, cn: `「陳年」係指蒸餾酒於蒸餾完成後至裝瓶前，儲存於橡木容器中的期間。` },
    { id: `3`, en: `For bourbon, rye, wheat, malt or rye malt whiskies and straight whiskies, other
than straight corn whisky (which must be stored in used or uncharred new oak
containers), the oak container must be a charred new oak container`, cn: `對於波本威士忌、裸麥威士忌、小麥威士忌、大麥芽威士忌、裸麥芽威士忌及純威士忌而言，除純玉米威士忌（須儲存於使用過之橡木桶或未炙燒之新橡木容器）外，其橡木容器必須為經炙燒之新橡木容器。` },
    { id: `4`, en: `Format`, cn: `格式如下：` },
    { id: `5`, en: `For whiskies (other than corn whisky and light whisky) produced in the U.S. and
stored in reused oak containers, the statement of age (whether required or
optional) must appear as:`, cn: `對於美國生產並儲存於舊橡木容器中的威士忌（玉米威士忌與輕威士忌除外），其酒齡標示（無論屬強制或自願標示）必須以下列方式表示：` },
    { id: `6`, en: `AAA   STORED       X     YEARS IN REUSED COOPERAGE`, cn: `AAA類型 威士忌儲存於舊橡木容器 X 年` },
    { id: `7`, en: `OR may appear as a statement of storage and percentag`, cn: `或得以儲存方式與比例之聲明形式標示。` },
    { id: `8`, en: `Z   %   AAA   STORED     X     YEARS IN REUSED COOPERAGE`, cn: `Z  %  的 AAA類型 威士忌儲存於舊橡木容器 X 年` },
    { id: `9`, en: `Example: Two whiskies distilled from bourbon mash are blended. Both whiskies are less than 4 years old. A statement of age is therefore required on the label. The bottler elects to disclose the age of each whisky in the blend:

“55% WHISKY DISTILLED FROM BOURBON MASH STORED 3½
YEARS IN REUSED COOPERAGE
45% WHISKY DISTILLED FROM BOURBON MASH STORED 2
YEARS IN REUSED COOPERAGE”`, cn: `範例（Example）
兩種由波本糊蒸餾所得之威士忌進行調和。兩者之酒齡均未滿4年，因此酒標上必須標示酒齡聲明。裝瓶商選擇揭露調和中各威士忌之酒齡如下：

55% 由波本糊蒸餾之威士忌，於舊橡木容器中儲存3年半
45% 由波本糊蒸餾之威士忌，於舊橡木容器中儲存2年` },
  ];

  const expertComments = [
    { 
      title: '被誤解的2年美國威士忌 – 純(Straight)的定義', 
      desc: '許多人聽到有「純」就是至少陳年2年，會笑說美國威士忌只有2年陳年；但仔細再看美國酒類煙草稅務管理局(TTB)對於「陳年」的要求是若不足4年，標籤上要強制列出這一瓶「每一種威士忌使用多少比例？並且陳年多久時間？」；在商業行為上酒商不會為了每次出產品都要重印標籤，所以最節省成本的方法就是「每一瓶威士忌都使用超過4年以上的基酒」就不需要繁瑣列出，所以可以推論「市面上看到的NAS美國威士忌的年份都比其他國家來的更長(3年或2年)」。' 
    },
    { 
      title: '更嚴格的色素添加管制', 
      desc: '與其他國家/地區的威士忌法規不同，美國「波本威士忌」以及「純威士忌」是禁止添加焦糖色素(E150a)的，所有顏色必須來自橡木桶。' 
    },
    { 
      title: '更嚴格的新橡木桶強制使用', 
      desc: '法律規定必須使用「全新」炙烤橡木桶，這也是為什麼波本威士忌通常帶有強烈的香草、焦糖、椰子、木質調香料味的原因；同時也保護伐木產業的林材使用，同時也能更新林相，保護森林資源。' 
    },
    { 
      title: '更嚴格的入桶酒精度限制', 
      desc: '較低的入桶濃度（62.5%vol），在科學研究上是符合酒液對於木桶的酒精相與水相萃取的最大化，有助於熟成過程中提取更多糖分與風味層次。' 
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20"
          >
            <Gavel className="w-3.5 h-3.5" />
            27 CFR PART 5 - Labeling and Advertising of Distilled Spirits
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">美國威士忌法規</h1>
          <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
            美國威士忌法規是全球內容最複雜、定義最清楚、含納最廣的威士忌法規，目的是要讓酒商與酒廠都有多元發揮的空間，但又有足夠的規範保護產業不被不肖人士破壞，是值得學習的立法典範。
          </p>
        </section>

        {/* Section 1: Summary Table */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold font-serif">法規要求概要</h2>
          </div>
          
          <div className="glass-card border-amber-500/10 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-center border-collapse min-w-[900px] table-fixed">
                <thead className="bg-amber-500/10">
                  <tr>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">法規要求或限制</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">產品種類</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">原料</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">酶製劑</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">發酵微生物</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">蒸餾設備與方式</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">蒸餾精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-base font-bold text-white/90 border-r border-amber-500/10 last:border-r-0 text-center">
                      <div>🇺🇸 美國</div>
                      <div className="text-xs font-normal">1. 27 CFR Part 5 &</div>
                      <div className="text-xs font-normal">2. TTB CH.8</div>
                    </td>
                    <td className="p-4 text-sm text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 leading-relaxed text-center">
                      <div>波本、玉米、特定穀物名威士忌 (共16大類)</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-amber-500/10 last:border-r-0 text-left">
                      <div>1. 波本：≥51% 玉米</div>
                      <div>2. 玉米威士忌：≥80% 玉米</div>
                      <div>3. 特定穀物名：≥51% 該穀物</div>
                      <div>4. 單一麥芽：100% 大麥芽</div>
                    </td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center italic text-balance">－（允許）</td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center text-balance">－（允許其他微生物）</td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center text-balance">－（無限制）</td>
                    <td className="p-4 text-xs text-white/70 border-r border-amber-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 威士忌：≤95% vol</div>
                      <div>2. 其餘分類：≤80% vol</div>
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-4 text-base font-bold text-white/90 border-r border-amber-500/10 last:border-r-0 text-center">
                      <div>🇺🇸 美國 (田納西)</div>
                      <div className="text-sm font-normal">田納西州法 57-2-106</div>
                    </td>
                    <td className="p-4 text-sm text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 leading-relaxed text-center">
                      <div>田納西威士忌</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-amber-500/10 last:border-r-0 text-center">
                      <div>玉米 ≥51%</div>
                    </td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center italic text-balance">－（允許）</td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center text-balance">－（允許其他微生物）</td>
                    <td className="p-4 text-base text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-center text-balance">－（無限制）</td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center">
                      ≤80% vol
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-center border-collapse min-w-[900px] border-t border-amber-500/20 table-fixed">
                <thead className="bg-amber-500/10">
                  <tr>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">入桶酒精精度</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">入桶前要求</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">木桶總量</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">木桶種類</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">陳年時間</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">年份標示</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">焦糖調色</th>
                    <th className="p-4 text-sm font-bold uppercase tracking-wider text-amber-500/60 border-b border-r border-amber-500/20 last:border-r-0">最低裝瓶酒精度</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  <tr>
                    <td className="p-4 text-base text-white/70 border-r border-amber-500/10 last:border-r-0 text-left">
                      <div>1. 威士忌：無限制</div>
                      <div>2. 其餘：≤62.5% vol</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center italic">無規定</td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-amber-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 單一麥芽：≤700L</div>
                      <div>2. 其餘：無限制</div>
                    </td>
                    <td className="p-4 text-[11px] text-amber-500 font-bold border-r border-amber-500/10 last:border-r-0 text-left leading-relaxed">
                      <div>1. 波本：新炙烤橡木桶</div>
                      <div>2. 玉米：舊桶或未燒烤木桶</div>
                      <div>3. 特定穀物名：無限制</div>
                      <div>4. 單一麥芽：橡木桶</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/70 border-r border-amber-500/10 last:border-r-0 text-left text-balance">
                      <div>1. 無強制要求，但4 年以下需標示酒種名稱、用量和陳年時間；</div>
                      <div>2. 「純」(Straight) 需 2 年；</div>
                      <div>3. 保稅裝瓶需 4 年；</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center text-balance">
                      最年輕年份
                    </td>
                    <td className="p-4 text-xs text-white/70 border-r border-amber-500/10 last:border-r-0 text-left leading-relaxed text-balance">
                      <div>1. 波本：不行</div>
                      <div>2. 帶「純」字：不行</div>
                      <div>3. 單一麥芽：可，需標示</div>
                      <div>4. 其餘：可</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center border-balance underline decoration-amber-500/30">
                      <div>1. 保稅裝瓶：50%vol</div>
                      <div>2. 其餘：40%vol</div>
                    </td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center border-balance underline decoration-amber-500/30">
                      ≤62.5% vol
                    </td>
                    <td className="p-4 text-xs text-amber-500 border-r border-amber-500/10 last:border-r-0 text-left leading-relaxed text-balance">
                      <div>1. 林肯郡法：必須經楓木炭過濾</div>
                      <div>（Lincoln County Process）</div>
                      <div>2. 若立法前未使用楓木炭過濾的，可以繼續不用</div>
                    </td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center text-balance">－（無限制）</td>
                    <td className="p-4 text-sm font-bold text-amber-500 border-r border-amber-500/10 last:border-r-0 text-center text-balance">新炙烤橡木桶</td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center text-balance">最少 2 年</td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center text-balance">最年輕年份</td>
                    <td className="p-4 text-sm text-red-500 border-r border-amber-500/10 last:border-r-0 text-center font-bold text-balance">✕ 不允許</td>
                    <td className="p-4 text-sm text-white/70 border-r border-amber-500/10 last:border-r-0 text-center font-bold border-balance underline decoration-amber-500/30">40%vol</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Detailed Clauses - 27 CFR Part 5 */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-amber-500" />
               <h2 className="text-2xl font-bold font-serif text-balance">法規條文摘要 1：27 CFR Part 5 聯邦法第27編第1章A分冊第5部分—蒸餾酒的標示與廣告</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: eCFR Title 27 Part 5
             </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/40 w-24">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cfrPart5Rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs text-amber-500/50 font-mono align-top">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Detailed Clauses - 27 CFR Part 5 Table 1 & 2 */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-amber-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 2：威士忌類型及其生產、儲存與加工標準與特色產品之威士忌類型</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: 27 CFR Part 5 143 (c) Table 1 and Table 2
             </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">標示類型 (Type) / 英文原文</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">原料 (Source)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">蒸餾酒精度 (Proof)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">儲藏方式 (Storage)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">可否添加中性酒精？</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60">可否添加色素、香料或調配材料?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cfrTableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm font-bold text-white/85 align-top max-w-xs">
                      <div className="mb-1 text-amber-500">{row.type}</div>
                      <div className="text-[11px] text-white/30 italic font-normal leading-tight">{row.en}</div>
                    </td>
                    <td className="p-4 text-xs leading-relaxed text-white/50 align-top">{row.source}</td>
                    <td className="p-4 text-xs text-white/50 align-top">{row.distillation}</td>
                    <td className="p-4 text-xs text-white/50 align-top">{row.storage}</td>
                    <td className="p-4 text-xs text-white/50 align-top">{row.neutral}</td>
                    <td className="p-4 text-xs text-white/50 align-top">{row.additives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Detailed Clauses - Tennessee Whiskey Code */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-amber-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 3：田納西威士忌州法 57-2-106</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: Tennessee Code § 57-2-106
             </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar bg-white/5">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/40 w-16 text-center">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">英文原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tennesseeRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs text-amber-500/50 font-mono align-top text-center border-r border-white/5">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top border-r border-white/5">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top whitespace-pre-line">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Detailed Clauses - TTB Ch 8 */}
        <section className="glass-card border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-amber-500" />
               <h2 className="text-2xl font-bold font-serif">法規條文摘要 4：美國酒類與菸草稅務貿易局 第8章  (TTB Chapter 8 Statements of Age)</h2>
             </div>
             <div className="text-xs text-white/30 font-mono">
               Source: TTB BAM Chapter 8
             </div>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar bg-white/5">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-whisky-950 z-10 shadow-sm border-b border-white/10">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/40 w-16 text-center">條次</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">英文原文 (English)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-500/60 w-1/2">中文翻譯 (Chinese)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ttbCh8Rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs text-amber-500/50 font-mono align-top text-center border-r border-white/5">{row.id}</td>
                    <td className="p-4 text-xs leading-relaxed text-white/35 italic group-hover:text-white/55 transition-colors align-top border-r border-white/5">{row.en}</td>
                    <td className="p-4 text-sm leading-relaxed text-white/85 align-top whitespace-pre-line">{row.cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-white/5 border-t border-white/5">
            <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl flex gap-4 items-start">
               <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
               <div className="text-sm text-white/50 leading-relaxed">
                  <span className="text-amber-500 font-bold">法律提示：</span> 以上內容為美國聯邦法規與州法摘要。完整法規細節請參照 eCFR、TTB和田納西州官方發布之原始版本。
               </div>
            </div>
          </div>
        </section>

        {/* Section 6: Comments & Thoughts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold font-serif">點評與思考</h2>
          </div>
          <div className="glass-card p-10 border-amber-500/10 bg-amber-500/5">
            <div className="prose prose-invert prose-amber max-w-none">
              <p className="text-white/85 leading-loose text-lg mb-12 italic">
                美國威士忌的法規核心是「讓大家都能參與其中的包容性」，雖然看起來很繁複，但若能靜下心來便能正確理解，發現其中給所有參與者的自由空間。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {expertComments.map((comment) => (
                  <div key={comment.title} className="space-y-3">
                    <h4 className="text-amber-500 font-bold flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                       {comment.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {comment.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-amber-500/10 flex flex-col items-center">
                <p className="text-white/40 text-sm mb-6">已經準備好檢驗學習成果了嗎？</p>
                <Link 
                  to="/exam/unit/usa"
                  className="group flex items-center gap-3 bg-amber-500 text-white font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20"
                >
                  <Award className="w-5 h-5" />
                  複習本單元？
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-[11px] text-white/20 italic">完成複習可解鎖「波本拓荒者」徽章</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Legal Documents */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <ExternalLink className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold font-serif">法律文件連結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-5?toc=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
            >
              <h3 className="text-amber-500 font-bold mb-2 group-hover:text-amber-400 transition-colors text-sm">1. 美國聯邦法規 27 CFR Part 5</h3>
              <p className="text-white/50 text-[11px] mb-4">Labeling and Advertising of Distilled Spirits</p>
              <div className="flex items-center gap-2 text-amber-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://law.justia.com/codes/tennessee/title-57/chapter-2/section-57-2-106/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
            >
              <h3 className="text-amber-500 font-bold mb-2 group-hover:text-amber-400 transition-colors text-sm">2. 田納西威士忌法規 (§ 57-2-106)</h3>
              <p className="text-white/50 text-[11px] mb-4">Tennessee Code - Whiskey manufactured in Tennessee</p>
              <div className="flex items-center gap-2 text-amber-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
            <a 
              href="https://www.ttb.gov/system/files/images/pdfs/spirits_bam/chapter8.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card p-6 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
            >
              <h3 className="text-amber-500 font-bold mb-2 group-hover:text-amber-400 transition-colors text-sm">3. TTB BAM Chapter 8 (PDF)</h3>
              <p className="text-white/50 text-[11px] mb-4">Labeling and Advertising - Age Statements</p>
              <div className="flex items-center gap-2 text-amber-500/60 text-xs font-bold">
                前往官網 <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
