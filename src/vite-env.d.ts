/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  /** Publishable key (Supabase dashboard) o legacy anon key */
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
