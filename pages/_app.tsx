import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app'; // Importa o tipo correto do Next.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;