// eslint-disable-next-line import/no-anonymous-default-export
export default (averageRating) => {
  const stars = `${averageRating}`.split(".").map((el) => el * 1);

  const starsArr = Array(5)
    .fill()
    .map((st, i) => {
      if (i < stars[0]) return "star-fill";
      if (stars[1] && i === stars[0]) return "star-half";
      return "star-empty";
    });

  return starsArr;
};
