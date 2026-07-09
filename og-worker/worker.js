/**
 * Cloudflare Worker — 動態 OG Tag 注入
 * 架構：Worker 直接回傳帶 OG tag 的 HTML，讓瀏覽器載入 Pages 的 JS
 * 支援：
 *   /exam/result?score=85&correct=17&total=20  → 考試結果 OG
 *   /blog/mouse/:slug                           → Blog 文章 OG
 */

const SUPABASE_URL = 'https://mhzhfwafwlzrxjcpwdsn.supabase.co';
const PAGES_URL = 'https://whiskystorybook-521.pages.dev';
const SITE_NAME = '有趣的威士忌故事書';
const DEFAULT_OG_IMAGE = `${PAGES_URL}/og-default.png`;

// 徽章資料（與 src/pages/Profile.tsx 的 ALL_BADGES 保持同步）
const ALL_BADGES = {
  'clan-explorer':       { name: '氏族探險家',     image: '/badges/clan_explorer.png',      hint: '完成蘇格蘭單元複習' },
  'scotland-the-brave':  { name: '蘇格蘭勇士',     image: '/badges/scotlandthebrave.png',   hint: '蘇格蘭單元100分' },
  'bourbon-trailblazer': { name: '波本開拓者',     image: '/badges/bourbontrailblazer.png', hint: '完成美國單元複習' },
  'bourbon-sheriff':     { name: '波本警長',       image: '/badges/bourbonsheriff.png',     hint: '美國單元100分' },
  'emerald-isle-rover':  { name: '翡翠島漫遊者',   image: '/badges/emeraldislerover.png',   hint: '完成愛爾蘭單元複習' },
  'celtic-warrior':      { name: '凱爾特戰士',     image: '/badges/celticwarrior.png',      hint: '愛爾蘭單元100分' },
  'seeker-of-spirits':   { name: '烈酒探索者',     image: '/badges/seekerofspirits.png',    hint: '完成歐盟單元複習' },
  'whisky-alchemist':    { name: '威士忌煉金術師', image: '/badges/whiskyalchemist.png',    hint: '歐盟單元100分' },
  'ashigaru-of-whisky':  { name: '威士忌足輕',     image: '/badges/ashigaruofwhisky.png',   hint: '完成日本單元複習' },
  'whisky-samurai':      { name: '威士忌武士',     image: '/badges/whiskysamurai.png',      hint: '日本單元100分' },
  'maple-wanderer':      { name: '楓葉漫遊者',     image: '/badges/maplewanderer.png',      hint: '完成加拿大單元複習' },
  'canadian-mountie':    { name: '加拿大騎警',     image: '/badges/canadianmountie.png',    hint: '加拿大單元100分' },
};

// 爬蟲 User-Agent 判斷
function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    ua.includes('facebookexternalhit') ||
    ua.includes('twitterbot') ||
    ua.includes('linkedinbot') ||
    ua.includes('whatsapp') ||
    ua.includes('telegrambot') ||
    ua.includes('slackbot') ||
    ua.includes('discordbot') ||
    ua.includes('line-poker') ||
    ua.includes('applebot') ||
    ua.includes('googlebot') ||
    ua.includes('bingbot') ||
    ua.includes('crawler') ||
    ua.includes('spider') ||
    ua.includes('bot/')
  );
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 產生帶 OG tag 的完整 HTML（讓瀏覽器繼續載入 Pages 的 JS bundle）
function buildOGHtml(tags, canonicalUrl) {
  return `<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeAttr(tags.title)}</title>
    <meta name="description" content="${escapeAttr(tags.description)}" />
    <meta property="og:title" content="${escapeAttr(tags.title)}" />
    <meta property="og:description" content="${escapeAttr(tags.description)}" />
    <meta property="og:image" content="${escapeAttr(tags.image)}" />
    <meta property="og:url" content="${escapeAttr(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(tags.title)}" />
    <meta name="twitter:description" content="${escapeAttr(tags.description)}" />
    <meta name="twitter:image" content="${escapeAttr(tags.image)}" />
  </head>
  <body>
    <div id="root"></div>
    <!-- 載入 Pages 的 JS bundle，讓 React app 正常運作 -->
    <script>
      // 重導向到 Pages，讓使用者看到正常的 SPA
      if (typeof window !== 'undefined') {
        window.location.replace('${PAGES_URL}' + window.location.pathname + window.location.search);
      }
    </script>
  </body>
</html>`;
}

// 考試結果 OG
function buildExamOGTags(searchParams) {
  const score = searchParams.get('score');
  const correct = searchParams.get('correct');
  const total = searchParams.get('total');

  if (score) {
    const s = parseInt(score);
    const label = s >= 80 ? '優秀！' : s >= 60 ? '良好' : '繼續加油';
    return {
      title: `我在威士忌知識測驗中獲得了 ${score}%！${label} — ${SITE_NAME}`,
      description: correct && total
        ? `答對 ${correct} 題，共 ${total} 題。快來挑戰你的威士忌知識！`
        : '快來測試你的威士忌知識！',
      image: DEFAULT_OG_IMAGE,
    };
  }
  return {
    title: `威士忌知識測驗 — ${SITE_NAME}`,
    description: '測試你對威士忌的了解，挑戰你的知識極限！',
    image: DEFAULT_OG_IMAGE,
  };
}

// 徽章分享 OG
function buildBadgeOGTags(badgeId) {
  const badge = ALL_BADGES[badgeId];
  if (!badge) {
    return {
      title: `威士忌知識徽章 — ${SITE_NAME}`,
      description: '收集徽章，挑戰你的威士忌知識！',
      image: DEFAULT_OG_IMAGE,
    };
  }
  return {
    title: `我獲得了「${badge.name}」徽章！— ${SITE_NAME}`,
    description: `${badge.hint}。快來挑戰你的威士忌知識，收集屬於你的徽章！`,
    image: `${PAGES_URL}${badge.image}`,
  };
}

// Blog 文章 OG（從 Supabase 撈）
async function buildBlogOGTags(slug, supabaseAnonKey) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=title,excerpt,cover_image&limit=1`,
      {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
      }
    );
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const posts = await res.json();
    const post = posts?.[0];
    if (!post) throw new Error('not found');
    return {
      title: `${post.title} — ${SITE_NAME}`,
      description: post.excerpt || '威士忌知識、產業觀點與品飲紀錄',
      image: post.cover_image || DEFAULT_OG_IMAGE,
    };
  } catch {
    return {
      title: `老鼠說 — ${SITE_NAME}`,
      description: '威士忌知識、產業觀點與品飲紀錄',
      image: DEFAULT_OG_IMAGE,
    };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const pathname = url.pathname;

    // 一般使用者：直接 302 到 Pages
    if (!isCrawler(userAgent)) {
      return Response.redirect(PAGES_URL + pathname + url.search, 302);
    }

    // 爬蟲：判斷頁面類型，組 OG tag
    let ogTags = null;

    if (pathname === '/exam/result') {
      ogTags = buildExamOGTags(url.searchParams);
    }

    if (pathname === '/badge/share') {
      ogTags = buildBadgeOGTags(url.searchParams.get('id'));
    }

    const blogMatch = pathname.match(/^\/blog\/mouse\/([^/]+)$/);
    if (blogMatch) {
      ogTags = await buildBlogOGTags(blogMatch[1], env.SUPABASE_ANON_KEY);
    }

    // 不支援的頁面，302 到 Pages
    if (!ogTags) {
      return Response.redirect(PAGES_URL + pathname + url.search, 302);
    }

    // 組 canonical URL（指向 Pages，讓使用者點連結時進到正確網址）
    const canonicalUrl = PAGES_URL + pathname + url.search;
    const html = buildOGHtml(ogTags, canonicalUrl);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'X-OG-Injected': 'true',
      },
    });
  },
};
