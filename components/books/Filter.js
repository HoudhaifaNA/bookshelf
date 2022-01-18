import { useRouter } from "next/router";

import styles from "./Filter.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext, useState } from "react";

let filterSearch = [
  { text: "By Title", filter: "intitle" },
  { text: "By Author", filter: "inauthor" },
  { text: "By Subject", filter: "subject" },
  { text: "By Publisher", filter: "inpublisher" },
  { text: "By ISBN", filter: "ISBN" },
];

let filterSaved = [
  { text: "To read", filter: "To read" },
  { text: "Reading", filter: "Reading" },
  { text: "Have read", filter: "Have read" },
];

const Filter = () => {
  const router = useRouter();
  const [filterOption, setOption] = useState(router.query.filter);
  const { userBooks, filteredBooks } = useContext(GlobalContext);
  const [, filterBooks] = filteredBooks;

  let isMyBooks = router.pathname === "/mylibrary";
  const filterTypes = isMyBooks ? filterSaved : filterSearch;

  const filter = (type) => {
    let isSame = type === filterOption;
    if (isMyBooks) {
      const newBooks = userBooks.filter((bk) => bk.status === type);
      isSame ? filterBooks() : filterBooks(newBooks);
    } else {
      !isSame ? router.push(`/books?q=${router.query.q}&filter=${type}`) : 1;
    }
    isSame && isMyBooks ? setOption() : setOption(type);
  };

  const isSelected = (option) => {
    return option === filterOption
      ? `${styles.filterItem} ${styles.itemSelected}`
      : styles.filterItem;
  };

  const renderFilterItems = () => {
    return filterTypes.map((el) => {
      return (
        <div
          className={isSelected(el.filter)}
          onClick={() => filter(el.filter)}
          key={el.text}
        >
          {el.text}
        </div>
      );
    });
  };

  return <div className={styles.container}>{renderFilterItems()}</div>;
};

export default Filter;
