import { ClerkProvider, useClerk } from '@clerk/nextjs';  // Corrigir importação
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app';
import { ptBR } from '@clerk/localizations';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Loading from './Loading'; // Componente de Loading

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} localization={ptBR}>
      <ClerkWrapper>
        <Component {...pageProps} />
      </ClerkWrapper>
    </ClerkProvider>
  );
}

const ClerkWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClerkLoaded, setIsClerkLoaded] = useState(false);
  const { isLoaded } = useClerk(); // Agora dentro do `ClerkProvider`

  useEffect(() => {
    if (isLoaded) {
      setIsClerkLoaded(true);
    }
  }, [isLoaded]);

  if (!isClerkLoaded) {
    return <Loading />; // Exibe a tela de carregamento enquanto o Clerk não carrega
  }

  return <>{children}</>;
};