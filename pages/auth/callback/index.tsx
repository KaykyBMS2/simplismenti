import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClerk } from '@clerk/nextjs';
import Image from "next/image";

export default function CallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    // Esta função trata a resposta da autenticação do Clerk
    async function handleCallback() {
      try {
        // Certifique-se de chamar handleRedirectCallback() corretamente
        await handleRedirectCallback();
        // Após o callback, redireciona para a página principal ou qualquer outra
        router.push('/');
      } catch (err) {
        console.error('Erro ao processar o callback de autenticação:', err);
        // Trate erros, se necessário
      }
    }

    handleCallback();
  }, [handleRedirectCallback, router]);

  return <div><Image src="/loading.svg"  width={75} height={75} alt="loading..."/></div>;
}