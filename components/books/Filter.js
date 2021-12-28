import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./Filter.module.css";

const Filter = () => {
  const router = useRouter();

  const filter = (type) => {
    router.push(`/books?q=${router.query.q}&filter=${type}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.filterItem} onClick={() => filter("intitle")}>
        By Title
      </div>
      <div className={styles.filterItemGrey} onClick={() => filter("inauthor")}>
        By Author
      </div>
      <div className={styles.filterItemGrey} onClick={() => filter("subject")}>
        By Subject
      </div>
      <div
        className={styles.filterItemGrey}
        onClick={() => filter("inpublisher")}
      >
        By Publisher
      </div>
      <div className={styles.filterItemGrey} onClick={() => filter("ISBN")}>
        By ISBN
      </div>
    </div>
  );
};

export default Filter;
