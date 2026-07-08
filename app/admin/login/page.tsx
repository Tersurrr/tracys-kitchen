'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LockKeyhole } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Welcome back');
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-6">
      <form onSubmit={handleSubmit} className="glass-card w-full space-y-5 p-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient">
            <LockKeyhole className="h-5 w-5 text-charcoal" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold">Admin Login</h1>
            <p className="text-xs text-white/50">Tracy&apos;s Kitchen Dashboard</p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
