import { useContext } from "react";

import styles from "./Layout.module.css";

import { GlobalContext } from "../../context/GlobalContext";

import Navigation from "./Navigation";
import Meta from "../Meta";
import Notification from "../Notification";
import Popup from "../Popup";

const Layout = ({ children }) => {
  let showNotification;

  const { notification } = useContext(GlobalContext);
  const [content] = notification;

  if (content)
    showNotification = (
      <Notification type={content.type} message={content.message} />
    );

  return (
    <div>
      <Meta />
      <Navigation />
      <main className={styles.main}>
        {showNotification}
        {children}
        <Popup />
      </main>
    </div>
  );
};

export default Layout;
