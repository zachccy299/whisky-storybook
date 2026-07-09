import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Calendar, Tag, PenLine, Settings, User, Book, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  tags: string[];
  published_at: string;
  view_count: number;
  content: string;
}

// 從 HTML 擷取純文字前三行
function getPreview(html: string): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const sentences = text.split(/[。！？.!?]/);
  return sentences.slice(0, 3).join('。').slice(0, 150) + (text.length > 150 ? '⋯' : '');
}

export function MouseBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdmin, isAuthor } = useAuth();

  useEffect(() => {
    supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, tags, published_at, view_count, content')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  // 收集所有 tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags?.includes(selectedTag))
    : posts;

  const Sidebar = () => (
    <div className="space-y-6">
      {/* 作者介紹 */}
      <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
        <h3 className="text-amber-400 font-serif text-lg font-bold mb-4">釀酒師介紹</h3>
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto overflow-hidden">
            <User className="w-8 h-8 text-amber-500" />
          </div>
          <div className="text-center">
            <p className="text-white font-bold mb-0.5">陳正穎 Zach Chen</p>
            <p className="text-amber-500/70 text-[11px] uppercase tracking-widest mb-3">烈酒鬼才</p>
            <div className="text-white/50 text-xs leading-relaxed text-left space-y-2">
              <p>綽號老鼠，台灣有趣酒業和鳳凰飲料聯合創辦人，致力推廣系統化理解全球威士忌與烈酒知識，擷取東西方釀酒知識概念，融合並且創新。</p>
              <p>中國黃酒桶威士忌發明人，奠定中國威士忌風味概念。</p>
              <p>世界第一個木桶陳年無酒精威士忌風味飲料發明人。</p>
              <p>曾建立和運營中國最大的複合型威士忌蒸餾廠，並擔任品牌教育總監；亦有精釀啤酒廠建造與生產管理經驗。同時多年來顧問輔導亞洲多間蒸餾廠之設計、建造、生產和用桶策略。</p>
              <p>著作兩本威士忌產業旅遊專書《凝視蘇格蘭》和《威士忌印象河流》，翻譯威士忌產業聖經《威士忌：生產工藝與營銷策略中文二版》(Whisky: Technology, Production and Marketing 2nd)，同時為英文三版篇章作者和《Hooch and Hard Liquor in East Asia: A Political Economy》的篇章作者。</p>
              <p>同時在英國釀造與蒸餾學會(CIBD)的釀酒師月刊(Brewer and Distiller International)發表多篇文章，介紹中國威士忌發展和中國黃酒製作，作為東西方釀酒思考的橋樑。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 分類 */}
      {allTags.length > 0 && (
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
          <h3 className="text-white/60 text-sm font-medium mb-3 flex items-center gap-2">
            <Book className="w-4 h-4" /> 文章分類
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedTag(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${!selectedTag ? 'bg-amber-500/20 text-amber-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <span>全部文章</span>
              <span className="text-xs opacity-60">{posts.length}</span>
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => { setSelectedTag(tag); setSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${selectedTag === tag ? 'bg-amber-500/20 text-amber-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-3 h-3" />{tag}
                </span>
                <span className="text-xs opacity-60">{posts.filter(p => p.tags?.includes(tag)).length}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* 手機版漢堡選單 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-amber-400 transition-all"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-400">釀酒師分享</h1>
            <p className="text-white/40 text-sm mt-0.5">
              {selectedTag ? `#${selectedTag}` : '釀酒師朋友們的故事、經歷與產業觀察'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAuthor && (
            <Link to="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-500/30 transition-all text-sm">
              <PenLine className="w-4 h-4" /> 寫新文章
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin/posts" className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-amber-400 transition-all text-sm">
              <Settings className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* 手機版 sidebar overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)}>
            <motion.div
              initial={{ x: -300 }} animate={{ x: 0 }}
              className="w-72 h-full bg-zinc-900 border-r border-white/10 p-4 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <Sidebar />
            </motion.div>
          </div>
        )}

        {/* 桌機版左側欄 */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* 右側文章列表 */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-40 bg-white/[0.03] rounded-2xl animate-pulse" />)}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-24 text-white/30">
              <p className="text-5xl mb-4">🐭</p>
              <p>{selectedTag ? `還沒有「${selectedTag}」的文章` : '老鼠還在醞釀第一篇文章⋯'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={`/blog/mouse/${post.slug}`} className="group block">
                    <div className="flex gap-5 p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] hover:border-amber-500/20 transition-all">
                      {post.cover_image && (
                        <img src={post.cover_image} alt={post.title} className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-1.5 line-clamp-2">
                          {post.title}
                        </h2>
                        {/* 文章前三行預覽 */}
                        <p className="text-white/40 text-sm line-clamp-3 mb-3 leading-relaxed">
                          {post.excerpt || getPreview(post.content || '')}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/25 flex-wrap">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.published_at).toLocaleDateString('zh-TW')}
                            </span>
                          )}
                          {post.tags?.map(tag => (
                            <button
                              key={tag}
                              onClick={e => { e.preventDefault(); setSelectedTag(tag); }}
                              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                            >
                              <Tag className="w-3 h-3" />{tag}
                            </button>
                          ))}
                          {post.view_count > 0 && <span>{post.view_count} 次閱讀</span>}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-amber-400 transition-colors flex-shrink-0 self-center" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
