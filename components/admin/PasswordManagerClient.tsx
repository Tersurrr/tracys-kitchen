'use client';

import { useState } from 'react';
import { KeyRound, ShieldCheck, UserRoundPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  changeCurrentAdminPassword,
  setStaffPassword,
} from '@/actions/password-actions';

export default function PasswordManagerClient() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPasswordValue] = useState('');
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [savingStaff, setSavingStaff] = useState(false);

  const handleAdminPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingAdmin(true);
    const result = await changeCurrentAdminPassword({
      currentPassword,
      newPassword: newAdminPassword,
    });
    setSavingAdmin(false);

    if (!result.success) {
      toast.error(result.error ?? 'Password update failed');
      return;
    }

    toast.success('Admin password updated');
    setCurrentPassword('');
    setNewAdminPassword('');
  };

  const handleStaffPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingStaff(true);
    const result = await setStaffPassword({
      name: staffName,
      email: staffEmail,
      password: staffPassword,
    });
    setSavingStaff(false);

    if (!result.success) {
      toast.error(result.error ?? 'Staff password update failed');
      return;
    }

    toast.success('Staff password saved');
    setStaffName('');
    setStaffEmail('');
    setStaffPasswordValue('');
  };

  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-2xl font-semibold sm:mb-8">Passwords</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <form onSubmit={handleAdminPassword} className="glass-card space-y-5 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient">
              <ShieldCheck className="h-5 w-5 text-charcoal" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold">Admin Password</h2>
              <p className="text-xs text-white/50">Change the password for this account.</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Current password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              New password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newAdminPassword}
              onChange={(event) => setNewAdminPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <button type="submit" disabled={savingAdmin} className="btn-primary w-full disabled:opacity-60">
            <KeyRound className="h-4 w-4" />
            {savingAdmin ? 'Updating...' : 'Change Password'}
          </button>
        </form>

        <form onSubmit={handleStaffPassword} className="glass-card space-y-5 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold-gradient">
              <UserRoundPlus className="h-5 w-5 text-charcoal" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold">Staff Password</h2>
              <p className="text-xs text-white/50">Create or reset a staff login.</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Staff name
            </label>
            <input
              value={staffName}
              onChange={(event) => setStaffName(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Staff email
            </label>
            <input
              type="email"
              required
              value={staffEmail}
              onChange={(event) => setStaffEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Staff password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={staffPassword}
              onChange={(event) => setStaffPasswordValue(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <button type="submit" disabled={savingStaff} className="btn-primary w-full disabled:opacity-60">
            <UserRoundPlus className="h-4 w-4" />
            {savingStaff ? 'Saving...' : 'Save Staff Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
