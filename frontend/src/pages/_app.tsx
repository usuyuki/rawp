import { GoogleAnalytics } from 'nextjs-google-analytics';

import type { AppProps } from 'next/app';
import '../styles/globals.css';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GoogleAnalytics trackPageViews />
            <Component {...pageProps} />
        </>
    );
}
