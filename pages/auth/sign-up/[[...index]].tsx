'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import React, { useState, useEffect } from 'react';

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log("isLoaded status:", isLoaded);
  }, [isLoaded]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Checar se o Clerk foi carregado e se o processamento não está em andamento
    if (!isLoaded) {
      console.log("Clerk não carregado, aguardando...");
      setError("O sistema está carregando. Tente novamente em breve.");
      return;
    }

    if (isProcessing) {
      console.log("Processamento já em andamento.");
      return;
    }

    setIsProcessing(true);
    setError('');

    console.log("Tentando criar conta com:", { email, password, username });

    try {
      // Tentando criar o usuário
      const result = await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { username },
      });

      console.log("Conta criada com sucesso:", result);

      // Tenta preparar o envio do código de verificação
      await signUp.prepareEmailAddressVerification();

      console.log("Email de verificação enviado.");

      // Redireciona para a página de verificação
      router.push('/auth/verify');
    } catch (err) {
      console.error("Erro ao criar conta:", err);

      if (err instanceof Error) {
        setError(err.message || 'Erro ao criar a conta.');
        console.log("Detalhes do erro:", err);
      } else {
        setError('Erro inesperado ao criar a conta. Tente novamente.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignUp = async () => {
    console.log("Iniciando autenticação com Google...");
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/',
        redirectUrlComplete: window.location.origin + '/',
      });
    } catch (err) {
      console.error("Erro ao autenticar com Google:", err);
      setError('Erro ao autenticar com Google. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <img alt="SPM logo" src="/spm_white.svg" className="mx-auto h-[150px] w-auto" />
        <h1 className="text-2xl font-bold text-white text-center mb-6 mt-6">Crie sua Conta</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Crie um Nome
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
              Crie uma Senha
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
            {isProcessing ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignUp}
          className="w-full p-2 mt-4 flex items-center justify-center bg-white text-black font-bold rounded-md shadow-md hover:bg-gray-200"
        >
          <FcGoogle className="mr-2" /> Criar conta com Google
        </button>
        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem uma conta?{' '}
          <Link href="/auth/sign-in" className="text-indigo-400 hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}