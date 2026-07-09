import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { Calendar, Tag, ArrowLeft, Share2, Pencil, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  tags: string[];
  published_at: string;
  view_count: number;
}

export function MousePost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    supabase.from('posts').select('*').eq('slug', slug).single()
      .then(({ data }) => { setPost(data); setLoading(false); });
  }, [slug]);

  // 累計閱讀數
  useEffect(() => {
    if (!post?.id) return;
    supabase.rpc('increment_view_count', { post_id: post.id });
  }, [post?.id]);

  const pageUrl = window.location.href;
  const shareToFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
  const shareToX = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post?.title || '')}`, '_blank');
  const copyLink = () => { navigator.clipboard.writeText(pageUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
      <div className="h-8 bg-white/[0.03] rounded animate-pulse w-2/3" />
      <div className="h-64 bg-white/[0.03] rounded-2xl animate-pulse" />
    </div>
  );

  if (!post) return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <p className="text-6xl mb-4">🐭</p>
      <p className="text-white/40">找不到這篇文章</p>
      <Link to="/blog/mouse" className="mt-6 inline-block text-amber-400 hover:underline">回到文章列表</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4 py-16">
      <Link to="/blog/mouse" className="flex items-center gap-2 text-white/40 hover:text-amber-400 transition-colors mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" />回到老鼠說
      </Link>

      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-3xl font-serif font-bold text-white leading-tight">{post.title}</h1>
        {isAdmin && (
          <Link to={`/admin/posts/edit/${post.id}`} className="flex-shrink-0 p-2 bg-white/5 rounded-lg hover:bg-amber-500/20 text-white/40 hover:text-amber-400 transition-all">
            <Pencil className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-white/30 mb-8">
        {post.published_at && (
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.published_at).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        )}
        {post.tags?.map(tag => <span key={tag} className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag}</span>)}
      </div>

      <div
        className="prose prose-invert prose-amber max-w-none mb-12 [&_h2]:text-amber-400 [&_h3]:text-amber-300 [&_a]:text-amber-400 [&_blockquote]:border-amber-500/40 [&_blockquote]:text-white/60"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="border-t border-white/10 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Share2 className="w-4 h-4 text-white/40" />
          <span className="text-white/40 text-sm">分享這篇文章</span>
          <button onClick={shareToFB} className="flex items-center gap-2 px-3 py-2 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-lg text-[#1877F2] hover:bg-[#1877F2]/20 transition-all text-sm">
            <Facebook className="w-4 h-4" /> Facebook
          </button>
          <button onClick={shareToX} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:bg-white/10 transition-all text-sm">
            <Twitter className="w-4 h-4" /> X
          </button>
          <button onClick={copyLink} className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 hover:bg-amber-500/20 transition-all text-sm">
            <LinkIcon className="w-4 h-4" />{copied ? '已複製！' : '複製連結'}
          </button>
        </div>
        <p className="text-white/20 text-xs mt-3">分享到 Instagram 請複製連結後在限時動態或貼文貼上</p>
      </div>
    </motion.div>
  );
}
