import Head from "next/head";

const Meta = (props) => {
  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>{props.title}</title>
      </Head>
    </>
  );
};

Meta.defaultProps = {
  title: "Bookshelf",
};

export default Meta;
