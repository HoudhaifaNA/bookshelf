import Image from "next/image";
import Link from "next/link";

import truncate from "../../lib/truncate";
import styles from "./BookItem.module.css";
import Icon from "../Icon";

const BookItem = ({ id, title, author, image }) => {
  const [originTitle, shortTitle] = truncate(title, 40);
  const [originAuthor, shortAuthor] = truncate(author, 26);

  return (
    <Link href={`/books/${id}`} passHref>
      <div className={styles.item} title={originTitle}>
        <div className={styles.shadow} />
        <h5 className={styles.status}>Saved</h5>
        <div className={styles.saveBtn}>
          {/* <div className={styles.loader} /> */}
          <svg className={styles.icon}>
            <Icon icon="save" />
          </svg>
        </div>
        <div className={styles.image}>
          <Image
            src={image}
            alt={originTitle}
            blurDataURL={image}
            placeholder="blur"
            layout="fill"
            className={styles.picture}
          />
        </div>
        <h4 className={styles.author} title={originAuthor}>
          {shortAuthor}
        </h4>
        <h2 className={styles.title}>{shortTitle}</h2>
      </div>
    </Link>
  );
};

export default BookItem;
