import Link from "next/link";

import SearchBar from "./SearchBar";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <Link href="/" passHref>
        <a className={styles.logo}> Bookshelf.</a>
      </Link>
      <SearchBar />
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/login">Login</Link>
        </li>
        <li className={styles.navItem}>
          <button className="primary-btn">Sign up</button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
