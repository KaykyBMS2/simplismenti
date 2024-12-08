'use client';

import { useClerk } from '@clerk/nextjs';
import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const { client } = useClerk();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setMessage('');
    setError('');

    try {
      await client.passwords.request({
        emailAddress: email,
      });
      setMessage('Um link para redefinição foi enviado para o seu e-mail.');
    } catch (err) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      setError('Erro ao solicitar redefinição de senha. Verifique o e-mail informado.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[90%] max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Redefinir Senha</h1>
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Seu e-mail
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
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full p-2 mt-2 rounded-md text-white font-bold ${
              isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {isProcessing ? 'Enviando...' : 'Enviar Link'}
          </button>
        </form>
      </div>
    </div>
  );
}