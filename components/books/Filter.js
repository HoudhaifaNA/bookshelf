import { useRouter } from "next/router";

import styles from "./Filter.module.css";

const Filter = () => {
  const router = useRouter();

  const filter = (type) => {
    router.push(`/books?q=${router.query.q}&filter=${type}`);
  };
  const isSelected = (option) => {
    return option === router.query.filter
      ? `${styles.filterItem} ${styles.itemSelected}`
      : styles.filterItem;
  };

  return (
    <div className={styles.container}>
      <div className={isSelected("intitle")} onClick={() => filter("intitle")}>
        By Title
      </div>
      <div
        className={isSelected("inauthor")}
        onClick={() => filter("inauthor")}
      >
        By Author
      </div>
      <div className={isSelected("subject")} onClick={() => filter("subject")}>
        By Subject
      </div>
      <div
        className={isSelected("inpublisher")}
        onClick={() => filter("inpublisher")}
      >
        By Publisher
      </div>
      <div className={isSelected("ISBN")} onClick={() => filter("ISBN")}>
        By ISBN
      </div>
    </div>
  );
};

export default Filter;
