import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.headingPrimary}>
          The only place you need, when you think about books
        </h1>
        <h3 className={styles.headingSecondary}>
          Search any book you want and get all its informations with the ability
          to save it to your collection
        </h3>
        <Link href="/login" passHref>
          <button className="primary-btn">Get started today</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
