import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Clock, CheckCheck, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getMessages, markMessageRead } from '../services/supabaseService';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  name: string;
  email?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function AdminMessages() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin) return; // 非管理員：畫面顯示無權限，不導頁，避免閃爍

    (async () => {
      setLoading(true);
      const msgs = await getMessages();
      setMessages(msgs as Message[]);
      setLoading(false);
    })();
  }, [user, authLoading, isAdmin, navigate]);

  const handleMarkRead = async (id: string) => {
    await markMessageRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (authLoading) {
    return <div className="min-h-screen pt-32 text-center text-white/30">載入中...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">沒有權限</h1>
          <p className="text-white/40 text-sm mb-6">這個頁面僅限管理員存取。</p>
          <Link to="/profile" className="text-amber-500 hover:text-amber-400 text-sm">
            返回個人內容
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-whisky-950">
      <div className="max-w-4xl mx-auto">
        <Link to="/profile" className="inline-flex items-center gap-2 text-white/40 hover:text-amber-500 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回個人內容
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border-amber-500/20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
              <MessageSquare className="w-6 h-6 text-amber-500" />
              留言管理
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} 新
                </span>
              )}
            </h1>
            <span className="text-white/30 text-sm">共 {messages.length} 則</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-white/30">載入中...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-white/30 italic">還沒有留言</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'p-5 rounded-2xl border transition-all',
                    msg.is_read ? 'bg-white/3 border-white/5 opacity-60' : 'bg-amber-500/5 border-amber-500/20'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-bold text-white">{msg.name}</span>
                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-amber-500 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" /> {msg.email}
                          </a>
                        )}
                        {!msg.is_read && <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleString('zh-TW')}
                      </div>
                    </div>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-amber-500 bg-white/5 hover:bg-amber-500/10 px-3 py-2 rounded-lg transition-all"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> 標記已讀
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
