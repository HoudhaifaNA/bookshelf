import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./BookItem.module.css";
import truncate from "../../lib/truncate";
import Icon from "../Icon";
import { GlobalContext } from "../../context/GlobalContext";

const BookItem = ({ id, title, author, status, image }) => {
  const { modal, book, userBooks } = useContext(GlobalContext);
  const [, toggleModal] = modal;
  const [, selectBook] = book;
  const [originTitle, shortTitle] = truncate(title, 40);
  const [originAuthor, shortAuthor] = truncate(author, 26);

  // 1) SEE IF THE CURRENT BOOK IS SAVE
  const isSaved = userBooks.find((el) => el.bookId === id);
  // 2) IF SAVED RENDER THE STATUS READING OF THE BOOK
  let renderStatus;
  if (isSaved)
    renderStatus = <h5 className={styles.status}>{isSaved.status}</h5>;

  const handleAction = (e) => {
    e.stopPropagation();
    selectBook({ id, title, author, status, thumbnail: image });
    toggleModal(true);
  };

  return (
    <Link href={`/books/${id}`} className={styles.link}>
      <div className={styles.item} title={originTitle}>
        {renderStatus}
        <div className={styles.image}>
          <div
            className={`${styles.saveBtn} ${isSaved ? styles.selected : ""}`}
            onClick={handleAction}
          >
            <svg className={styles.icon}>
              <Icon icon="save" />
            </svg>
          </div>
          <Image
            src={image}
            alt={originTitle}
            blurDataURL={image}
            placeholder="blur"
            fill={true}
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
