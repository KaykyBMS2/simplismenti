'use client';

import { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignInLoaded && !isSignUpLoaded) return;

    try {
      // Log de depuração
      console.log("Tentando validar código:", otpCode);

      if (signIn && signIn.firstFactorVerification) {
        // Tenta realizar a verificação do primeiro fator (login)
        await signIn.attemptFirstFactor({ code: otpCode });
      } else if (signUp && signUp.verifications.emailAddress) {
        // Tenta validar o código de verificação do e-mail
        await signUp.attemptEmailAddressVerification({ code: otpCode });
      }

      // Se a verificação for bem-sucedida, redireciona para a página principal
      router.push('/');
    } catch (err: any) {
      // Verifica o tipo de erro e exibe a mensagem apropriada
      console.error("Erro ao tentar validar o código:", err);
      setError('Código inválido ou expirado. Tente novamente.');
    }
  };

  const handleResendCode = async () => {
    if (isResending) return; // Previne múltiplos cliques no botão

    setIsResending(true);
    setError('');

    try {
      if (signUp && signUp.prepareEmailAddressVerification) {
        // Reenvia o código de verificação
        await signUp.prepareEmailAddressVerification();
        setIsCodeSent(true); // Marca que o código foi enviado
        console.log("Código de verificação reenviado com sucesso.");
      }
    } catch (err: any) {
      setError('Erro ao reenviar o código. Tente novamente.');
      console.error('Erro ao tentar reenviar o código:', err);
    } finally {
      setIsResending(false);
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
          <button
            onClick={handleResendCode}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
            disabled={isResending}
          >
            {isResending ? 'Enviando...' : 'Reenviar Código'}
          </button>
        </p>

        {isCodeSent && (
          <p className="text-sm text-green-400 text-center mt-4">
            Um novo código foi enviado para o seu email.
          </p>
        )}
      </div>
    </div>
  );
}