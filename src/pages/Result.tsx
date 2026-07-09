import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Home, CheckCircle2, XCircle, ChevronDown, ChevronUp, Share2, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import type { ExamResult } from '../types';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

export function Result() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('latest-exam-result');
    if (!saved) { navigate('/exam'); return; }
    const parsed = JSON.parse(saved) as ExamResult;
    setResult(parsed);
    if (parsed.score >= 80) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#ffd700', '#ffffff'] });
    }
  }, [navigate]);

  if (!result) return null;

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || '';
  const siteUrl = 'https://whiskystorybook-521.pages.dev';
  const ogWorkerUrl = 'https://whisky-og-worker.zach-7cf.workers.dev';
  const shareText = encodeURIComponent(`我在「有趣的威士忌故事書」威士忌知識測驗中獲得了 ${result.score}%！快來挑戰！`);
  // 分享連結需指向 OG Worker（不是 Pages 本身），讓 FB/X/Line 爬蟲能抓到動態 OG tag
  const resultUrl = `${ogWorkerUrl}/exam/result?score=${result.score}&correct=${result.correctCount}&total=${result.total}`;
  const shareUrl = encodeURIComponent(resultUrl);
  const scoreColor = result.score >= 80 ? '#4ade80' : result.score >= 60 ? '#ecc75a' : '#f87171';
  const scoreColorClass = result.score >= 80 ? 'text-green-400' : result.score >= 60 ? 'text-amber-500' : 'text-red-400';
  const scoreLabel = result.score >= 80 ? '優秀！' : result.score >= 60 ? '良好' : '繼續加油';

  const formatTime = (s?: number) => {
    if (!s) return '--';
    const m = Math.floor(s / 60); const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(shareCardRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: '#16140d' });
      const link = document.createElement('a');
      link.download = `whisky-exam-${result.score}pct.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) { console.error(e); }
    finally { setIsGenerating(false); }
  };

  const sharePlatforms = [
    { name: 'Facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: 'X', icon: '𝕏', url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}` },
    { name: 'Threads', icon: '🧵', url: `https://www.threads.net/intent/post?text=${shareText}%20${encodeURIComponent(resultUrl)}` },
    { name: 'Instagram', icon: '📷', url: null },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 text-center relative overflow-hidden border-amber-500/20">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <div className={cn("text-7xl font-serif font-black mb-2", scoreColorClass)}>{result.score}%</div>
          <div className="text-xl font-bold text-white/60 mb-6">{scoreLabel}</div>
          <div className="flex justify-center gap-8 text-sm text-white/40 mb-8">
            <div><span className="text-green-400 font-bold text-lg">{result.correctCount}</span> 答對</div>
            <div><span className="text-red-400 font-bold text-lg">{result.total - result.correctCount}</span> 答錯</div>
            <div><span className="text-white/60 font-bold text-lg">{formatTime(result.timeTaken)}</span> 用時</div>
          </div>
          <button onClick={() => setShowSharePanel(!showSharePanel)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all hover:scale-105 mb-4">
            <Share2 className="w-4 h-4" /> 分享成績
          </button>
          {showSharePanel && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mt-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {sharePlatforms.map(p => (
                  p.url ? (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/10 transition-all hover:scale-105">
                      <span>{p.icon}</span> {p.name}
                    </a>
                  ) : (
                    <button key={p.name} onClick={async () => { await handleDownload(); alert('圖片已下載！請手動上傳到 Instagram。'); }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/10 transition-all hover:scale-105">
                      <span>{p.icon}</span> {p.name}
                    </button>
                  )
                ))}
                <button onClick={handleDownload} disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-whisky-950 text-sm font-bold rounded-full transition-all hover:scale-105 disabled:opacity-50">
                  <Download className="w-4 h-4" /> {isGenerating ? '生成中...' : '下載圖片'}
                </button>
              </div>
            </motion.div>
          )}
          {!user && (
            <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-500">
              💡 <Link to="/login" className="underline">登錄帳號</Link> 可儲存成績並出現在排行榜上！
            </div>
          )}
        </motion.div>

        {/* 隱藏的分享卡片 */}
        <div style={{ position: 'fixed', top: '-9999px', left: '0', width: '600px', pointerEvents: 'none', zIndex: -1 }}>
          <div ref={shareCardRef} style={{ width: '600px', padding: '48px', background: 'linear-gradient(135deg, #16140d 0%, #241a13 50%, #16140d 100%)', borderRadius: '24px', fontFamily: 'serif', border: '1px solid rgba(236,199,90,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '36px', height: '36px', background: '#ecc75a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>🧭</span>
              </div>
              <span style={{ color: '#ecc75a', fontSize: '18px', fontWeight: 'bold' }}>有趣的威士忌故事書</span>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '80px', fontWeight: '900', color: scoreColor, lineHeight: 1 }}>{result.score}%</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '8px' }}>{scoreLabel}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontSize: '28px', fontWeight: 'bold' }}>{result.correctCount}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>答對</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#f87171', fontSize: '28px', fontWeight: 'bold' }}>{result.total - result.correctCount}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>答錯</div>
              </div>
              {result.timeTaken && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '28px', fontWeight: 'bold' }}>{formatTime(result.timeTaken)}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>用時</div>
                </div>
              )}
            </div>
            {displayName && <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>by {displayName}</div>}
            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(236,199,90,0.15)', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>whiskystorybook.zachccy.workers.dev</div>
              <div style={{ color: 'rgba(236,199,90,0.4)', fontSize: '11px' }}>未滿18歲禁止飲酒</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('/exam/quiz?mode=random')}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-whisky-950 font-bold py-4 rounded-full hover:scale-105 transition-all">
            <RefreshCw className="w-5 h-5" /> 再來一次
          </button>
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-4 rounded-full hover:bg-white/20 transition-all">
            <Home className="w-5 h-5" /> 回首頁
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">題目解析</h2>
          {result.questions.map((q, idx) => {
            const isCorrect = q.userSelection === q.correctAnswer;
            const isExpanded = expandedIndices.includes(idx);
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                className={cn("glass-card overflow-hidden", isCorrect ? "border-green-500/20" : "border-red-500/20")}>
                <button className="w-full p-6 text-left flex items-start gap-4"
                  onClick={() => setExpandedIndices(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}>
                  {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <span className="text-[11px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded">{q.module}</span>
                      <span className="text-[11px] bg-white/5 text-white/40 px-2 py-0.5 rounded">{q.keyword}</span>
                    </div>
                    <p className="font-medium text-sm leading-relaxed">{q.question}</p>
                    {!isCorrect && <div className="mt-2 text-xs text-red-400">你的答案：{q.userSelection}. {q.options[q.userSelection as keyof typeof q.options]}</div>}
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-white/40 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 border-t border-white/5 space-y-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                      <p className="text-xs text-green-400 font-bold mb-1">正確答案</p>
                      <p className="text-sm">{q.correctAnswer}. {q.options[q.correctAnswer]}</p>
                    </div>
                    {q.explanation && (
                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                        <p className="text-xs text-amber-500 font-bold mb-1">解析</p>
                        <p className="text-sm text-white/70">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
