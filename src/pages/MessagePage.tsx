import { MessageForm } from '../components/MessageForm';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

export function MessagePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
            <MessageSquare className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-500">留言給老鼠</h1>
            <p className="text-white/40 text-sm mt-1">任何想法、建議或只是打個招呼都歡迎！</p>
          </div>
        </div>
        <MessageForm
          title="寫下你想說的話"
          subtitle="我會盡快回覆你 🥃"
          placeholder="你好！我想說..."
        />
      </motion.div>
    </div>
  );
}
