import React from 'react';
import { ArrowRight, Lock, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import logoSrc from '../assets/vendtrack-logo.png';

export default function LoginPage({ setCurrentPage }) {
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
                <img src={logoSrc} alt="VendTrack" className="h-16 w-16 object-contain" />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">VendTrack</h1>
                  <p className="text-sm text-white/80">Fast, polished checkout for modern stores.</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/20 p-2">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Secure Sign-in</p>
                    <p className="text-sm text-white/75">Protect staff accounts with role-based access.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80 backdrop-blur">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Inventory Management</p>
                <p className="leading-tight">Track stock automatically after every sale.</p>
              </div>
            </div>

            <div className="relative z-10 mt-3 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80 backdrop-blur">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Fast Checkout</p>
                <p className="leading-tight">Process customer purchases in seconds.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5e35b1]">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">Sign in to VendTrack</h2>
              <p className="mt-2 text-sm text-gray-500">Access your dashboard and continue serving customers.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Username / Email</label>
                <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                  <UserRound size={18} className="mr-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            <button
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5e35b1] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5e35b1]/20 transition hover:bg-[#4a148c]"
              onClick={() => setCurrentPage('transaction')}
            >
              Sign In
              <ArrowRight size={16} />
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <button
                className="font-semibold text-[#5e35b1] transition hover:text-[#4a148c]"
                onClick={() => setCurrentPage('register')}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}