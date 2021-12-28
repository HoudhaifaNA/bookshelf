import { useRouter } from "next/router";
import BookItem from "../../components/books/BookItem";
import Filter from "../../components/books/Filter";
import Meta from "../../components/Meta";

import styles from "../../styles/Books.module.css";

const Books = ({ bookItems }) => {
  const router = useRouter();
  const renderBooks = () => {
    if (bookItems.length > 0) {
      return bookItems.map((el) => {
        if (el.volumeInfo.imageLinks && el.volumeInfo.authors) {
          return (
            <BookItem
              key={el.id}
              title={el.volumeInfo.title}
              author={el.volumeInfo.authors[0]}
              image={el.volumeInfo.imageLinks.thumbnail}
            />
          );
        }
      });
    } else {
      return <div></div>;
    }
  };
  return (
    <div className={styles.container}>
      <Meta title={`${router.query.q} - Bookshelf`} />
      <Filter />
      <div className={styles.booksContainer}>{renderBooks()}</div>
    </div>
  );
};
export const getServerSideProps = async ({ query }) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${
      query.filter ? query.filter : "intitle"
    }:${
      query.q
    }&key=AIzaSyCQDCoLw1tpTqfcNZaLKaWuhdjTPFA_J8c&langRestrict=en&maxResults=40&startIndex=0`
  );
  const data = await response.json();
  return {
    props: {
      bookItems: data.totalItems === 0 ? [] : data.items,
    }, // will be passed to the page component as props
  };
};
export default Books;
