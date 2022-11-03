import 'styles/styles.css'
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
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
