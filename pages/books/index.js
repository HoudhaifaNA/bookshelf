/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import styles from "../../styles/Books.module.css";

import Meta from "../../components/Meta";
import BookItem from "../../components/books/BookItem";
import Filter from "../../components/books/Filter";
import Paging from "../../components/books/Paging";
import NoBooks from "../../components/NoBooks";

const Books = ({ bookItems, totalItems }) => {
  console.log(totalItems);
  const router = useRouter();

  const renderBooks = () => {
    if (bookItems) {
      return bookItems.map((el) => {
        if (el.volumeInfo.imageLinks && el.volumeInfo.authors) {
          return (
            <BookItem
              key={Math.random() * 5555}
              id={el.id}
              title={el.volumeInfo.title}
              author={el.volumeInfo.authors[0]}
              image={el.volumeInfo.imageLinks.thumbnail}
            />
          );
        }
      });
    } else {
      return;
    }
  };

  const renderPage = () => {
    if (bookItems.length > 0) {
      return (
        <>
          <Filter />
          <div className={styles.booksContainer}>{renderBooks()}</div>
          <Paging totalItems={totalItems} />
        </>
      );
    } else {
      return (
        <NoBooks message=" No books found here You can try searching with another term" />
      );
    }
  };
  return (
    <div className={styles.container}>
      <Meta title={`${router.query.q} - Bookshelf`} />
      {renderPage()}
    </div>
  );
};

/////////////////////////////////////////////////////////
///-------------///
export const getServerSideProps = async ({ query }) => {
  const { q, filter } = query;
  const page = query.page * 1 || 1;
  const skip = (page - 1) * 40;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${filter}:${encodeURI(
        q
      )}&key=${
        process.env.API_KEY
      }&langRestrict=en&startIndex=${skip}&maxResults=40`
    );

    const data = await response.json();
    const bookList = data.items ? data.items : [];
    const totalItems = data.totalItems ? data.totalItems : null;
    return {
      props: {
        bookItems: bookList,
        totalItems,
      },
    };
  } catch (err) {}
};
export default Books;
