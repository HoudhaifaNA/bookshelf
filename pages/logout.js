/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export const getServerSideProps = async () => {
  await axios(`${process.env.URL}/api/user/logout`);

  return {
    props: {},
  };
};

export default () => {
  return;
};
