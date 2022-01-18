import styles from "./BookInfo.module.css";
import truncate from "../../lib/truncate";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BookInfo = ({ publisher, publishedDate, ISBNS, pageCount }) => {
  let sortedISBNS;
  const [originPublisher, shortpublisher] = truncate(publisher, 18);

  if (ISBNS) {
    sortedISBNS = ISBNS.sort((a, b) =>
      a.type > b.type ? -1 : b.type > a.type ? 1 : 0
    );
  }

  // TRANSFORM DATE "2019-05-19" TO TEXT "19 May, 2019"
  const dateToText = () => {
    if (publishedDate) {
      const dateSplitted = publishedDate.split("-");
      if (dateSplitted[1]) {
        return `${dateSplitted[2]} ${months[dateSplitted[1] - 1]} ${
          dateSplitted[0]
        }`;
      }
      return publishedDate;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} title={originPublisher}>
        <span className={styles.title}>Publisher :</span>
        <span className={styles.content}>{shortpublisher}</span>
      </div>
      {publishedDate ? (
        <div className={styles.item}>
          <span className={styles.title}>Published :</span>
          <span className={styles.content}>{dateToText()}</span>
        </div>
      ) : (
        ""
      )}
      <div className={styles.item}>
        <span className={styles.title}>Page count :</span>
        <span className={styles.content}>{pageCount}</span>
      </div>
      {sortedISBNS ? (
        <>
          <div className={styles.item}>
            <span className={styles.title}>ISBN 13 :</span>
            <span className={styles.content}>{sortedISBNS[0].identifier}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>ISBN 10 :</span>
            <span className={styles.content}>{sortedISBNS[1].identifier}</span>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default BookInfo;
