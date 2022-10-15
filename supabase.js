import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://vdmylnxrkgtjxfwxmjsh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbXlsbnhya2d0anhmd3htanNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MzEyNTU2NCwiZXhwIjoxOTY4NzAxNTY0fQ.bUDqIhs6TTfRSuik5zxqep6C0DCuYFKVJ7k7upOo9XM"


export const supabase = createClient(supabaseUrl, supabaseKey);