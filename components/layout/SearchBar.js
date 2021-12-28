import { useContext } from "react";
import { BooksContext } from "../../context/BooksContext";

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [term, setTerm] = useContext(BooksContext);

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
