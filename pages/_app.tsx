import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;