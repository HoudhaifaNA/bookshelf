import Navigation from "./Navigation";
import Meta from "../Meta";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />
      <Navigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
