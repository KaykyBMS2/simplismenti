// pages/auth/verify.tsx
'use client';

import { useVerifyEmailAddress } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function VerifyEmailPage() {
  const { verifyEmailAddress } = useVerifyEmailAddress();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await verifyEmailAddress(otp);
      router.push('/auth/sign-in');  // Redireciona para a página de login
    } catch (err: any) {
      setError('Código de verificação inválido');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Verificação de Email</h1>
        <form className="space-y-4" onSubmit={handleVerify}>
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
              Código de Verificação
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Verificar Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}