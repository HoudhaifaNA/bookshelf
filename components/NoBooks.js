/* eslint-disable @next/next/no-img-element */
import styles from "./NoBooks.module.css";

const NoBooks = ({ message }) => {
  return (
    <div className={styles.noBooks}>
      <div className={styles.picture}>
        <img src="/books-stack.png" alt="No books found" />
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default NoBooks;
