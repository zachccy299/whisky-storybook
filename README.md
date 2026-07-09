# 🥃 有趣的威士忌故事書

## 📋 部署步驟（從頭到尾，不需要會coding）

---

## 第一步：建立 Supabase 帳號與專案

1. 前往 [supabase.com](https://supabase.com) → 點「Start your project」
2. 用 GitHub 帳號登入（免費）
3. 點「New project」→ 填寫：
   - **Name**：whisky-story-book（隨便取）
   - **Database Password**：設一個你記得的密碼
   - **Region**：Northeast Asia (Tokyo)（最近台灣）
4. 等待約 1 分鐘建立完成

---

## 第二步：建立資料庫結構

1. 在 Supabase 左側選單點「**SQL Editor**」
2. 點「New query」
3. 把 `supabase_schema.sql` 檔案裡的所有內容複製貼上
4. 點「**Run**」→ 看到「Success」即完成

---

## 第三步：開啟登入功能

1. 左側選單點「**Authentication**」→「Providers」
2. **Email** 預設已開啟 ✅
3. 開啟 **Google**（可選）：
   - 去 [Google Cloud Console](https://console.cloud.google.com) 建立 OAuth 憑證
   - 把 Client ID 和 Secret 貼回 Supabase

---

## 第四步：取得 API 金鑰

1. 左側選單點「**Settings**」→「**API**」
2. 複製這兩個值：
   - **Project URL**（像是 `https://abcdefg.supabase.co`）
   - **anon public key**（很長的一串字）

---

## 第五步：設定環境變數

1. 把 `.env.example` 複製一份，改名為 `.env`
2. 填入剛才複製的兩個值：

```
VITE_SUPABASE_URL=https://你的專案id.supabase.co
VITE_SUPABASE_ANON_KEY=你的anon_key
```

---

## 第六步：部署到 Cloudflare Pages（免費）

1. 前往 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 連結你的 GitHub 帳號
3. 把這個專案推上 GitHub（或直接上傳 zip）
4. 在 Cloudflare Pages 設定：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 在「Environment variables」填入第五步的兩個變數
6. 點「Save and Deploy」→ 等待 1-2 分鐘

完成！你的網站就上線了 🎉

---

## 本機開發（選擇性）

```bash
npm install
cp .env.example .env
# 填入你的 Supabase 資訊
npm run dev
```

瀏覽器開啟 http://localhost:5173

---

## 管理資料

- **看成績**：Supabase Dashboard → Table Editor → exam_results
- **看用戶**：Authentication → Users
- **看排行榜資料**：Table Editor → exam_results（依 score 排序）
- **新增題目**：直接編輯 `src/data/questions.json`

---

## 費用說明

| 服務 | 免費額度 | 超過後 |
|------|----------|--------|
| Supabase | 每月 500MB DB + 50,000 用戶 | Pro $25/月 |
| Cloudflare Pages | 無限靜態 hosting | 永遠免費 |

一般教育網站規模完全在免費額度內！

---

## 技術架構

- **前端**：React + TypeScript + Tailwind CSS
- **路由**：React Router
- **資料庫**：Supabase (PostgreSQL)
- **登入**：Supabase Auth（Email / Google）
- **Hosting**：Cloudflare Pages
- **題目資料**：本機 JSON 檔（不需要 API）
