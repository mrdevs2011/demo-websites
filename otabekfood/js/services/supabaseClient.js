import { SUPABASE_CONFIG } from '../config/app.config.js';

export const supabaseClient = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);
