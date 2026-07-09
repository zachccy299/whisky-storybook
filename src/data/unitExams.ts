// 每個產區的單元考試設定
// 題目直接從 questions.json 依照 keyword 篩選

export interface UnitExamConfig {
  id: string;
  name: string;
  keyword: string; // 對應 questions.json 的 keyword 欄位
  color: string;
  badgeExplorer: { id: string; name: string; image: string };
  badgeMaster: { id: string; name: string; image: string };
  returnPath: string;
}

export const UNIT_EXAM_CONFIGS: Record<string, UnitExamConfig> = {
  scotch: {
    id: 'scotch',
    name: '蘇格蘭威士忌',
    keyword: '蘇格蘭威士忌',
    color: 'blue',
    badgeExplorer: {
      id: 'clan-explorer',
      name: '氏族探險家',
      image: '/badges/clan_explorer.png',
    },
    badgeMaster: {
      id: 'scotland-the-brave',
      name: '蘇格蘭勇士',
      image: '/badges/scotlandthebrave.png',
    },
    returnPath: '/regulations/scotch',
  },
  usa: {
    id: 'usa',
    name: '美國波本威士忌',
    keyword: '美國威士忌',
    color: 'amber',
    badgeExplorer: {
      id: 'bourbon-trailblazer',
      name: '波本開拓者',
      image: '/badges/bourbontrailblazer.png',
    },
    badgeMaster: {
      id: 'bourbon-sheriff',
      name: '波本警長',
      image: '/badges/bourbonsheriff.png',
    },
    returnPath: '/regulations/bourbon',
  },
  irish: {
    id: 'irish',
    name: '愛爾蘭威士忌',
    keyword: '愛爾蘭威士忌',
    color: 'green',
    badgeExplorer: {
      id: 'emerald-isle-rover',
      name: '翡翠島漫遊者',
      image: '/badges/emeraldislerover.png',
    },
    badgeMaster: {
      id: 'celtic-warrior',
      name: '凱爾特戰士',
      image: '/badges/celticwarrior.png',
    },
    returnPath: '/regulations/irish',
  },
  eu: {
    id: 'eu',
    name: '歐盟威士忌',
    keyword: '歐盟威士忌',
    color: 'indigo',
    badgeExplorer: {
      id: 'seeker-of-spirits',
      name: '烈酒探索者',
      image: '/badges/seekerofspirits.png',
    },
    badgeMaster: {
      id: 'whisky-alchemist',
      name: '威士忌煉金術師',
      image: '/badges/whiskyalchemist.png',
    },
    returnPath: '/regulations/eu',
  },
  japanese: {
    id: 'japanese',
    name: '日本威士忌',
    keyword: '日本威士忌',
    color: 'pink',
    badgeExplorer: {
      id: 'ashigaru-of-whisky',
      name: '威士忌足輕',
      image: '/badges/ashigaruofwhisky.png',
    },
    badgeMaster: {
      id: 'whisky-samurai',
      name: '威士忌武士',
      image: '/badges/whiskysamurai.png',
    },
    returnPath: '/regulations/japanese',
  },
  canadian: {
    id: 'canadian',
    name: '加拿大威士忌',
    keyword: '加拿大威士忌',
    color: 'red',
    badgeExplorer: {
      id: 'maple-wanderer',
      name: '楓葉漫遊者',
      image: '/badges/maplewanderer.png',
    },
    badgeMaster: {
      id: 'canadian-mountie',
      name: '加拿大騎警',
      image: '/badges/canadianmountie.png',
    },
    returnPath: '/regulations/canadian',
  },
};
