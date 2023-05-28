import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/layout";
import Head from "next/head";
import Header from "../components/header";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>SaveEarth</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
