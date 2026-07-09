import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, ChevronRight, Calendar, User, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';


export function DistillerSays() {
  const [selectedPostId, setSelectedPostId] = useState('1');

  const posts = [
    {
      id: '1',
      title: '為何威士忌需要「呼吸」？談熟成中的氧化反應',
      date: '2026-05-01',
      author: '老鼠',
      category: '熟成科學',
      summary: '很多人知道威士忌需要熟成，但很少人討論「氧氣」在橡木桶內部扮演的關鍵角色。',
      content: `
在熟成的過程中，橡木桶並不是一個完全密封的容器。由於木材具有微小的孔隙，桶內的酒液會與外部的空氣進行緩慢的交換。這個過程我們稱之為「氧化反應」。

氧氣進入桶中後，會與酒液中的酚類物質、醇類物質產生化學作用。這種反應會大幅降低原酒中生硬、尖銳的硫化物氣味（通常帶有生橡皮或火柴味），並將其轉化為更具水果香氣、花香的酯類物質。

### 慢速氧化的魔力
如果氧化速度太快，酒液會迅速老化，變得乾澀；但如果像在不鏽鋼槽中幾乎不接觸氧氣，酒液就會顯得沉悶且缺乏深度。蘇格蘭的涼爽氣候提供了近乎完美的「慢速氧化」環境。

下次品飲時，試著感受一下那股溫潤的甜感，那可能就是氧氣與時間共同留下的足跡。
      `
    },
    {
      id: '2',
      title: '關於泥煤：不僅僅是煙燻味',
      date: '2026-04-20',
      author: '老鼠',
      category: '原料探索',
      summary: '泥煤的風味層次遠比想像中豐富，讓我們從地理位置來看泥煤的差異。',
      content: `
很多人對泥煤（Peat）的第一印象是「正露丸」或「營火」，但身為釀酒師，我們更在意的是泥煤背後的「風土」。

艾雷島（Islay）的泥煤含有大量的海邊植被，如海藻、苔蘚，因此帶有強烈的碘味與海鹽氣息。而高地區（Highlands）的泥煤則多由內陸森林的腐木、枯枝堆積而成，其風味更偏向森林地面的泥土感、石楠花香與乾爽的煙燻感。

不同的燃燒溫度、乾燥時間點，都會影響最終麥芽吸收酚類物質的程度。這正是威士忌迷人之處——看似相同的工序，細節卻決定了一切。
      `
    }
  ];

  const selectedPost = posts.find(p => p.id === selectedPostId) || posts[0];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-0 bg-whisky-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar - 20% */}
        <aside className="md:w-[20%]">
          <div className="sticky top-32 space-y-6">
            <div className="glass-card p-6 border-amber-500/10">
              <h2 className="text-amber-500 font-serif text-xl font-bold mb-6 flex items-center gap-2">
                <Book className="w-5 h-5" />
                文章清單
              </h2>
              <nav className="space-y-4">
                {posts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl text-sm transition-all group relative overflow-hidden",
                      selectedPostId === post.id 
                        ? "bg-amber-500 text-whisky-950 font-bold" 
                        : "text-white/45 hover:text-white hover:bg-white/5 bg-white/5"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase opacity-60">{post.category}</span>
                      <span className="line-clamp-2">{post.title}</span>
                    </div>
                    {selectedPostId !== post.id && (
                      <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Distiller Intro */}
            <div className="glass-card p-6 border-amber-500/10 bg-amber-500/5">
              <h3 className="text-amber-500 font-serif text-lg font-bold mb-4">釀酒師介紹</h3>
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center overflow-hidden mx-auto">
                   <User className="w-8 h-8 text-amber-500" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold mb-1">陳正穎 Zach Chen</p>
                  <p className="text-amber-500/80 text-[11px] uppercase tracking-widest mb-3">烈酒鬼才</p>
                  <div className="text-white/55 text-xs leading-relaxed text-left space-y-3">
                    <p>
                      有趣酒業聯合創辦人，致力推廣系統化理解全球威士忌與烈酒知識，中國黃酒桶威士忌發明人，曾建立和運營中國最大的複合型威士忌蒸餾廠，並且擔任品牌教育總監；過去也顧問輔導國內外多間蒸餾廠之建設和策略設計。
                    </p>
                    <p>
                      著作兩本威士忌產業旅遊專書《凝視蘇格蘭》和《威士忌印象河流》，翻譯《威士忌：生產工藝與營銷策略中文二版》以及英文三版篇章作者，並在英國釀造與蒸餾學會(CIBD)月刊發表多篇文章，作為東西方釀酒思考的橋樑。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content - 80% */}
        <main className="md:w-[80%]">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl"
          >
            <p className="text-amber-500/90 font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              我們將與<span className="text-amber-500 font-bold">有趣酒業</span>和其他合作酒廠一起支援「有趣一日釀酒師」單元，敬請期待！
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPostId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 md:p-12 border-white/5 min-h-[60vh] flex flex-col"
            >
              <div className="mb-8 border-b border-white/10 pb-8">
                <div className="flex flex-wrap items-center gap-4 text-xs text-amber-500/60 font-bold mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedPost.author}</span>
                  <span className="bg-amber-500/10 px-2 py-0.5 rounded">{selectedPost.category}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                  {selectedPost.title}
                </h1>
                <p className="text-white/45 italic leading-relaxed text-lg border-l-2 border-amber-500/30 pl-4">
                  {selectedPost.summary}
                </p>
              </div>

              <div className="prose prose-invert prose-amber max-w-none text-white/75 leading-loose text-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>

              <div className="mt-auto pt-12 flex items-center justify-between border-t border-white/5">
                <button className="flex items-center gap-2 text-white/35 hover:text-amber-500 transition-colors text-sm">
                  <MessageSquare className="w-4 h-4" />
                  分享心得
                </button>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500/20" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/40" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
