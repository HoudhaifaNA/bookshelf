import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { BooksContext } from "../../context/BooksContext";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [term, setTerm] = useContext(BooksContext);
  const router = useRouter();
  useEffect(() => {
    if (router.route === "/books") {
      setTerm(router.query.q);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch();
  };
  return (
    <form id="myform" className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by Title, Author, Subject, ISBN"
        className={styles.searchInput}
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
    </form>
  );
};

export default SearchBar;
