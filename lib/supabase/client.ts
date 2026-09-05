// Lightweight shim for Supabase client to allow UI-only mode when Supabase isn't configured.
// This avoids runtime errors during development when the real client or env vars are not present.

type SupabaseResult<T> = Promise<{ data: T | null; error: Error | null }>;

class Query<T = any> {
  // allow chaining
  then: any;
  catch: any;
  finally: any;

  constructor(private _data: T | null = null) {
    const p = Promise.resolve({ data: this._data, error: null });
    this.then = p.then.bind(p);
    this.catch = p.catch.bind(p);
    this.finally = p.finally.bind(p);
  }

  select(_cols?: string) {
    return this as unknown as Query<T[]>;
  }

  order(_col: string, _opts?: any) {
    return this;
  }

  eq(_col: string, _val: any) {
    return this;
  }

  insert(_payload: any) {
    return new Query<null>(null);
  }

  update(_payload: any) {
    return new Query<null>(null);
  }

  delete() {
    return new Query<null>(null);
  }

  // fulfill Promise interface
  [Symbol.toStringTag] = 'Query';
}

function from(_table: string) {
  return new Query<any[]>([]);
}

export const supabase: any = {
  from,
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe() {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signOut: async () => ({}),
  },
};

export default supabase;
