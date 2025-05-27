import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
}

interface AuthState {
  isAuthenticated: boolean
  profile: Profile | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (profile: Partial<Profile>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  profile: null,
  login: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .single()

    set({ isAuthenticated: true, profile })
  },
  signup: async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    set({ isAuthenticated: true })
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ isAuthenticated: false, profile: null })
  },
  updateProfile: async (profile: Partial<Profile>) => {
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', profile.id)
    if (error) throw error

    set((state) => ({
      profile: state.profile ? { ...state.profile, ...profile } : null
    }))
  },
}))