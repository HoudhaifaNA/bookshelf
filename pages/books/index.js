import { useRouter } from "next/router";

import Meta from "../../components/Meta";
import BookItem from "../../components/books/BookItem";
import Filter from "../../components/books/Filter";
import Paging from "../../components/books/Paging";
import styles from "../../styles/Books.module.css";

const Books = ({ bookItems, totalItems }) => {
  const router = useRouter();

  const renderBooks = () => {
    if (bookItems) {
      return bookItems.map((el) => {
        if (el.volumeInfo.imageLinks && el.volumeInfo.authors) {
          return (
            <BookItem
              key={el.id}
              id={el.id}
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
      <Paging totalItems={totalItems} />
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

    return {
      props: {
        bookItems: bookList,
        totalItems: data.totalItems,
      },
    };
  } catch (err) {
    console.log("ERROR", { ...err });
  }
};
export default Books;
