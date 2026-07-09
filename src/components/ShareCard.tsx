// 分享卡片元件 - 用於截圖分享
import { forwardRef } from 'react';
import { Trophy, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface ShareCardProps {
  score: number;
  correctCount: number;
  total: number;
  timeTaken?: number;
  userName?: string;
  type?: 'exam' | 'badge';
  badgeName?: string;
  badgeImage?: string;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ score, correctCount, total, timeTaken, userName, type = 'exam', badgeName, badgeImage }, ref) => {
    const scoreColor = score >= 80 ? '#4ade80' : score >= 60 ? '#ecc75a' : '#f87171';
    const scoreLabel = score === 100 ? '完美！' : score >= 80 ? '優秀！' : score >= 60 ? '良好' : '繼續加油';

    const formatTime = (s?: number) => {
      if (!s) return '';
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
    };

    return (
      <div
        ref={ref}
        style={{
          width: '600px',
          background: 'linear-gradient(135deg, #16140d 0%, #241a13 50%, #16140d 100%)',
          borderRadius: '24px',
          padding: '48px',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(236,199,90,0.3)',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(236,199,90,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '36px', height: '36px', background: '#ecc75a',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '20px' }}>🧭</span>
          </div>
          <span style={{ color: '#ecc75a', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            有趣的威士忌故事書
          </span>
        </div>

        {type === 'badge' && badgeImage ? (
          // Badge card
          <div style={{ textAlign: 'center' }}>
            <img src={badgeImage} alt={badgeName} style={{ width: '140px', height: '140px', objectFit: 'contain', margin: '0 auto 20px' }} />
            <div style={{ color: '#ecc75a', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{badgeName}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>威士忌知識徽章</div>
            {userName && <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '8px' }}>by {userName}</div>}
          </div>
        ) : (
          // Exam result card
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Trophy style={{ color: '#ecc75a', width: '48px', height: '48px', margin: '0 auto 16px' }} />
              <div style={{ fontSize: '80px', fontWeight: '900', color: scoreColor, lineHeight: 1 }}>{score}%</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '8px' }}>{scoreLabel}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontSize: '28px', fontWeight: 'bold' }}>{correctCount}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>答對</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#f87171', fontSize: '28px', fontWeight: 'bold' }}>{total - correctCount}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>答錯</div>
              </div>
              {timeTaken && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '28px', fontWeight: 'bold' }}>{formatTime(timeTaken)}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>用時</div>
                </div>
              )}
            </div>

            {userName && (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>by {userName}</div>
            )}
          </>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '32px', paddingTop: '20px',
          borderTop: '1px solid rgba(236,199,90,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>whiskystorybook.zachccy.workers.dev</div>
          <div style={{ color: 'rgba(236,199,90,0.4)', fontSize: '11px' }}>未滿18歲禁止飲酒</div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';

// ── Share Buttons ─────────────────────────────────────────────────────────────

interface ShareButtonsProps {
  onDownload: () => void;
  onShare: (platform: string) => void;
  isGenerating: boolean;
  shareUrl?: string;
  shareText?: string;
}

export function ShareButtons({ onDownload, onShare, isGenerating, shareUrl, shareText }: ShareButtonsProps) {
  const url = encodeURIComponent(shareUrl || 'https://whiskystorybook.zachccy.workers.dev');
  const text = encodeURIComponent(shareText || '我在「有趣的威士忌故事書」完成了威士忌知識測驗！');

  const platforms = [
    { name: 'Facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'X', icon: '𝕏', url: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { name: 'Threads', icon: '🧵', url: `https://www.threads.net/intent/post?text=${text}%20${url}` },
    { name: 'Instagram', icon: '📷', url: null }, // IG can't share URLs directly — download instead
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {platforms.map(p => (
        p.url ? (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/10 transition-all hover:scale-105"
          >
            <span>{p.icon}</span> {p.name}
          </a>
        ) : (
          <button
            key={p.name}
            onClick={() => onShare(p.name)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/10 transition-all hover:scale-105"
          >
            <span>{p.icon}</span> {p.name}
          </button>
        )
      ))}
      <button
        onClick={onDownload}
        disabled={isGenerating}
        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-whisky-950 text-sm font-bold rounded-full transition-all hover:scale-105 disabled:opacity-50"
      >
        {isGenerating ? '⏳' : '⬇️'} 下載圖片
      </button>
    </div>
  );
}
