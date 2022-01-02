import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Navigation.module.css";
import SearchBar from "./SearchBar";
import Icon from "../Icon";

const Navigation = () => {
  const router = useRouter();
  const [width, setWidth] = useState();
  const [searchBar, setSearchBar] = useState(false);
  const { search } = useContext(GlobalContext);
  const [term, setTerm] = search;

  ////////////////////////
  // Set width if reloaded or resized
  useEffect(() => {
    if (window.innerWidth > 768) setSearchBar(true);
    setWidth(window.innerWidth);
  }, []);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 768) return setSearchBar(true);
    });
  }

  ////////////////////////
  // Handle Searching
  const onSearch = () => {
    if (term.length !== 0 && searchBar) {
      router.push(
        `/books?q=${term.trim().split(" ").join("+")}&filter=intitle`
      );
      if (width <= 768) setSearchBar(false);
    }
    if (!searchBar) setSearchBar(true);
  };

  const handleSearchClick = () => {
    if (width <= 768) setSearchBar(!searchBar);
    onSearch();
  };

  ////////////////////////
  // Render list depending on width
  const renderList = () => {
    if (width <= 768) {
      return (
        <>
          <li className={styles.smallItem} onClick={handleSearchClick}>
            <svg className={styles.icon}>
              <Icon icon="search" />
            </svg>
          </li>
          <li className={styles.smallItem}>
            <svg className={styles.icon}>
              <Icon icon="user-circle" />
            </svg>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={styles.navItem}>
            <Link href="/login">Login</Link>
          </li>
          <li className={styles.navItem}>
            <button className="primary-btn">Sign up</button>
          </li>
        </>
      );
    }
  };

  ////////////////////////
  return (
    <div className={styles.nav}>
      <Link href="/" passHref>
        <a className={styles.logo}> Bookshelf.</a>
      </Link>
      {searchBar ? <SearchBar onSearch={onSearch} /> : ""}
      <ul className={styles.navList}>{renderList()}</ul>
    </div>
  );
};

export default Navigation;
