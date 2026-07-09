import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // 自動跳回首頁
    const timer = setTimeout(() => navigate('/'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen pt-32 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-6">🥃</div>
        <h1 className="text-3xl font-serif font-bold mb-3">頁面不存在</h1>
        <p className="text-white/40">正在返回首頁...</p>
      </div>
    </div>
  );
}
