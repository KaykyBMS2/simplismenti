'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'needs_first_factor') {
        router.push('/auth/verify'); // Redireciona para OTP
      } else {
        router.push('/'); // Redireciona para a home
      }
    } catch (err: any) {
      setError('Credenciais inválidas. Verifique seu email e senha.');
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/auth/verify', // Para OTP se necessário
      });
    } catch (err: any) {
      setError('Erro ao tentar fazer login com Google.');
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center bg-gray-900">
      <div className="text-center">
        <img src="/spm_white.svg" alt="SPM logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-2xl font-bold text-gray-100">Faça login na sua conta!</h2>
      </div>

      <div className="w-full max-w-sm mt-8">
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

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
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Senha
              </label>
              <a href="/auth/forgot-password" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                Esqueceu a senha?
              </a>
            </div>
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
              Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-gray-800 border border-gray-300 hover:bg-gray-100"
          >
            <FcGoogle size={20} /> Entrar com Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta?{' '}
          <a href="/auth/sign-up" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Registrar
          </a>
        </p>
      </div>
    </div>
  );
}