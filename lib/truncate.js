// eslint-disable-next-line import/no-anonymous-default-export
export default (text, num) => {
  let modifiedText = text;
  if (text.split("").length > num) {
    modifiedText = `${text.slice(0, num)} ...`;
  }
  return [text, modifiedText];
};
