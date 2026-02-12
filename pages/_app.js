import { ClerkProvider } from '@clerk/nextjs';
import { esES } from "@clerk/localizations";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/globals.css';
import '../styles/rut/globals.css';
import WhatsAppButton from '../components/WhatsAppButton';
import ThemeToggle from '../components/ThemeToggle';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider localization={esES} {...pageProps}>
      <div className="iphone">
        <ThemeToggle />
        <Component {...pageProps} />
        <WhatsAppButton />
      </div>
    </ClerkProvider>
  );
}
