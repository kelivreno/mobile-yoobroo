import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://fvgjtarygiabswefhgdu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2p0YXJ5Z2lhYnN3ZWZoZ2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzMwMDEsImV4cCI6MjA2MjQwOTAwMX0.zlA47R-sWbM1Y616s56aEEwN_w2WSt18qGqEz4_bUAI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 