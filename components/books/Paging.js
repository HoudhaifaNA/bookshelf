import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "../Icon";
import styles from "./Paging.module.css";

const Paging = ({ totalItems }) => {
  const router = useRouter();
  const page = router.query.page * 1 || 1;
  const pages = page * 40 < totalItems;
  const prevPath = `${router.asPath.split("&page")[0]}&page=${page - 1}`;
  const nextPath = `${router.asPath.split("&page")[0]}&page=${page + 1}`;

  const justifyContent = () => {
    if (page !== 1 && pages) return "space-between";
    if (page === 1) return "flex-end";
    if (pages) return "flex-start";
  };

  return (
    <div
      className={styles.container}
      style={{ justifyContent: justifyContent() }}
    >
      {page !== 1 ? (
        <Link href={prevPath} passHref>
          <button className={styles.pagingBtn}>
            <svg className={styles.icon}>
              <Icon icon="arrow-left" />
            </svg>
            <span className={styles.btnText}>Page {page - 1}</span>
          </button>
        </Link>
      ) : (
        ""
      )}
      {pages ? (
        <Link href={nextPath} passHref>
          <button className={styles.pagingBtn}>
            <span className={styles.btnText}>Page {page + 1}</span>
            <svg className={styles.icon}>
              <Icon icon="arrow-right" />
            </svg>
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paging;
