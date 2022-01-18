import Link from "next/link";
import { useEffect, useRef, useContext } from "react";

import BookInfo from "./BookInfo";
import displayRating from "../../lib/displayRating";
import styles from "./BookDetails.module.css";
import Icon from "../Icon";
import { GlobalContext } from "../../context/GlobalContext";

const BookDetails = ({
  title,
  subtitle,
  authors,
  publisher,
  publishedDate,
  description,
  industryIdentifiers,
  pageCount,
  averageRating,
  ratingsCount,
  isSaved,
}) => {
  const descriptionRef = useRef();
  const { modal } = useContext(GlobalContext);
  const [, toggleModal] = modal;

  // 1) GET RATING DISPLAY CLASSES
  const stars = displayRating(averageRating);

  useEffect(() => {
    descriptionRef.current.innerHTML = "";
    if (description)
      descriptionRef.current.insertAdjacentHTML("beforeend", description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) RENDER AUTHORS LINK
  const authorsLink = authors.map((author) => {
    return (
      <Link
        key={author}
        href={`/books?q=${author.split(" ").join("+")}&filter=inauthor`}
      >
        {`${author}, `}
      </Link>
    );
  });

  return (
    <div className={styles.details}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <h6 className={styles.authors}>by {authorsLink}</h6>
      {ratingsCount ? (
        <div className={styles.rating}>
          <div className={styles.stars}>
            {stars.map((el) => {
              return (
                <svg key={Math.random()} className={styles.icon}>
                  <Icon icon={el} />
                </svg>
              );
            })}
          </div>
          <span>{ratingsCount} reviews</span>
        </div>
      ) : (
        ""
      )}
      <div ref={descriptionRef} className={styles.description}></div>
      <button className={styles.addBtn} onClick={() => toggleModal(true)}>
        {isSaved ? "Edit my shelf" : "Add to my shelf"}
      </button>
      <BookInfo
        publisher={publisher}
        publishedDate={publishedDate}
        ISBNS={industryIdentifiers}
        pageCount={pageCount}
      />
    </div>
  );
};

export default BookDetails;
