import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export function useSupabase() {
  const [client] = useState<SupabaseClient>(supabase)

  return {
    client,
    supabase
  }
} 