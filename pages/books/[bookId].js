import { useContext } from "react";
import Modal from "react-modal";

import BookDetails from "../../components/bookDetails/BookDetails";
import BookThumbnail from "../../components/bookDetails/BookThumbnail";
import styles from "../../styles/BookPage.module.css";
import Meta from "../../components/Meta";
import Popup from "../../components/Popup";
import { GlobalContext } from "../../context/GlobalContext";

Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .4)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const BookPage = ({ book }) => {
  const { modal } = useContext(GlobalContext);
  const [modalOpen, toggleModal] = modal;

  const { volumeInfo } = book;
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

  return (
    <div className={styles.container}>
      <Meta title={`${title} - Bookshelf`} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => toggleModal(false)}
        contentLabel="Popup modal"
        style={customStyles}
      >
        <Popup toggleModal={toggleModal} />
      </Modal>
      <BookThumbnail image={imageLinks.thumbnail} id={book.id} />
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
        book: data,
      },
    };
  } catch (err) {
    console.log("ERROR", { ...err });
  }
};

export default BookPage;
