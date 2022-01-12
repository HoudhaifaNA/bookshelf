import { useRouter } from "next/router";
import { createContext, useState } from "react";
import isLoggedIn from "../middleware/isLoggedIn";

export const GlobalContext = createContext();

export function ContextWrapper({ children }) {
  const [term, setTerm] = useState("");
  const [modalOpen, toggleModal] = useState(false);
  const [content, toggleNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState("");

  const seeStatus = async () => {
    const status = await isLoggedIn();
    setLoggedIn(status);
  };
  seeStatus();
  // const router = useRouter();
  // if (router.pathname === "/login" || router.pathname.startsWith("/confirm")) {
  //   if (loggedIn) location.assign("/");
  // }

  return (
    <GlobalContext.Provider
      value={{
        search: [term, setTerm],
        modal: [modalOpen, toggleModal],
        notification: [content, toggleNotification],
        loggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
