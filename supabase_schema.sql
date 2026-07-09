-- ============================================================
-- 老鼠的威士忌故事書 - Supabase 資料庫結構
-- 在 Supabase Dashboard > SQL Editor 貼上並執行
-- ============================================================

-- 1. 用戶公開資料表
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 用戶統計資料表
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  best_monthly_scores JSONB DEFAULT '[]',
  monthly_average NUMERIC DEFAULT 0,
  total_exams_this_month INTEGER DEFAULT 0,
  total_score_this_month NUMERIC DEFAULT 0,
  last_month INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 考試成績表（排行榜用）
CREATE TABLE IF NOT EXISTS exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  score NUMERIC NOT NULL,
  total INTEGER NOT NULL,
  time_taken INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 錯題本
CREATE TABLE IF NOT EXISTS user_mistakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  question_data JSONB NOT NULL,
  fail_count INTEGER DEFAULT 1,
  last_failed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- 5. 學習進度（看過的題目）
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  seen_ids JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 徽章
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ============================================================
-- Row Level Security (RLS) 安全設定
-- ============================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- user_profiles: 自己可讀寫，排行榜可讀 display_name
CREATE POLICY "Users can manage their own profile"
  ON user_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Anyone can read display names"
  ON user_profiles FOR SELECT USING (true);

-- user_stats: 只有本人可讀寫
CREATE POLICY "Users can manage their own stats"
  ON user_stats FOR ALL USING (auth.uid() = user_id);

-- exam_results: 自己可讀寫，所有人可讀（排行榜）
CREATE POLICY "Anyone can read exam results"
  ON exam_results FOR SELECT USING (true);
CREATE POLICY "Users can insert their own results"
  ON exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_mistakes: 只有本人可讀寫
CREATE POLICY "Users can manage their own mistakes"
  ON user_mistakes FOR ALL USING (auth.uid() = user_id);

-- user_progress: 只有本人可讀寫
CREATE POLICY "Users can manage their own progress"
  ON user_progress FOR ALL USING (auth.uid() = user_id);

-- user_badges: 自己可讀，系統可寫（透過 service role 或本人）
CREATE POLICY "Users can read their own badges"
  ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can receive badges"
  ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 7. Email 查詢 RPC（作者管理頁面用）
-- user_roles 表和它的 RLS 政策（Users can read own role /
-- Admin can manage roles）早就建立過了，不需要再動。
-- 這裡只補兩件事：email 欄位、get_user_by_email 函式。
-- 這段 SQL 可以重複執行，不會破壞現有的表/政策。
-- ============================================================

-- user_roles 建表時沒加 email 欄位，這裡補上
ALTER TABLE user_roles ADD COLUMN IF NOT EXISTS email TEXT;

-- 依 Email 查詢 user_id（僅管理員可用，供作者管理頁面新增作者時使用）
CREATE OR REPLACE FUNCTION get_user_by_email(email TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result UUID;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION '權限不足，僅管理員可查詢';
  END IF;

  SELECT id INTO result FROM auth.users WHERE auth.users.email = get_user_by_email.email LIMIT 1;
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_user_by_email(TEXT) TO authenticated;

-- ============================================================
-- 完成！回到 Authentication 啟用 Email 和 Google 登入
-- ============================================================
