// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const response = await fetch(`${process.env.URL}/api/user/isLoggedIn`);
  if (response.status === 200) return true;
  return false;
};
