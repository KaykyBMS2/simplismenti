'use client';

import { useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Função de login com Google
  const handleGoogleSignIn = async () => {
    console.log('Iniciando autenticação com Google...');
    if (!signIn) {
      setError('Serviço de autenticação não carregado. Tente novamente mais tarde.');
      return;
    }

    try {
      // Corrigido: agora inclui redirectUrlComplete
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/auth/callback',  // Redireciona para a página de callback
        redirectUrlComplete: window.location.origin + '/',  // Redireciona para a página inicial após o login
      });
      console.log('Redirecionado para autenticação com Google.');
    } catch (err) {
      console.error('Erro ao autenticar com Google:', err);
      setError('Erro ao autenticar com Google. Tente novamente.');
    }
  };

  // Função de login com email/usuário e senha
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isProcessing) return;

    setIsProcessing(true);
    setError('');

    console.log('Tentando autenticar usuário...');
    console.log('Email:', email || 'não informado');
    console.log('Username:', username || 'não informado');

    try {
      const identifier = email || username;
      console.log('Identificador usado para login:', identifier);

      const result = await signIn.create({
        identifier,
        password,
      });

      console.log('Resultado do login:', result);

      if (result.status === 'needs_first_factor') {
        console.log('Autenticação pendente, redirecionando para /auth/verify');
        router.push('/auth/verify');
      } else {
        console.log('Autenticação bem-sucedida, redirecionando para /');
        router.push('/');
      }
    } catch (err) {
      console.error('Erro ao tentar autenticar:', err);
      setError('Erro no login. Verifique as credenciais e tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Se o usuário já estiver autenticado, redireciona para a página inicial
  if (isSignedIn) {
    console.log('Usuário já autenticado, redirecionando para /');
    router.push('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <img alt="SPM logo" src="/spm_white.svg" className="mx-auto h-[150px] w-auto" />
        <h1 className="text-2xl font-bold text-white text-center mb-6 mt-6">Faça Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Nome de Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Senha
              </label>
              <a
                href="/auth/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>
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
            disabled={isProcessing}
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
          Não tem uma conta?{' '}
          <a href="/auth/sign-up" className="text-indigo-400 hover:underline">
            Crie uma agora
          </a>
        </p>
      </div>
    </div>
  );
}