import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft, Trash2, UserPlus } from 'lucide-react';

interface AuthorRow {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

export function AdminAuthors() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<AuthorRow[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'author' | 'admin'>('author');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (!loading && !isAdmin) navigate('/'); }, [isAdmin, loading]);

  const fetchAuthors = async () => {
    const { data: roles } = await supabase.from('user_roles').select('*').order('created_at', { ascending: false });
    if (!roles) return;
    setAuthors(roles as AuthorRow[]);
  };

  useEffect(() => { fetchAuthors(); }, []);

  const addAuthor = async () => {
    setError('');
    setAdding(true);
    const { data: user, error: rpcError } = await supabase.rpc('get_user_by_email', { email: newEmail });
    if (rpcError) { setError(rpcError.message); setAdding(false); return; }
    if (!user) { setError('找不到這個 email，請確認該用戶已在網站登入過'); setAdding(false); return; }
    await supabase.from('user_roles').upsert({ user_id: user, email: newEmail, role: newRole });
    setNewEmail(''); setAdding(false); fetchAuthors();
  };

  const removeAuthor = async (id: string) => {
    if (!confirm('確定要移除這位作者？')) return;
    await supabase.from('user_roles').delete().eq('id', id);
    fetchAuthors();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link to="/admin/posts" className="flex items-center gap-1 text-white/40 hover:text-amber-400 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-3 h-3" /> 回到文章管理
      </Link>
      <h1 className="text-3xl font-serif font-bold text-amber-400 mb-10">作者管理</h1>

      {/* 新增作者 */}
      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl mb-8">
        <h2 className="text-sm font-medium text-white/60 mb-4">新增作者（對方須先在網站登入過）</h2>
        <div className="flex gap-3">
          <input value={newEmail} onChange={e => setNewEmail(e.target.value)}
            placeholder="對方的 Email" className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 placeholder-white/20 outline-none focus:border-amber-500/40" />
          <select value={newRole} onChange={e => setNewRole(e.target.value as any)}
            className="bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/70 outline-none">
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={addAuthor} disabled={adding || !newEmail}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-xl text-black font-medium text-sm transition-all">
            <UserPlus className="w-4 h-4" />{adding ? '新增中...' : '新增'}
          </button>
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </div>

      {/* 作者列表 */}
      <div className="space-y-3">
        {authors.map(a => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-xl">
            <div>
              <p className="text-white text-sm font-medium">{a.email}</p>
              <p className="text-white/30 text-xs mt-0.5">加入於 {new Date(a.created_at).toLocaleDateString('zh-TW')}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/40'}`}>{a.role}</span>
              <button onClick={() => removeAuthor(a.id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
