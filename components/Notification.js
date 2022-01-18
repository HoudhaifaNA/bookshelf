import styles from "./Notification.module.css";

import Icon from "./Icon";

const Notification = ({ type, message }) => {
  return (
    <div id={styles.notification}>
      <div className={styles.icon}>
        <svg className={styles[type]}>
          <Icon icon={type} />
        </svg>
      </div>
      <div className={styles.text}>
        <h2>{type}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
