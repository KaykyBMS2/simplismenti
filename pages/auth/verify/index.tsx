'use client';

import { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignInLoaded && !isSignUpLoaded) return;

    try {
      if (signIn && signIn.firstFactorVerification) {
        await signIn.attemptFirstFactor({ code: otpCode });
      } else if (signUp && signUp.verifications.emailAddress) {
        await signUp.attemptEmailAddressVerification({ code: otpCode });
      }
      router.push('/'); // Redireciona para a home após sucesso
    } catch (err: any) {
      setError('Código inválido ou expirado. Tente novamente.');
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center bg-gray-900">
      <div className="text-center">
        <img src="/spm_white.svg" alt="SPM logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-2xl font-bold text-gray-100">Verifique seu Código</h2>
        <p className="mt-2 text-sm text-gray-400">
          Insira o código enviado para o seu email para continuar.
        </p>
      </div>

      <div className="w-full max-w-sm mt-8">
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <form onSubmit={handleOTPSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-100">
              Código OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
              className="block w-full rounded-md bg-gray-800 px-3 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
            >
              Verificar
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não recebeu o código?{' '}
          <a href="/auth/resend-code" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Reenviar Código
          </a>
        </p>
      </div>
    </div>
  );
}