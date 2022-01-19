/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Router, useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export function ContextWrapper({ children }) {
  const [term, setTerm] = useState("");
  const [modalOpen, toggleModal] = useState(false);
  const [bookSelected, selectBook] = useState({
    title: "",
    author: "",
    thumbnail: "",
    status: "",
    id: "",
  });
  const [content, toggleNotification] = useState();
  const [loggedIn, setLoggedIn] = useState("");
  const [books, setUserBooks] = useState([]);
  const [filteredArr, filterBooks] = useState();

  const seeStatus = async () => {
    const res = await axios(`/api/user/isLoggedIn`);
    if (res.data.currentUser) {
      setUserBooks(res.data.currentUser.books);
      return setLoggedIn(true);
    }
    return setLoggedIn(false);
  };

  useEffect(() => {
    seeStatus();
  }, [, modalOpen]);

  useEffect(() => {
    toggleModal(false);
  }, [useRouter().asPath]);

  return (
    <GlobalContext.Provider
      value={{
        search: [term, setTerm],
        modal: [modalOpen, toggleModal],
        book: [bookSelected, selectBook],
        notification: [content, toggleNotification],
        userBooks: books,
        filteredBooks: [filteredArr, filterBooks],
        loggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
