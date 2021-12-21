import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const termRef = useRef();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(termRef.current.value);
    router.push(`/books?q=${termRef.current.value}`);
  };
  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by Title, Author, Subject, ISBN"
        className={styles.searchInput}
        ref={termRef}
      />
    </form>
  );
};

export default SearchBar;
