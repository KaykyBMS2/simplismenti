'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded || isProcessing) return;

    setIsProcessing(true);
    setError('');

    try {
      console.log("Criando conta com:", { email, password, username });

      // Cria o usuário no Clerk
      const result = await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { username }, // Armazena o username nos metadados
      });

      console.log("Conta criada com sucesso:", result);

      // Tenta enviar o email de verificação
      await signUp.prepareEmailAddressVerification();
      console.log("Email de verificação enviado.");

      // Redireciona para a página de verificação
      router.push('/auth/verify');
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      setError(
        err.errors?.[0]?.longMessage || 
        'Erro ao criar a conta. Verifique os dados e tente novamente.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Corrigido: adiciona redirectUrlComplete e redirectUrl
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/auth/callback',  // URL de retorno após autenticação com Google
        redirectUrlComplete: window.location.origin + '/',      // Redirecionamento após autenticação bem-sucedida
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
            disabled={isProcessing}
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
          <a href="/auth/sign-in" className="text-indigo-400 hover:underline">
            Faça Login
          </a>
        </p>
      </div>
    </div>
  );
}