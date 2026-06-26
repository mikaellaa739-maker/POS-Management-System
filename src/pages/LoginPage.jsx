import { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import logoSrc from '../assets/OpistockLogo.png';
import { apiUrl } from '../lib/api';

export default function LoginPage({ setCurrentPage, setCurrentUser }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user);
        setCurrentPage('transaction');
      } else {
        setStatusMessage(data.message || 'Login failed.');
      }
    } catch {
      setStatusMessage('Unable to reach the server right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(94,53,177,0.12),_transparent_35%),linear-gradient(135deg,_#f8f7ff_0%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_20px_70px_rgba(94,53,177,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#5e35b1] via-[#6d4fc3] to-[#7c4dff] p-8 text-white sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_35%)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                <Sparkles size={16} /> POS Experience
              </div>

              <div className="mt-8 flex items-center gap-4">
                <img src={logoSrc} alt="OpiStock" className="h-16 w-16 object-contain" />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">OpiStock</h1>
                  <p className="text-sm text-white/80">Fast, polished checkout for modern stores.</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ['Secure Sign-in', 'Protect staff accounts with role-based access.'],
                  ['Inventory Management', 'Track stock automatically after every sale.'],
                  ['Fast Checkout', 'Process customer purchases in seconds.'],
                ].map(([title, description]) => (
                  <div key={title} className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80 backdrop-blur">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold leading-tight text-white">{title}</p>
                      <p className="mt-1 text-sm leading-tight text-white/75">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5e35b1]">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">Sign in to OpiStock</h2>
              <p className="mt-2 text-sm text-gray-500">Access your dashboard and continue serving customers.</p>
            </div>

            {statusMessage && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {statusMessage}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Employee ID / Email</label>
                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                  <UserRound size={18} className="mr-3 text-gray-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="Enter your employee ID or email"
                    className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                  <Lock size={18} className="mr-3 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5e35b1] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5e35b1]/20 transition hover:bg-[#4a148c] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#5e35b1]/20 bg-white px-4 py-3 text-sm font-semibold text-[#5e35b1] transition hover:border-[#5e35b1]/40 hover:bg-[#f8f7ff]"
                onClick={() => setCurrentPage('register')}
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Forgot your password?{' '}
              <button
                className="font-semibold text-[#5e35b1] transition hover:text-[#4a148c]"
                onClick={() => setCurrentPage('forgot-password')}
              >
                Recover account here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
