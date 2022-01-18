// eslint-disable-next-line import/no-anonymous-default-export
export default (averageRating) => {
  // 1) SPLIT BY . AND CONVERT TO NUMBER EX: 4.5 ===> [4, 5]
  const stars = `${averageRating}`.split(".").map((el) => el * 1);

  const starsArr = Array(5)
    .fill()
    .map((st, i) => {
      // 2) FILL AN ARRAY WITH ICON NAMES 5 TIMES (STARS)

      // 3) IF INDEX LESS FIRST NUM OF STARS EX: [4,5]  IF 4 LESS THAN INDEX 0 1 2 3 RETURN STAR FILL
      if (i < stars[0]) return "star-fill";

      // 4) IF THERE IS HALF STAR [4, 5] 5 AND INDEX IS EQUAL TO FIRST NUM OF RATING STARS THAN RETURN HALF START
      if (stars[1] && i === stars[0]) return "star-half";

      // 5) IF NONE OF THE ABOVE RETURN EMPTY STARS
      return "star-empty";
    });

  return starsArr;
};
