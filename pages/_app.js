import Layout from "../components/layout/Layout";
import { ContextWrapper } from "../context/BooksContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextWrapper>
  );
}

export default MyApp;
