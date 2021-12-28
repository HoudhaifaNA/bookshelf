import Head from "next/head";

const Meta = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
    </>
  );
};

Meta.defaultProps = {
  title: "Bookshelf",
};

export default Meta;
