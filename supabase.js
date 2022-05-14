import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://vdmylnxrkgtjxfwxmjsh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbXlsbnhya2d0anhmd3htanNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MjUxNjUwNiwiZXhwIjoxOTY4MDkyNTA2fQ.Uqt4qjG_LQBLdCwvVVWtQulIYHlpClMttETw2O7UZ6I"


export const supabase = createClient(supabaseUrl, supabaseKey);