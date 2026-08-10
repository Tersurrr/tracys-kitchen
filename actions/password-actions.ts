'use server';

import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  error?: string;
};

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null, error: 'Admin session required. Please sign in again.' };
  }

  return { supabase, user, error: null };
}

function validatePassword(password: string) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

export async function changeCurrentAdminPassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ActionResult> {
  const { supabase, user, error: authError } = await requireAdmin();
  if (authError || !user) return { success: false, error: authError };

  const currentPassword = payload.currentPassword.trim();
  const newPassword = payload.newPassword.trim();
  const passwordError = validatePassword(newPassword);

  if (!currentPassword) return { success: false, error: 'Current password is required.' };
  if (passwordError) return { success: false, error: passwordError };
  if (!user.email) return { success: false, error: 'Your account is missing an email address.' };

  const verifier = createSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { success: false, error: error.message };

  return { success: true };
}
