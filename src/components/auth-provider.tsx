'use client';

import { createContext, useContext, ReactNode } from 'react';

// UI-only auth provider: no backend, no supabase. Exposes stubbed methods and state
interface AuthContextValue {
  user: { email?: string } | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: false,
  signIn: async () => ({ error: 'Auth disabled' }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // UI-only: don't perform any network/auth actions. Components can still render login UIs.
  const value: AuthContextValue = {
    user: null,
    session: null,
    loading: false,
    signIn: async () => ({ error: 'Auth disabled' }),
    signOut: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
