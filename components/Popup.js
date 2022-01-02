import { useState } from "react";

import styles from "./Popup.module.css";
import Icon from "./Icon";

const statuses = ["To read", "Reading", "Have read"];

const Popup = ({ toggleModal }) => {
  const [status, setStatus] = useState("To read");

  const renderStatus = () => {
    return statuses.map((el) => {
      const selected = el === status;
      return (
        <div
          key={el}
          id={selected ? styles.statusChecked : ""}
          onClick={() => setStatus(el)}
        >
          {selected ? (
            <div className={styles.checkedContainer}>
              <svg className={styles.checked}>
                <Icon icon="checked" />
              </svg>
            </div>
          ) : (
            ""
          )}
          <h3>{el}</h3>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.close} onClick={() => toggleModal(false)}>
        <svg>
          <Icon icon="close" />
        </svg>
      </div>
      <div className={styles.statuses}>{renderStatus()}</div>
      <div className={styles.action}>
        <button className={styles.button}>Save</button>
      </div>
    </div>
  );
};

export default Popup;
