import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { RichTextEditor } from '../components/RichTextEditor';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';

function slugify(text: string) {
  return text.toLowerCase().replace(/[\s\u3000]+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, '').slice(0, 60);
}

export function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();
  const { isAuthor, loading, user, role } = useAuth();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [saved, setSaved] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  useEffect(() => { if (!loading && role !== null && !isAuthor) navigate('/'); }, [isAuthor, loading, role]);

  useEffect(() => {
    supabase.from('posts').select('tags').then(({ data }) => {
      const t = Array.from(new Set((data || []).flatMap((p: any) => p.tags || [])));
      setAllTags(t as string[]);
    });
  }, []);

  useEffect(() => {
    if (!isNew) {
      supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title); setSlug(data.slug);
          setExcerpt(data.excerpt || ''); setCoverImage(data.cover_image || '');
          setTags((data.tags || []).join(', '));
          setTagInput((data.tags || []).join(', ')); setContent(data.content);
          setIsPublished(data.is_published); setSlugManual(true);
        }
      });
    }
  }, [id]);

  useEffect(() => { if (!slugManual && title) setSlug(slugify(title)); }, [title, slugManual]);

  const save = async (publishOverride?: boolean) => {
    if (!title.trim()) return alert('請填寫文章標題');
    setSaving(true);
    const willPublish = publishOverride !== undefined ? publishOverride : isPublished;
    const payload = {
      title, slug, excerpt,
      cover_image: coverImage,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      content,
      is_published: willPublish,
      published_at: willPublish ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
      author_id: user?.id,
    };

    if (isNew) {
      const { data } = await supabase.from('posts').insert(payload).select().single();
      if (data) navigate(`/admin/posts/edit/${data.id}`, { replace: true });
    } else {
      await supabase.from('posts').update(payload).eq('id', id);
    }
    if (publishOverride !== undefined) setIsPublished(publishOverride);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 pb-24">
      <div className="flex items-center justify-between mb-8">
        <Link to="/admin/posts" className="flex items-center gap-1 text-white/40 hover:text-amber-400 text-sm transition-colors">
          <ArrowLeft className="w-3 h-3" /> 回到文章管理
        </Link>
        <div className="flex items-center gap-2">
          {saved && <span className="text-green-400 text-sm">已儲存 ✓</span>}
          <button onClick={() => save(!isPublished)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${isPublished ? 'border-white/20 text-white/50 hover:border-red-400/30 hover:text-red-400' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>
            {isPublished ? <><EyeOff className="w-4 h-4" /> 取消發布</> : <><Eye className="w-4 h-4" /> 發布</>}
          </button>
          <button onClick={() => save()} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-xl text-black font-medium text-sm transition-all">
            <Save className="w-4 h-4" />{saving ? '儲存中...' : '儲存草稿'}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="文章標題"
          className="w-full bg-transparent text-3xl font-serif font-bold text-white placeholder-white/20 border-none outline-none" />

        <div className="flex items-center gap-2">
          <span className="text-white/30 text-sm">/blog/mouse/</span>
          <input value={slug} onChange={e => { setSlug(e.target.value); setSlugManual(true); }}
            placeholder="slug" className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/60 outline-none focus:border-amber-500/40" />
        </div>

        <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)}
          placeholder="文章摘要（顯示在列表頁和分享預覽）" rows={2}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/20 outline-none focus:border-amber-500/40 resize-none" />

        <input value={coverImage} onChange={e => setCoverImage(e.target.value)}
          placeholder="封面圖片網址（選填）"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/20 outline-none focus:border-amber-500/40" />
        {coverImage && <img src={coverImage} alt="封面預覽" className="w-full h-40 object-cover rounded-xl" />}

        <div className="relative">
          <input
            value={tagInput}
            onChange={e => {
              setTagInput(e.target.value);
              setTags(e.target.value);
              const parts = e.target.value.split(',');
              const last = parts[parts.length - 1].trim();
              if (last.length > 0) {
                setTagSuggestions(allTags.filter(t => t.includes(last) && !parts.slice(0,-1).map(p=>p.trim()).includes(t)));
              } else {
                setTagSuggestions([]);
              }
            }}
            onBlur={() => setTimeout(() => setTagSuggestions([]), 200)}
            placeholder="標籤（用逗號分隔，例：威士忌, 蒸餾, 產業觀察）"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 placeholder-white/20 outline-none focus:border-amber-500/40"
          />
          {tagSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-white/10 rounded-xl overflow-hidden z-20">
              {tagSuggestions.map(t => (
                <button key={t} type="button"
                  onClick={() => {
                    const parts = tagInput.split(',');
                    parts[parts.length - 1] = ' ' + t;
                    const newVal = parts.join(',') + ', ';
                    setTagInput(newVal);
                    setTags(newVal);
                    setTagSuggestions([]);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white/60 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                >{t}</button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-white/30 text-xs mb-2">文章內容</p>
          <RichTextEditor content={content} onChange={setContent} />
          {/* 底部按鈕 */}
          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/10">
            {saved && <span className="text-green-400 text-sm">已儲存 ✓</span>}
            <button onClick={() => save(!isPublished)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${isPublished ? 'border-white/20 text-white/50 hover:border-red-400/30 hover:text-red-400' : 'border-green-500/30 text-green-400 hover:bg-green-500/10'}`}>
              {isPublished ? <><EyeOff className="w-4 h-4" /> 取消發布</> : <><Eye className="w-4 h-4" /> 發布</>}
            </button>
            <button onClick={() => save()} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-xl text-black font-medium text-sm transition-all">
              <Save className="w-4 h-4" />{saving ? '儲存中...' : '儲存草稿'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
