export interface RegulationData {
  region: string;
  category: string;
  ingredients: string;
  enzymes: string;
  yeast: string;
  distillationWay: string;
  distillationAbv: string;
  caskAbv: string;
  caskSize: string;
  caskType: string;
  aging: string;
  ageStatement: string;
  caramel: string;
  bottlingAbv: string;
}

export const comparisonData: RegulationData[] = [
  {
    region: "蘇格蘭威士忌",
    category: "麥芽、穀物與調和",
    ingredients: "麥芽威士忌：100%大麥芽\n穀物威士忌：大麥芽＋穀物",
    enzymes: "不允許",
    yeast: "酵母",
    distillationWay: "麥芽要求批次壺式",
    distillationAbv: "≤94.8%vol",
    caskAbv: "－（無限制）",
    caskSize: "≤700L",
    caskType: "橡木桶",
    aging: "3年",
    ageStatement: "1. 最年輕年份\n2. 單一年份要求都是單一年度蒸餾",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "愛爾蘭威士忌",
    category: "壺式、麥芽、穀物、調和",
    ingredients: "壺式：≥30%大麥芽和≥30%大麥\n麥芽：100%大麥芽\n穀物：≤30%大麥芽",
    enzymes: "允許",
    yeast: "酵母",
    distillationWay: "壺式和麥芽，要求批次壺式，且第一次壺式要用銅製蒸餾器\n穀物，要求使用柱式",
    distillationAbv: "≤94.8%vol",
    caskAbv: "－（無限制）",
    caskSize: "≤700L",
    caskType: "木桶",
    aging: "3年",
    ageStatement: "—",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "歐盟威士忌",
    category: "威士忌",
    ingredients: "發芽穀物＋穀物",
    enzymes: "允許",
    yeast: "酵母",
    distillationWay: "－（無限制）",
    distillationAbv: "≤94.8%vol",
    caskAbv: "－（無限制）",
    caskSize: "≤700L",
    caskType: "木桶",
    aging: "3年",
    ageStatement: "—",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "日本威士忌 (2021)",
    category: "威士忌",
    ingredients: "發芽穀物＋穀物",
    enzymes: "－（允許）",
    yeast: "－（允許微生物）",
    distillationWay: "－（無限制）",
    distillationAbv: "≤95%vol",
    caskAbv: "－（無限制）",
    caskSize: "≤700L",
    caskType: "木桶",
    aging: "3年",
    ageStatement: "—",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "加拿大威士忌",
    category: "加拿大威士忌\n（加拿大黑麥威士忌、黑麥威士忌）",
    ingredients: "穀物或穀物製品",
    enzymes: "允許",
    yeast: "酵母＋微生物",
    distillationWay: "－（無限制）",
    distillationAbv: "－（無限制）",
    caskAbv: "－（無限制）",
    caskSize: "≤700L",
    caskType: "木桶",
    aging: "3年",
    ageStatement: "—",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "田納西威士忌",
    category: "田納西威士忌",
    ingredients: "玉米≥51%",
    enzymes: "－（允許）",
    yeast: "－（允許其他微生物）",
    distillationWay: "－（無限制）",
    distillationAbv: "≤80%vol",
    caskAbv: "≤62.5%vol",
    caskSize: "－（無限制）",
    caskType: "新炙烤橡木桶",
    aging: "2年",
    ageStatement: "—",
    caramel: "可",
    bottlingAbv: "40%vol"
  },
  {
    region: "美國威士忌",
    category: "波本、玉米、xx穀物威士忌、xx穀物糊威士忌、單一麥芽……42種",
    ingredients: "波本：≥51%玉米\n玉米：≥80%玉米\nxx穀物：≥51%xx穀物\n單一麥芽：100%大麥芽",
    enzymes: "－（允許）",
    yeast: "－（允許其他微生物）",
    distillationWay: "－（無限制）",
    distillationAbv: "威士忌：≤95%vol\n其餘分類：≤80%vol",
    caskAbv: "≤62.5%vol",
    caskSize: "－（無限制）",
    caskType: "波本：新炙烤橡木桶\n玉米：舊桶或未燒烤木桶\nXx穀物：新炙烤橡木桶\nXx穀物糊：無限制\n單一麥芽：橡木桶，≤700L",
    aging: "無，但一般2年以上，帶有「純」字需要2年",
    ageStatement: "—",
    caramel: "帶「波本」不允許，其他可以，但要說明",
    bottlingAbv: "40%vol"
  }
];
