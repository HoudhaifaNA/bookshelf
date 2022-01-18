/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import BookDetails from "../../components/bookDetails/BookDetails";
import BookThumbnail from "../../components/bookDetails/BookThumbnail";
import styles from "../../styles/BookPage.module.css";
import Meta from "../../components/Meta";
import { GlobalContext } from "../../context/GlobalContext";

const BookPage = ({ currentBook }) => {
  const { book, userBooks } = useContext(GlobalContext);
  const [, selectBook] = book;
  const { volumeInfo } = currentBook;
  const isSaved = userBooks.find((el) => el.bookId === currentBook.id);

  const {
    imageLinks,
    title,
    subtitle,
    authors,
    description,
    averageRating,
    ratingsCount,
    publisher,
    publishedDate,
    industryIdentifiers,
    pageCount,
  } = volumeInfo;

  useEffect(() => {
    selectBook({
      id: currentBook.id,
      title,
      author: authors[0],
      thumbnail: imageLinks.thumbnail,
    });
  }, []);

  return (
    <div className={styles.container}>
      <Meta title={`${title} - Bookshelf`} />
      <BookThumbnail
        image={imageLinks.thumbnail}
        id={currentBook.id}
        isSaved={isSaved}
      />
      <BookDetails
        title={title}
        subtitle={subtitle}
        authors={authors}
        description={description}
        averageRating={averageRating}
        ratingsCount={ratingsCount}
        publisher={publisher}
        publishedDate={publishedDate}
        industryIdentifiers={industryIdentifiers}
        pageCount={pageCount}
        isSaved={isSaved}
      />
    </div>
  );
};

/////////////////////////////////////////////////////////
///-------------///
export const getServerSideProps = async ({ query }) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${query.bookId}?key=${process.env.API_KEY}`
    );

    const data = await response.json();

    return {
      props: {
        currentBook: data,
      },
    };
  } catch (err) {
    console.log("ERROR", { ...err });
  }
};

export default BookPage;
