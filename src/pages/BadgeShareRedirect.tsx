import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// 一般使用者點到 /badge/share?id=xxx 時，直接轉回 Profile 頁面。
// 爬蟲（FB/X/Line）則由 Cloudflare Worker 在邊緣層攔截，回傳動態 OG tag，不會跑到這個頁面。
export function BadgeShareRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get('id');
    navigate(id ? `/profile?badge=${id}` : '/profile', { replace: true });
  }, [searchParams, navigate]);

  return null;
}
