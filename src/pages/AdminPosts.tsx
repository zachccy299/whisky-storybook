import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { PenLine, Trash2, Eye, EyeOff, Plus, ArrowLeft, Users } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  view_count: number;
}

export function AdminPosts() {
  const { isAdmin, loading, role } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => { if (!loading && role !== null && !isAdmin) navigate('/'); }, [isAdmin, loading, role]);

  const fetchPosts = () => {
    supabase.from('posts').select('id, title, slug, is_published, published_at, created_at, view_count')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setFetching(false); });
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (post: Post) => {
    await supabase.from('posts').update({
      is_published: !post.is_published,
      published_at: !post.is_published ? new Date().toISOString() : post.published_at,
    }).eq('id', post.id);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm('確定要刪除這篇文章？')) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link to="/blog/mouse" className="flex items-center gap-1 text-white/40 hover:text-amber-400 text-sm mb-2 transition-colors">
            <ArrowLeft className="w-3 h-3" /> 回到老鼠說
          </Link>
          <h1 className="text-3xl font-serif font-bold text-amber-400">文章管理</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/authors" className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-amber-400 hover:border-amber-500/20 transition-all text-sm">
            <Users className="w-4 h-4" /> 作者管理
          </Link>
          <Link to="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-xl text-black font-medium transition-all">
            <Plus className="w-4 h-4" /> 寫新文章
          </Link>
        </div>
      </div>

      {fetching ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white/[0.03] rounded-xl animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <p className="text-center text-white/30 py-20">還沒有文章</p>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{post.title}</p>
                <p className="text-xs text-white/30 mt-0.5">
                  {post.is_published
                    ? `發布於 ${new Date(post.published_at).toLocaleDateString('zh-TW')} · ${post.view_count || 0} 次閱讀`
                    : `建立於 ${new Date(post.created_at).toLocaleDateString('zh-TW')} · 草稿`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${post.is_published ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/30'}`}>
                  {post.is_published ? '已發布' : '草稿'}
                </span>
                <button onClick={() => togglePublish(post)} className="p-2 rounded-lg text-white/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                  {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Link to={`/admin/posts/edit/${post.id}`} className="p-2 rounded-lg text-white/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                  <PenLine className="w-4 h-4" />
                </Link>
                <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
