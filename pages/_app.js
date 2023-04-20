import '../styles/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

config.autoAddCss = false;

import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Add an event listener for the keydown event
    const handleKeyDown = (event) => {
      if (event.key === '/') {
        router.push('/').then(() => {
          document.getElementById('search').focus();
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Layout>
       <Component {...pageProps} />
    </Layout>
  )
}
