import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kslildlatomuctqsltnc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzbGlsZGxhdG9tdWN0cXNsdG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNzc4OTUsImV4cCI6MjA1NDg1Mzg5NX0.MRenXQ3Xdb4m8vaosyggpTu6plZQxbgamsfwcbWAudk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
