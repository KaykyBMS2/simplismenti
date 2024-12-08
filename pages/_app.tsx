import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ptBR } from '@clerk/localizations';
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  console.log("Clerk Frontend API:", process.env.NEXT_PUBLIC_CLERK_FRONTEND_API);  // Verificando a URL

  return (
    <ClerkProvider 
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}  // Garantindo que o ClerkProvider está usando a variável correta
      appearance={{ baseTheme: dark }} 
      localization={ptBR}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}