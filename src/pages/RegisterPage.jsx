import React from 'react';
import { ArrowRight, Lock, Mail, UserRound } from 'lucide-react';

export default function RegisterPage({ setCurrentPage }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(94,53,177,0.12),_transparent_35%),linear-gradient(135deg,_#f8f7ff_0%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-gray-100 bg-white p-8 shadow-[0_20px_70px_rgba(94,53,177,0.16)] sm:p-10 lg:p-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5e35b1]">Create Account</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">Register your account</h2>
            <p className="mt-2 text-sm text-gray-500">Fill in your details to get started.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <UserRound size={18} className="mr-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Middle Name</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <UserRound size={18} className="mr-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter middle name"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <UserRound size={18} className="mr-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Contact Number</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <UserRound size={18} className="mr-3 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Enter contact number"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <Mail size={18} className="mr-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter email address"
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
                  placeholder="Create password"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-[#5e35b1] focus-within:bg-white">
                <Lock size={18} className="mr-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5e35b1] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5e35b1]/20 transition hover:bg-[#4a148c]"
            onClick={() => setCurrentPage('login')}
          >
            Create Account
            <ArrowRight size={16} />
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button
              className="font-semibold text-[#5e35b1] transition hover:text-[#4a148c]"
              onClick={() => setCurrentPage('login')}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
