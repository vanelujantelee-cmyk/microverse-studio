import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dtjryretxhhjnysghtvs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0anJ5cmV0eGhoam55c2dodHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjgxMjMsImV4cCI6MjA5MzM0NDEyM30.g6eAl-S2mhycuG8Iv_0XmUmyPiA0quH0swVd1jukki0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
