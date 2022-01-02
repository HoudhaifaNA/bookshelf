import Image from "next/image";

import styles from "./BookThumbnail.module.css";
import Icon from "../Icon";

const BookThumbnail = ({ image, id }) => {
  const previewLink = `https://www.google.com/books/edition/_/${id}`;
  return (
    <div className={styles.thumbnail}>
      <div className={styles.image}>
        <Image
          loader={() => image}
          src={image}
          alt="test"
          blurDataURL={image}
          placeholder="blur"
          layout="fill"
          className={styles.picture}
        />
      </div>
      <a
        href={previewLink}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <span> Preview of the book </span>
        <svg className={styles.icon}>
          <Icon icon="external" />
        </svg>
      </a>
    </div>
  );
};

export default BookThumbnail;
