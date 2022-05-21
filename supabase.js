import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://vdmylnxrkgtjxfwxmjsh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbXlsbnhya2d0anhmd3htanNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MjUxOTg4OSwiZXhwIjoxOTY4MDk1ODg5fQ.njUwNleu2UDsWg-H_JhPxfCnMm7b-LAeom4HolypLDk"


export const supabase = createClient(supabaseUrl, supabaseKey);