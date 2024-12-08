'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import React, { useState, useEffect } from 'react';

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log('isLoaded status:', isLoaded);
  }, [isLoaded]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      setError('O sistema está carregando. Tente novamente em breve.');
      return;
    }

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setError('');

    console.log('Tentando fazer login com:', { email });

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log('Login bem-sucedido:', result);
      router.push('/');
    } catch (err) {
      console.error('Erro ao fazer login:', err);

      if (err instanceof Error) {
        if (err.message.includes('invalid') || err.message.includes('Incorrect')) {
          setError('E-mail ou senha inválidos.');
        } else {
          setError(err.message || 'Erro ao fazer login.');
        }
      } else {
        setError('Erro inesperado ao fazer login. Tente novamente.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('Iniciando autenticação com Google...');
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/',
        redirectUrlComplete: window.location.origin + '/',
      });
    } catch (err) {
      console.error('Erro ao autenticar com Google:', err);
      setError('Erro ao autenticar com Google. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <img alt="SPM logo" src="/spm_white.svg" className="mx-auto h-[150px] w-auto" />
        <h1 className="text-2xl font-bold text-white text-center mb-6 mt-6">Faça seu Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Seu melhor email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Sua Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing || !isLoaded}
            className={`w-full p-2 mt-2 rounded-md text-white font-bold ${
              isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {isProcessing ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full p-2 mt-4 flex items-center justify-center bg-white text-black font-bold rounded-md shadow-md hover:bg-gray-200"
        >
          <FcGoogle className="mr-2" /> Entrar com Google
        </button>
        <p className="mt-6 text-center text-sm text-gray-400">
          <a href="/auth/forgot-password" className="text-indigo-400 hover:underline">
            Esqueceu sua senha?
          </a>
        </p>
        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <a href="/auth/sign-up" className="text-indigo-400 hover:underline">
            Crie uma aqui
          </a>
        </p>
      </div>
    </div>
  );
}