import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Navigation.module.css";

import { GlobalContext } from "../../context/GlobalContext";

import SearchBar from "./SearchBar";
import Icon from "../Icon";
import axios from "axios";

const Navigation = () => {
  const router = useRouter();
  const [width, setWidth] = useState();
  const [searchBar, setSearchBar] = useState(false);
  const { search, loggedIn, notification } = useContext(GlobalContext);
  const [, toggleNotification] = notification;
  const [term] = search;

  ////////////////////////
  // Set width if reloaded
  useEffect(() => {
    if (window.innerWidth > 768) setSearchBar(true);
    setWidth(window.innerWidth);
  }, []);

  // Set width if reloaded   or resized
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 768) return setSearchBar(true);
    });
  }

  ////////////////////////
  // Handle Searching
  const onSearch = () => {
    // IF THERE IS A TERM AND SEARCHBAER IS TOGGLED
    if (term.length !== 0 && searchBar) {
      router.push(
        `/books?q=${term.trim().split(" ").join("+")}&filter=intitle`
      );
      // IF IT IS PHONE MODE THAN CLOSE AFTER SEARCH
      if (width <= 768) setSearchBar(false);
    }
    // IF IT IS PHONE MODE AND SEARCH BAR IS TOGGLED OFF, THEN TOGGLE IT ON
    if (!searchBar) setSearchBar(true);
  };

  const handleSearchClick = () => {
    // IF IT IS PHONE MODE TOGGLE SEARCH BAR
    if (width <= 768) setSearchBar(!searchBar);
    onSearch();
  };

  const navBtn = async () => {
    if (loggedIn) {
      try {
        await axios("/api/user/logout");
        location.assign("/");
      } catch (err) {
        toggleNotification({
          type: "error",
          message: err.response.data.message,
        });
      }
    } else if (!loggedIn) {
      router.push("/login");
    }
    setTimeout(() => {
      toggleNotification(null);
    }, 2000);
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
          {loggedIn ? (
            <li className={styles.smallItem}>
              <Link href="/mylibrary" passHref>
                <svg className={styles.icon}>
                  <Icon icon="bookmark" />
                </svg>
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className={styles.smallItem} onClick={navBtn}>
            <span>
              <svg className={styles.icon}>
                <Icon icon={loggedIn ? "logout" : "user-circle"} />
              </svg>
            </span>
          </li>
        </>
      );
    } else {
      return (
        <>
          {loggedIn ? (
            <li className={styles.navItem}>
              <Link href="/mylibrary" passHref>
                My library
              </Link>
            </li>
          ) : null}
          <li className={styles.navItem} onClick={navBtn}>
            <button className="primary-btn">
              {loggedIn ? "Logout" : "Sign up"}
            </button>
          </li>
        </>
      );
    }
  };

  let renderSearchBar = (place) => {
    if (
      (width > 768 && place === "inside") ||
      (width <= 768 && searchBar && place === "outside")
    ) {
      return <SearchBar onSearch={onSearch} />;
    }
  };
  ////////////////////////
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link href="/" passHref>
          <a className={styles.logo}> Bookshelf.</a>
        </Link>
        {renderSearchBar("inside")}
        <ul className={styles.navList}>{renderList()}</ul>
      </div>
      {renderSearchBar("outside")}
    </header>
  );
};

export default Navigation;
