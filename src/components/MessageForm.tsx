import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { submitMessage } from '../services/supabaseService';
import { useAuth } from '../lib/AuthContext';

interface MessageFormProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

export function MessageForm({
  title = '留下你的話',
  subtitle = '任何想法、建議或只是打個招呼都歡迎！',
  placeholder = '你好！我想說...',
}: MessageFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.display_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError('');
    try {
      await submitMessage(name.trim() || '匿名', email.trim(), message.trim());
      setSuccess(true);
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError('送出失敗，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 border-amber-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
          <MessageSquare className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
      </div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-green-400"
        >
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-bold">感謝你的留言！</p>
            <p className="text-sm text-green-400/60">我會盡快閱讀你的訊息 🥃</p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 mb-1.5 block">
                你的名字（可選）
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="匿名旅人"
                maxLength={30}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 mb-1.5 block">
                電子郵件（若願意讓老鼠回覆可選填）
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="distiller@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 mb-1.5 block">
              留言內容 *
            </label>
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={placeholder}
              rows={4}
              maxLength={500}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none"
            />
            <div className="text-right text-xs text-white/20 mt-1">{message.length}/500</div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-whisky-950 font-bold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            {loading ? '送出中...' : '送出留言'}
          </button>
        </form>
      )}
    </div>
  );
}
