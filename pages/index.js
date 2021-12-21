import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.headingPrimary}>
        The only place you need, when you think about books
      </h1>
      <h3 className={styles.headingSecondary}>
        Search any book you want and get all its informations with the ability
        to save it to your collection
      </h3>
      <button className="primary-btn">Get started today</button>
    </div>
  );
};

export default Home;
