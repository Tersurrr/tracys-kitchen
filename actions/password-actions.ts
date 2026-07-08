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

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return {
      admin: null,
      error: 'SUPABASE_SERVICE_ROLE_KEY is required to manage staff passwords.',
    };
  }

  return {
    admin: createSupabaseAdminClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }),
    error: null,
  };
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

export async function setStaffPassword(payload: {
  email: string;
  name?: string;
  password: string;
}): Promise<ActionResult> {
  const { user, error: authError } = await requireAdmin();
  if (authError || !user) return { success: false, error: authError };

  const email = payload.email.trim().toLowerCase();
  const name = payload.name?.trim();
  const password = payload.password.trim();
  const passwordError = validatePassword(password);

  if (!email) return { success: false, error: 'Staff email is required.' };
  if (passwordError) return { success: false, error: passwordError };

  const { admin, error: adminError } = getAdminClient();
  if (adminError || !admin) return { success: false, error: adminError };

  const { data: existingUsers, error: listError } = await admin.auth.admin.listUsers();
  if (listError) return { success: false, error: listError.message };

  const existingStaff = existingUsers.users.find((staffUser) => staffUser.email === email);

  if (existingStaff) {
    const { error } = await admin.auth.admin.updateUserById(existingStaff.id, {
      password,
      user_metadata: {
        ...existingStaff.user_metadata,
        ...(name ? { name } : {}),
        role: 'staff',
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      ...(name ? { name } : {}),
      role: 'staff',
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
