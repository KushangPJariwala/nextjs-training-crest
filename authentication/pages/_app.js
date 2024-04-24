import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Loader from "../components/ui/loader";
import { ContextProvider } from "../store/context";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <ContextProvider>
        <SessionProvider >
          {loading && <Loader />}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
