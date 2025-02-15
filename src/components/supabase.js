import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://faiazfxjttaneysewzlk.supabase.co"; // 🔹 Replace with your Supabase URL
const supabaseAnonKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaWF6ZnhqdHRhbmV5c2V3emxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjY4MzMsImV4cCI6MjA1NDk0MjgzM30.feyJVrbTEuDHIf8A6iSxhpbszeMtiC_DsUwV2XGJuHQ"; // 🔹 Replace with your Supabase Anon Key

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
