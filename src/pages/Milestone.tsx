import { motion } from 'motion/react';
import { MessageForm } from '../components/MessageForm';
import { CheckCircle2, CircleDashed, Clock, Rocket, Flag, Calendar, Info, GlassWater, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface MilestoneItem {
  id: string;
  version: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
}

const milestones: MilestoneItem[] = [
  {
    id: '1',
    version: 'v1.0',
    title: '核心法規上線',
    description: '蘇格蘭、美國波本、愛爾蘭等主要產區法規知識庫建立。',
    status: 'completed',
    date: '2026年5月'
  },
  {
    id: '2',
    version: 'v1.1',
    title: '測驗與勳章系統',
    description: '增加單元複習測驗與 12 款專屬職人、探險家勳章。',
    status: 'completed',
    date: '2026年5月'
  },
  {
    id: '3',
    version: 'v1.2',
    title: '全球排行榜',
    description: '排名系統正式上線，讓全球愛好者一同競技知識。',
    status: 'completed',
    date: '2026年5月'
  },
  {
    id: '4',
    version: '待新增/開發',
    title: '釀酒師碎念：故事系列',
    description: '增加更多釀酒實務、產業秘辛與職人深度訪談內容。',
    status: 'in-progress',
    date: '持續更新'
  },
  {
    id: '5',
    version: '待新增/開發',
    title: '互動式法規',
    description: '各法規的點評與思考、法規比較',
    status: 'in-progress',
    date: '2026 Q3'
  },
  {
    id: '7',
    version: '待新增/開發',
    title: '威士忌製程',
    description: '威士忌製程大綱、中興大學課程精華版、不同製程間比較與選用',
    status: 'in-progress',
    date: '2026 Q3'
  },
  {
    id: '6',
    version: '待新增/開發',
    title: '升級更多烈酒相關知識',
    description: '各種烈酒之法規知識羅列、頁面製作、點評與思考、現有400題烈酒考題修訂與精選',
    status: 'in-progress',
    date: '2026 Q4'
  },
  {
    id: '8',
    version: '待新增/開發',
    title: '多語言版本支援',
    description: '版本增加英文版、日文版、西班牙文版、其他語言版本',
    status: 'planned',
    date: '2027'
  },
  {
    id: '9',
    version: '待新增/開發',
    title: '多元打賞與價值探索',
    description: '更多元的打賞功能？考慮訂閱功能的話能給從業者與非從業者每月更多的價值是什麼？',
    status: 'planned',
    date: '2027'
  }
];

export function Milestone() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4 text-amber-500">
            <Flag className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">更新里程碑</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            我們致力打造專業的有趣的威士忌與烈酒數位故事書<br />
            這裡可以追蹤我們的網站更新進度和未來規劃，敬請各位期待
          </p>
        </motion.div>

        {/* Milestone Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: '已完成功能', count: '3', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: '開發中內容', count: '4', icon: CircleDashed, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: '規劃中未來', count: '2', icon: Rocket, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border-white/5 flex items-center gap-4"
            >
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.count}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 1: Future Goals */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-serif font-bold text-white">未來目標</h2>
          </div>
          <div className="glass-card border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">版本</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">更新內容</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider text-center">狀態</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">預計時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {milestones.filter(m => m.status !== 'completed').map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-6">
                        <span className="font-mono text-amber-500/80 font-bold">{m.version}</span>
                      </td>
                      <td className="px-6 py-6 max-w-md">
                        <div className="font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{m.title}</div>
                        <div className="text-sm text-white/40 leading-relaxed">{m.description}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center">
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                            m.status === 'in-progress' && "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse",
                            m.status === 'planned' && "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                          )}>
                            {m.status === 'in-progress' && <CircleDashed className="w-3 h-3" />}
                            {m.status === 'planned' && <Clock className="w-3 h-3" />}
                            {m.status === 'in-progress' ? '開發中' : '規劃中'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4 opacity-40" />
                          {m.date}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Completed Versions */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-serif font-bold text-white">已完成的版本</h2>
          </div>
          <div className="glass-card border-white/5 overflow-hidden transition-opacity">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">版本</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">更新內容</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider text-center">狀態</th>
                    <th className="px-6 py-4 text-sm font-bold text-amber-500 uppercase tracking-wider">完成時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {milestones.filter(m => m.status === 'completed').slice().reverse().map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-6">
                        <span className="font-mono text-amber-500/80 font-bold">{m.version}</span>
                      </td>
                      <td className="px-6 py-6 max-w-md">
                        <div className="font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{m.title}</div>
                        <div className="text-sm text-white/40 leading-relaxed">{m.description}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center">
                          <div className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-green-400/10 text-green-400 border border-green-400/20">
                            <CheckCircle2 className="w-3 h-3" />
                            已完成
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4 opacity-40" />
                          {m.date}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-start gap-4 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
          <Info className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/60 leading-relaxed">
            <span className="font-bold text-amber-500 mr-1">註：</span>
            本里程碑內容將不定期更新。如有任何建議或發現問題，歡迎與我們聯繫hello@phoenixnonalc.com
          </p>
        </div>

        {/* Donation Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-8 md:p-12 border-amber-500/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
              <Heart className="w-8 h-8 text-amber-500 fill-amber-500/20" />
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-white mb-4">打賞抖內專區</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              如果您喜歡「有趣的威士忌故事書」的內容，歡迎透過以下方式支持我們<br />
              您的每一分鈔能力都是我們持續更新這份知識藍圖的動力
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a 
                href="https://zachccy299.bobaboba.me" 
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-[#AD5138]/10 border border-[#AD5138]/20 rounded-2xl hover:bg-[#AD5138]/20 hover:border-[#AD5138]/40 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#AD5138] flex items-center justify-center group-hover:scale-110 transition-transform p-2">
                  <img src="https://s3.ap-southeast-1.amazonaws.com/media.anyonelab.com/images/boba/boba-embed-icon.png" alt="boba-icon" className="h-full" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#F8E0BE]">請我喝珍奶！</div>
                  <div className="text-xs text-[#F8E0BE]/60">Support with Boba</div>
                </div>
              </a>

              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <MessageForm
                  title="威士忌基金贊助"
                  subtitle="有興趣贊助或洽談募資？留下你的訊息！"
                  placeholder="你好！我對贊助有興趣，或想洽談合作..."
                />
              </div>
            </div>

            <div className="mt-8 text-white/30 text-xs italic">
              * 贊助金額將用於網站開發與維護 *
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
