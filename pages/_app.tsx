import 'styles/styles.css'
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'components/core/Menu';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div>
            <Menu />
            <Component {...pageProps} />
            <Toaster
                toastOptions={{
                    duration: 4000,
                    position: 'top-center',
                }} />
        </div>
    );
}

export default MyApp;
