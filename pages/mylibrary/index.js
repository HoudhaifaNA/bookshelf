/* eslint-disable @next/next/no-img-element */
// import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useContext } from "react";

import styles from "../../styles/Books.module.css";

import Meta from "../../components/Meta";
import BookItem from "../../components/books/BookItem";
import Filter from "../../components/books/Filter";
import NoBooks from "../../components/NoBooks";
import { GlobalContext } from "../../context/GlobalContext";

const Books = () => {
  const { userBooks, filteredBooks } = useContext(GlobalContext);
  let bookItems = filteredBooks[0] ? filteredBooks[0] : userBooks;
  bookItems = [...bookItems].reverse();
  const renderBooks = () => {
    if (bookItems) {
      return bookItems.map((el) => {
        if (el.title) {
          return (
            <BookItem
              key={el.bookId}
              id={el.bookId}
              title={el.title}
              author={el.author}
              image={el.thumbnail}
              status={el.status}
            />
          );
        }
      });
    } else {
      return;
    }
  };
  const renderPage = () => {
    if (userBooks.length > 0) {
      return (
        <>
          <Filter />
          <div className={styles.booksContainer}>{renderBooks()}</div>
        </>
      );
    } else {
      return <NoBooks message="You do not have any books saved yet." />;
    }
  };
  return (
    <div className={styles.container}>
      <Meta title="My library" />
      {renderPage()}
    </div>
  );
};

export default Books;
