import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, GraduationCap, Gavel, Cog, Home as HomeIcon, ChevronDown, Trophy, User, Hammer, LogOut, Flag, Facebook, Instagram, Twitter, MessageCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import { NAV_ITEMS } from '../constants';

export function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
  const photoUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-whisky-950/80 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="hidden md:flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
              <Compass className="text-whisky-950 w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-amber-500">有趣的威士忌故事書</span>
          </Link>

          <div className="relative md:hidden">
            <button onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen); }} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Compass className="text-whisky-950 w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-amber-500 flex items-center gap-1">
                有趣的威士忌故事書
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileMenuOpen && "rotate-180")} />
              </span>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-3 w-64 bg-whisky-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 z-[100]"
                >
                  <div className="px-3 py-2 text-[11px] font-black text-amber-500/50 uppercase tracking-widest border-b border-white/5 mb-1.5">快速導覽</div>
                  {[...NAV_ITEMS, { name: '返回首頁', path: '/', icon: HomeIcon }].map((menuItem: any) => {
                    const itemClassName = cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all active:scale-95",
                      location.pathname === menuItem.path || (menuItem.path !== '/' && location.pathname.startsWith(menuItem.path))
                        ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                        : "text-white/70 hover:text-amber-500 hover:bg-white/5"
                    );
                    const iconWrapClassName = cn("w-8 h-8 rounded-lg flex items-center justify-center", location.pathname === menuItem.path ? "bg-amber-500/20" : "bg-white/5");
                    return menuItem.external ? (
                      <a key={menuItem.path} href={menuItem.path} target="_blank" rel="noopener noreferrer" className={itemClassName} onClick={() => setIsMobileMenuOpen(false)}>
                        <div className={iconWrapClassName}>
                          <menuItem.icon className="w-4 h-4" />
                        </div>
                        {menuItem.name}
                      </a>
                    ) : (
                      <Link key={menuItem.path} to={menuItem.path} className={itemClassName} onClick={() => setIsMobileMenuOpen(false)}>
                        <div className={iconWrapClassName}>
                          <menuItem.icon className="w-4 h-4" />
                        </div>
                        {menuItem.name}
                      </Link>
                    );
                  })}
                  <a
                    href="https://funnydistillery.com/"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all active:scale-95 text-white/70 hover:text-amber-500 hover:bg-white/5 border-t border-white/5 mt-1.5 pt-3"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    回到官網
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = !item.external && (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)));
            const topLinkClassName = cn("flex items-center gap-1 text-sm font-medium transition-colors hover:text-amber-400 py-2", isActive ? "text-amber-500" : "text-white/60");
            return (
              <div
                key={item.path}
                className="relative h-16 flex items-center"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                {item.external ? (
                  <a href={item.path} target="_blank" rel="noopener noreferrer" className={topLinkClassName}>
                    {item.name}
                    {item.dropdown && <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === item.name && "rotate-180")} />}
                  </a>
                ) : (
                  <Link to={item.path} className={topLinkClassName}>
                    {item.name}
                    {item.dropdown && <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === item.name && "rotate-180")} />}
                    {isActive && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                    )}
                  </Link>
                )}
                <AnimatePresence>
                  {activeDropdown === item.name && item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-48 bg-whisky-900 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl p-1"
                    >
                      {item.dropdown.map((subItem) => (
                        subItem.external ? (
                          <a key={subItem.name} href={subItem.path} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-xs font-medium text-white/60 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" onClick={() => setActiveDropdown(null)}>
                            {subItem.name}
                          </a>
                        ) : (
                          <Link key={subItem.name} to={subItem.path} className="block px-4 py-3 text-xs font-medium text-white/60 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" onClick={() => setActiveDropdown(null)}>
                            {subItem.name}
                          </Link>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://funnydistillery.com/"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-amber-500 transition-colors border border-white/10 hover:border-amber-500/30 rounded-full px-3 py-1.5"
          >
            <ExternalLink className="w-3 h-3" />
            回到官網
          </a>
          <div
            className="h-16 flex items-center relative"
            onMouseEnter={() => user && handleMouseEnter('profile')}
            onMouseLeave={() => handleMouseLeave()}
          >
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-white/5 hover:bg-amber-500/10 p-1 pr-4 rounded-full border border-white/10 transition-all cursor-pointer">
                  {photoUrl ? (
                    <img src={photoUrl} alt={displayName} className="w-8 h-8 rounded-full border border-amber-500/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-amber-500/20 flex items-center justify-center bg-white/5">
                      <User className="w-4 h-4 text-amber-500/50" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-white/60 hidden lg:block">{displayName}</span>
                  <ChevronDown className="w-3 h-3 text-white/40" />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'profile' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 w-48 bg-whisky-900 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl p-1 mt-[-8px]"
                    >
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-xs font-medium text-white/60 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" onClick={() => setActiveDropdown(null)}>
                        <User className="w-4 h-4" /> 個人內容
                      </Link>
                      {isAdmin && (
                        <Link to="/admin/messages" className="flex items-center gap-2 px-4 py-3 text-xs font-medium text-white/60 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" onClick={() => setActiveDropdown(null)}>
                          <MessageSquare className="w-4 h-4" /> 留言管理
                        </Link>
                      )}
                      <button
                        onClick={() => { signOut(); setActiveDropdown(null); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" /> 登出
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">登錄</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const shareText = encodeURIComponent("有趣的威士忌故事書 - 深入淺出解鎖生命之水的奧秘");

  const sharePlatforms = [
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: 'Instagram', icon: Instagram, url: `https://www.instagram.com/` },
    { name: 'X', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}` },
    { name: 'Threads', icon: MessageCircle, url: `https://www.threads.net/intent/post?text=${shareText}%20${shareUrl}` },
  ];

  return (
    <footer className="bg-whisky-900 border-t border-amber-500/10 mt-20">
      <div className="max-w-7xl mx-auto pt-12 pb-24 md:pb-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-amber-500">有趣的威士忌故事書</h3>
            <p className="text-white/40 text-sm max-w-md">致力於威士忌知識的推廣。從法規、風土、歷史到製程，深入淺出地解鎖生命之水的奧秘</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs font-bold text-amber-500/50 uppercase tracking-widest">分享至：</span>
              <div className="flex items-center gap-3">
                {sharePlatforms.map((platform, idx) => (
                  <a key={idx} href={platform.url} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all group"
                    title={`分享到 ${platform.name}`}>
                    <platform.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="text-right">
              <div className="text-white/20 text-xs italic mb-4">© 2026 有趣的威士忌故事書. Inspired by the golden light of Islay.</div>
              <div className="flex items-center gap-3">
                <a href="/message" className="inline-flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl hover:bg-amber-500/20 hover:border-amber-500/40 transition-all group text-left">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div>
                    <div className="font-bold text-amber-400 text-sm leading-tight">留言給老鼠</div>
                    <div className="text-[11px] text-amber-400/60 uppercase tracking-wider mt-0.5">Leave a message</div>
                  </div>
                </a>
                <a href="https://zachccy299.bobaboba.me" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 p-4 bg-[#AD5138]/10 border border-[#AD5138]/20 rounded-2xl hover:bg-[#AD5138]/20 hover:border-[#AD5138]/40 transition-all group text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#AD5138] flex items-center justify-center group-hover:scale-110 transition-transform p-1.5">
                    <img src="https://s3.ap-southeast-1.amazonaws.com/media.anyonelab.com/images/boba/boba-embed-icon.png" alt="boba-icon" className="h-full" />
                  </div>
                  <div>
                    <div className="font-bold text-[#F8E0BE] text-sm leading-tight">請我喝珍奶！</div>
                    <div className="text-[11px] text-[#F8E0BE]/60 uppercase tracking-wider mt-0.5">Support with Boba</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AlcoholWarning() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-white/10 py-4 px-4 z-[9999]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-white font-bold text-lg md:text-2xl lg:text-3xl tracking-[0.1em] md:tracking-[0.4em] uppercase">
          未滿18歲禁止飲酒！禁止酒駕
        </p>
      </div>
    </div>
  );
}
