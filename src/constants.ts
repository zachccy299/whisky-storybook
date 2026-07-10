import {
  Beaker,
  Cog,
  Shapes,
  Gavel,
  GraduationCap,
  Compass,
  Trophy,
  Hammer,
  Flag,
  Grape,
  Palmtree,
  Flower2,
  Snowflake,
  Wine,
  Droplet,
  Leaf,
  Citrus,
  Sprout,
} from 'lucide-react';

export const PROCESS_OPTIONS = [
  {
    name: '麥芽威士忌(入門版)',
    desc: '從大麥到原酒，深入淺出的五大製程圖解',
    path: '/process/whisky',
    icon: Beaker,
    status: 'active' as const,
    color: 'from-amber-500/20 to-orange-500/20'
  },
  {
    name: '烈酒製程基礎版',
    desc: '五大製程框架橫跨麥芽威士忌、穀物威士忌、白蘭地、蘭姆酒與琴酒',
    path: '/process/full',
    icon: Cog,
    status: 'active' as const,
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    name: '各式烈酒流程(建置中)',
    desc: '白蘭地、萊姆酒、琴酒等各大烈酒的製程奧秘',
    path: '/process',
    icon: Shapes,
    status: 'coming-soon' as const,
    color: 'from-purple-500/10 to-pink-500/10'
  }
];

export const SPIRITS_CLASSIFICATIONS = [
  {
    id: 'origin',
    title: '原料來源區分',
    axis: '依生產方式分類',
    rootLabel: '原料',
    rootLabelEn: 'Origin',
    branches: [
      {
        name: '農業原料',
        subtitle: '取糖、發酵、蒸餾',
        desc: '直接以農產品為原料，經發酵與蒸餾製成的基底烈酒',
        color: 'amber',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '白蘭地', icon: Grape },
          { name: '蘭姆酒', icon: Palmtree },
          { name: '龍舌蘭', icon: Flower2 },
          { name: '伏特加', icon: Snowflake },
          { name: '中式白酒', icon: Wine },
          { name: '燒酎', icon: Droplet },
        ]
      },
      {
        name: '烈酒再製',
        subtitle: '浸漬、再蒸餾、調配調味',
        desc: '以基底烈酒為原點，透過二次加工賦予風味的再製類別',
        color: 'rose',
        items: [
          { name: '琴酒', icon: Leaf },
          { name: '利口酒', icon: Citrus },
          { name: '草藥酒', icon: Sprout },
        ]
      }
    ]
  },
  {
    id: 'material',
    title: '原料區分',
    axis: '依原料種類分類',
    rootLabel: '原料',
    rootLabelEn: 'Material',
    branches: [
      {
        name: '水果',
        subtitle: '果糖直接發酵',
        desc: '以新鮮水果的天然果糖為基礎，發酵、蒸餾而成',
        color: 'amber',
        items: [
          { name: '白蘭地', icon: Grape },
          { name: '伏特加', icon: Snowflake },
        ]
      },
      {
        name: '穀物',
        subtitle: '澱粉糊化、糖化、發酵',
        desc: '以大麥、玉米、稻米等穀物澀粉糖化後，發酵、蒸餾而成',
        color: 'rose',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '固態法中式白酒', icon: Wine },
          { name: '燒酎', icon: Droplet },
          { name: '伏特加', icon: Snowflake },
        ]
      },
      {
        name: '根莖',
        subtitle: '澀粉或糖份發酵',
        desc: '以馬鈴薯、龍舌蘭、甘蔗等根莖類作物為原料，糖化、發酵、蒸餾而成',
        color: 'sky',
        items: [
          { name: '蘭姆酒', icon: Palmtree },
          { name: '龍舌蘭', icon: Flower2 },
          { name: '燒酎', icon: Droplet },
          { name: '伏特加', icon: Snowflake },
        ]
      }
    ]
  },
  {
    id: 'sugar',
    title: '取糖方式',
    axis: '依取糖方式分類',
    rootLabel: '取糖',
    rootLabelEn: 'Sugar',
    branches: [
      {
        name: '熱水法',
        subtitle: '熱水浸泡萃取糖份',
        desc: '以熱水浸泡澀粉糖化後的醪液，萃取出可發酵的糖份',
        color: 'amber',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
        ]
      },
      {
        name: '壓榨法',
        subtitle: '直接壓榨取得糖液',
        desc: '直接壓榨原料，取得天然糖份汁液',
        color: 'rose',
        items: [
          { name: '白蘭地', icon: Grape },
          { name: '蘭姆酒', icon: Palmtree },
        ]
      },
      {
        name: '蒸煮壓榨',
        subtitle: '先蒸煮軟化再壓榨',
        desc: '先以蒸煮軟化原料組織，再壓榨取得糖份',
        color: 'sky',
        items: [
          { name: '龍舌蘭', icon: Flower2 },
          { name: '燒酎', icon: Droplet },
        ]
      },
      {
        name: '熱蒸法',
        subtitle: '蒸氣加熱糊化澀粉',
        desc: '以蒸氣加熱原料，使澀粉糊化後釋出糖份',
        color: 'emerald',
        items: [
          { name: '固態法中式白酒', icon: Wine },
          { name: '燒酎', icon: Droplet },
        ]
      }
    ]
  },
  {
    id: 'fermentation',
    title: '發酵方式',
    axis: '依發酵方式分類',
    rootLabel: '發酵',
    rootLabelEn: 'Fermentation',
    branches: [
      {
        name: '液態法',
        subtitle: '液態環境中發酵',
        desc: '原料先液化或榨汁後，在液態環境中進行發酵',
        color: 'amber',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
          { name: '白蘭地', icon: Grape },
          { name: '龍舌蘭', icon: Flower2 },
          { name: '燒酎', icon: Droplet },
        ]
      },
      {
        name: '固態法',
        subtitle: '固態狀態直接發酵',
        desc: '原料維持固態狀態，直接進行發酵與後續處理',
        color: 'rose',
        items: [
          { name: '固態法中式白酒', icon: Wine },
          { name: '燒酎', icon: Droplet },
        ]
      }
    ]
  },
  {
    id: 'distillation',
    title: '蒸餾方式',
    axis: '依蒸餾方式分類',
    rootLabel: '蒸餾',
    rootLabelEn: 'Distillation',
    branches: [
      {
        name: '批次壺式',
        subtitle: '單次蒸餾鍋逐批蒸餾',
        desc: '以單次蒸餾鍋為單位，逐批進行蒸餾，保留較多原料風味',
        color: 'amber',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
          { name: '白蘭地', icon: Grape },
          { name: '龍舌蘭', icon: Flower2 },
          { name: '燒酎', icon: Droplet },
          { name: '固態法中式白酒', icon: Wine },
          { name: '琴酒', icon: Leaf },
        ]
      },
      {
        name: '批次柱式',
        subtitle: '多板蒸餾柱批次進行',
        desc: '以多板蒸餾柱進行批次蒸餾，提升酒精純度與效率',
        color: 'rose',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
          { name: '白蘭地', icon: Grape },
          { name: '龍舌蘭', icon: Flower2 },
          { name: '燒酎', icon: Droplet },
        ]
      },
      {
        name: '連續柱式',
        subtitle: '連續進料、連續蒸餾',
        desc: '原料連續進料、連續蒸餾，常用於量產型烈酒',
        color: 'sky',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
        ]
      }
    ]
  },
  {
    id: 'maturation',
    title: '熟成方式',
    axis: '依熟成方式分類',
    rootLabel: '熟成',
    rootLabelEn: 'Maturation',
    branches: [
      {
        name: '木桶',
        subtitle: '橡木桶等木製容器陳放',
        desc: '於橡木桶等木製容器中陳放，賦予烈酒木質與單寧風味',
        color: 'amber',
        items: [
          { name: '威士忌', icon: Beaker },
          { name: '蘭姆酒', icon: Palmtree },
          { name: '白蘭地', icon: Grape },
          { name: '龍舌蘭', icon: Flower2 },
        ]
      },
      {
        name: '陶缸甕罐',
        subtitle: '陶製容器陳放',
        desc: '以陶製容器熟成，呈現與木桶不同的礦物與陶土氣息',
        color: 'rose',
        items: [
          { name: '燒酎', icon: Droplet },
          { name: '固態法中式白酒', icon: Wine },
        ]
      }
    ]
  }
];

export const REGIONS = [
  { name: '蘇格蘭', path: '/regulations/scotch', color: 'border-blue-500/20 text-blue-400', bgImage: '/reg_bgs/scotland.png' },
  { name: '愛爾蘭', path: '/regulations/irish', color: 'border-green-500/20 text-green-400', bgImage: '/reg_bgs/ireland.png' },
  { name: '歐盟', path: '/regulations/eu', color: 'border-indigo-500/20 text-indigo-400', bgImage: '/reg_bgs/eu.png' },
  { name: '美國波本', path: '/regulations/bourbon', color: 'border-amber-500/20 text-amber-400', bgImage: '/reg_bgs/usa.png' },
  { name: '加拿大', path: '/regulations/canadian', color: 'border-red-500/20 text-red-400', bgImage: '/reg_bgs/canada.png' },
  { name: '日本', path: '/regulations/japanese', color: 'border-pink-500/20 text-pink-400', bgImage: '/reg_bgs/japan.png' },
  { name: '產區比較表', path: '/regulations/comparison', color: 'border-amber-500/40 text-amber-500 bg-amber-500/5', bgImage: '/reg_bgs/comparison.png' },
];

export const EXPLORE_SECTIONS = [
  {
    title: '法規與產區',
    desc: '深入瞭解全球知名威士忌產區的法律與標準',
    path: '/regulations',
    icon: Gavel,
    color: 'from-amber-200/20 to-amber-500/20',
    subLinks: [
      { name: '蘇格蘭', path: '/regulations/scotch' },
      { name: '愛爾蘭', path: '/regulations/irish' },
      { name: '歐盟', path: '/regulations/eu' },
      { name: '美國', path: '/regulations/bourbon' },
      { name: '加拿大', path: '/regulations/canadian' },
      { name: '日本', path: '/regulations/japanese' },
      { name: '比較表', path: '/regulations/comparison' }
    ]
  },
  {
    title: '系統與製程',
    desc: '從原料分類到熟成細節，系統性探索生命之水的誕生過程',
    path: '/process',
    icon: Cog,
    color: 'from-orange-200/20 to-orange-500/20',
    subLinks: [
      { name: '威士忌製程', path: '/process/whisky' },
      { name: '烈酒流程', path: '/process/menu' }
    ]
  },
  {
    title: '釀酒師分享',
    desc: '釀酒師朋友們的故事、經歷與產業八卦',
    path: '/blog/mouse',
    icon: Compass,
    color: 'from-yellow-200/20 to-yellow-500/20',
    subLinks: []
  },
  {
    title: '烈酒挑戰',
    desc: '測驗威士忌知識，累積學習成果，並登上排行榜！',
    path: '/exam',
    icon: GraduationCap,
    color: 'from-orange-400/20 to-orange-600/20',
    subLinks: [
      { name: '開始測驗', path: '/exam' },
      { name: '排行榜', path: '/leaderboard' }
    ]
  }
];

export const NAV_ITEMS = [
  {
    name: '法規',
    path: '/regulations',
    icon: Gavel,
    dropdown: [
      { name: '蘇格蘭威士忌法規', path: '/regulations/scotch' },
      { name: '愛爾蘭威士忌法規', path: '/regulations/irish' },
      { name: '歐盟威士忌法規', path: '/regulations/eu' },
      { name: '美國威士忌法規', path: '/regulations/bourbon' },
      { name: '加拿大威士忌法規', path: '/regulations/canadian' },
      { name: '日本威士忌規範', path: '/regulations/japanese' },
      { name: '傳統產區法規比較表', path: '/regulations/comparison' },
    ]
  },
  {
    name: '全球烈酒系統',
    path: '/process',
    icon: Cog,
    dropdown: [
      { name: '烈酒分類地圖', path: '/process/classification' },
      { name: '麥芽威士忌(入門版)', path: '/process/whisky' },
      { name: '烈酒製程基礎版', path: '/process/full' },
    ]
  },
  { name: '測驗一下', path: '/exam', icon: GraduationCap },
  { name: '排行榜', path: '/leaderboard', icon: Trophy },
  { name: '釀酒師分享', path: '/blog/mouse', icon: Compass },
  { name: '有趣一日釀酒師', path: '/one-day-distiller', icon: Hammer },
  { name: '更新里程碑', path: '/milestone', icon: Flag },
];
