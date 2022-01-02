import dynamic from "next/dynamic";
const ProgressBar = dynamic(() => import("../lib/Progressbar"), {
  ssr: false,
});

import "../styles/globals.css";
import "../styles/nprogress.css";
import Layout from "../components/layout/Layout";
import { ContextWrapper } from "../context/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Layout>
        <Component {...pageProps} />
        <ProgressBar />
      </Layout>
    </ContextWrapper>
  );
}

export default MyApp;
