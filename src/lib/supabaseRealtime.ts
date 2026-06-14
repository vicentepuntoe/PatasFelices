import { createClient, type RealtimeChannel } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export function isSupabaseRealtimeConfigured() {
  return Boolean(url && anonKey)
}

export function subscribeToDonationInserts(onInsert: () => void): (() => void) | null {
  if (!url || !anonKey) return null

  const supabase = createClient(url, anonKey)
  let channel: RealtimeChannel | null = null

  channel = supabase
    .channel('public:donations')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'donations' },
      () => {
        onInsert()
      },
    )
    .subscribe()

  return () => {
    if (channel) void supabase.removeChannel(channel)
  }
}
