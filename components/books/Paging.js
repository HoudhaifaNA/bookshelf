import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "../Icon";
import styles from "./Paging.module.css";

const Paging = ({ totalItems }) => {
  let justifyContent, prevButton, nextButton;
  const router = useRouter();

  const page = router.query.page * 1 || 1;
  const pages = page * 40 < totalItems;
  const url = router.asPath.split("&page")[0];
  const prevPath = `${url}&page=${page - 1}`;
  const nextPath = `${url}&page=${page + 1}`;

  if (page !== 1 && pages) justifyContent = "space-between";
  if (page === 1) justifyContent = "flex-end";

  if (page !== 1)
    prevButton = (
      <Link href={prevPath} passHref>
        <button className={styles.pagingBtn}>
          <svg className={styles.icon}>
            <Icon icon="arrow-left" />
          </svg>
          <span className={styles.btnText}>Page {page - 1}</span>
        </button>
      </Link>
    );

  if (pages)
    nextButton = (
      <Link href={nextPath} passHref>
        <button className={styles.pagingBtn}>
          <span className={styles.btnText}>Page {page + 1}</span>
          <svg className={styles.icon}>
            <Icon icon="arrow-right" />
          </svg>
        </button>
      </Link>
    );

  return (
    <div className={styles.container} style={{ justifyContent }}>
      {prevButton}
      {nextButton}
    </div>
  );
};

export default Paging;
