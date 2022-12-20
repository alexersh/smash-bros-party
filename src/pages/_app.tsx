import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { RootStore, StoreProvider } from '../components/StoreProvider/StoreProvider';

export default function App({ Component, pageProps }: AppProps) {
  const rootStore = new RootStore();

  return (
    <StoreProvider store={rootStore}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
