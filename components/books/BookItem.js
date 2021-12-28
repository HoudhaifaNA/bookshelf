import Image from "next/image";

import truncate from "../../lib/truncate";
import styles from "./BookItem.module.css";
import Icon from "../Icon";

const BookItem = ({ title, author, image }) => {
  const [originTitle, shortTitle] = truncate(title, 40);
  const [originAuthor, shortAuthor] = truncate(author, 26);

  return (
    <div className={styles.item} title={originTitle}>
      <div className={styles.shadow} />
      <div className={styles.saveBtn}>
        {/* <div className={styles.loader} /> */}
        <svg className={styles.icon}>
          <Icon icon="save" />
        </svg>
      </div>
      <div className={styles.image}>
        <Image
          src={image}
          alt="test"
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
  );
};

export default BookItem;
