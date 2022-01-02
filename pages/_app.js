import dynamic from "next/dynamic";
import "../styles/globals.css";
import "../styles/nprogress.css";
import Layout from "../components/layout/Layout";
import { ContextWrapper } from "../context/GlobalContext";

const ProgressBar = dynamic(() => import("../lib/Progressbar"), {
  ssr: false,
});

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
