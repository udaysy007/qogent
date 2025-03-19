import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import type { CookieStore } from 'next/dist/compiled/@edge-runtime/cookies'

export function createServerClient(cookieStore: CookieStore) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number }) {
        try {
          cookieStore.set(name, value, options)
        } catch (error) {
          // Handle cookie setting error
        }
      },
      remove(name: string, options: { path: string }) {
        try {
          cookieStore.delete(name, options)
        } catch (error) {
          // Handle cookie removal error
        }
      },
    },
  })
} 