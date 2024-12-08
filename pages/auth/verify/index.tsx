'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function VerifyEmailPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded || isProcessing) return;

    setIsProcessing(true);
    setError('');

    try {
      console.log("Verificando código:", code);

      // Tenta verificar o código enviado por email
      const result = await signUp.attemptEmailAddressVerification({ code });
      console.log("Email verificado com sucesso:", result);

      // Redireciona para a página inicial ou dashboard
      router.push('/');
    } catch (err) {
      console.error("Erro ao verificar código:", err);
      setError(
        err.errors?.[0]?.longMessage || 
        'Erro ao verificar o código. Tente novamente.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Verifique seu Email</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-300">
              Código de Verificação
            </label>
            <input
              id="code"
              type="text"
              placeholder="Insira o código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
            {isProcessing ? 'Verificando...' : 'Verificar Código'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Não recebeu o código?{' '}
          <button
            onClick={() => signUp.prepareEmailAddressVerification()}
            className="text-indigo-400 hover:underline"
          >
            Reenviar código
          </button>
        </p>
      </div>
    </div>
  );
}