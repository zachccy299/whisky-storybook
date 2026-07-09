import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 缺少 Supabase 設定！請複製 .env.example 為 .env 並填入你的 Supabase URL 和 Key。');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
