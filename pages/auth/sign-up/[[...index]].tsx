'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification();
      setSuccess(true);
    } catch (err: any) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center bg-gray-900">
      <div className="text-center">
        <img src="/spm_white.svg" alt="SPM logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-2xl font-bold text-gray-100">Crie sua conta!</h2>
      </div>

      <div className="w-full max-w-sm mt-8">
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-sm text-green-500 text-center">
            Verifique seu email para concluir o registro.
          </p>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-gray-800 px-3 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-gray-800 px-3 py-2 text-gray-100 border border-gray-600 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
              >
                Criar Conta
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem uma conta?{' '}
          <a href="/auth/sign-in" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}