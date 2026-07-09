import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, Users, GlassWater, Flame, Calendar, MapPin, ChevronRight, GraduationCap, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface CertificateHolder {
  name: string;
  date: string;
  id: string;
  achievement: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: any;
  level: '入門' | '進階' | '專業';
}

const holders: CertificateHolder[] = [
  { name: 'Ta-wei Xiung', date: '2024-12', id: 'ODD-2024-001', achievement: '有趣蒸餾廠釀酒師' },
  { name: 'Tommy Chiu', date: '2024-12', id: 'ODD-2024-002', achievement: '有趣蒸餾廠釀酒師' },
  { name: 'YC Chiu', date: '2024-12', id: 'ODD-2024-003', achievement: '有趣蒸餾廠釀酒師' },
  { name: 'Zach Chen', date: '2024-12', id: 'ODD-2024-004', achievement: '有趣蒸餾廠釀酒師' },
  { name: 'Erica Lee', date: '2025-10', id: 'ODD-2025-001', achievement: '有趣蒸餾廠釀酒師' },
  { name: '喬安', date: '2026-02', id: 'ODD-2026-001', achievement: '有趣一日釀酒師' },
  { name: '烏拉', date: '2026-02', id: 'ODD-2026-002', achievement: '有趣一日釀酒師' },
];

const courses: Course[] = [
  {
    id: 'c1',
    title: '基礎糖化與發酵實務',
    description: '深入瞭解大麥麥芽到麥汁的轉化過程，親身操作糖化槽與酵母投放。',
    duration: '4 小時',
    icon: Flame,
    level: '入門'
  },
  {
    id: 'c2',
    title: '蒸餾工藝：壺式蒸餾實習',
    description: '掌握初餾與複餾的精髓，學習切割酒心的藝術與酒頭酒尾的處置。',
    duration: '6 小時',
    icon: GlassWater,
    level: '專業'
  },
  {
    id: 'c3',
    title: '桶邊試飲與桶陳科學',
    description: '探索不同橡木桶對威士忌風味的貢獻，練習各年份桶邊取樣技術。',
    duration: '3 小時',
    icon: MapPin,
    level: '進階'
  },
  {
    id: 'c4',
    title: '職人調和工作坊',
    description: '運用 12 種不同風格的原酒，親手調配出屬於個人特色的威士忌作品。',
    duration: '2 小時',
    icon: BookOpen,
    level: '進階'
  }
];

export function OneDayDistiller() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedHolders = useMemo(() => {
    return [...holders].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const totalPages = Math.ceil(sortedHolders.length / itemsPerPage);
  
  const paginatedHolders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedHolders.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedHolders]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-10 h-10 text-amber-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">有趣一日釀酒師</h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            我們將與<span className="text-amber-500 font-bold">有趣酒業</span>及指標性酒廠合作，
            為愛好者提供最真實的威士忌現場。這不僅是學習，更是實踐工藝的旅程。
          </p>
        </motion.div>

        {/* Certificate Holders Table */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">有趣一日釀酒師：榮譽名冊</h2>
            </div>
          </div>

          <div className="glass-card border-white/5 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-amber-500/80 text-xs font-black uppercase tracking-widest">
                    <th className="px-6 py-4">取證學員</th>
                    <th className="px-6 py-4">取得成就</th>
                    <th className="px-6 py-4">證書編號</th>
                    <th className="px-6 py-4">發證日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {paginatedHolders.map((h, i) => (
                      <motion.tr 
                        key={h.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-5 focus-within:bg-white/5">
                          <div className="font-bold text-white group-hover:text-amber-500 transition-colors uppercase">{h.name}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold border border-amber-500/20">
                            {h.achievement}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <code className="text-xs text-white/40 font-mono tracking-tighter">{h.id}</code>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-white/40 whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5" />
                            {h.date}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="text-xs text-white/30 font-bold uppercase tracking-widest">
                  第 {currentPage} 頁，共 {totalPages} 頁
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                          "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                          currentPage === i + 1 
                            ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" 
                            : "text-white/20 hover:text-white/40"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Offerings */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <BookOpen className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">體驗內容與課程種類</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-full"
              >
                <div className="glass-card h-full p-8 border-white/5 group-hover:border-amber-500/30 transition-all flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <course.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn(
                        "text-[11px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                        course.level === '入門' ? "bg-green-500/20 text-green-400" :
                        course.level === '進階' ? "bg-amber-500/20 text-amber-400" :
                        "bg-red-500/20 text-red-400"
                      )}>
                        {course.level}
                      </span>
                      <span className="text-[11px] font-bold text-white/30 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-white/50 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                  
                  <button className="mt-8 text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    了解細節 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-amber-500/5 border border-amber-500/10 rounded-3xl text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-white mb-4">想要體驗成為有趣一日釀酒師？</h3>
          <p className="text-white/40 mb-8 max-w-xl mx-auto">
            體驗活動將於近期開放名額。如果您想在開放時第一時間收到通知：
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
              請洽有趣酒業One Day Distiller 預約
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
