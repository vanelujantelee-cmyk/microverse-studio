import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xiigevcbpauucndfzcej.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpaWdldmNicGF1dWNuZGZ6Y2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxODQ5OTQsImV4cCI6MjA5MDc2MDk5NH0.F5TWr1qQmxdopcrqmmBmplFm9ImuzeFjoBZD6TNCse0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)