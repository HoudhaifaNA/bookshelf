/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

import styles from "./Popup.module.css";
import Icon from "./Icon";
import { GlobalContext } from "../context/GlobalContext";

Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    zIndex: "50000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const statuses = ["To read", "Reading", "Have read"];

let renderStatus = (status, setStatus) => {
  return statuses.map((el) => {
    const selected = el === status;
    return (
      <div
        key={el}
        id={selected ? styles.statusChecked : ""}
        onClick={() => {
          if (el === status) return setStatus("");
          return setStatus(el);
        }}
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

const Popup = () => {
  let method, url;
  const { modal, book, userBooks } = useContext(GlobalContext);
  const [modalOpen, toggleModal] = modal;
  const { title, author, thumbnail, id: bookId } = book[0];
  const isSaved = userBooks.find((el) => el.bookId === bookId);

  const [status, setStatus] = useState("");
  useEffect(() => {
    if (isSaved) return setStatus(isSaved.status);
    return setStatus("");
  }, [modalOpen]);

  if (!isSaved && status !== "") {
    method = "POST";
    url = "/api/mybooks";
  } else if (isSaved && status !== "") {
    method = "PATCH";
    url = `/api/mybooks/${bookId}`;
  } else if (isSaved && status === "") {
    method = "DELETE";
    url = `/api/mybooks/${bookId}`;
  }

  const handleSubmit = async () => {
    try {
      await axios(url, {
        method,
        data: { title, author, thumbnail, bookId, status },
      });
      toggleModal(false);
    } catch (err) {
      if (err.response && err.response.status === 401)
        location.assign("/login");
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => toggleModal(false)}
      contentLabel="Popup modal"
      style={customStyles}
    >
      <div className={styles.container}>
        <div className={styles.close} onClick={() => toggleModal(false)}>
          <svg>
            <Icon icon="close" />
          </svg>
        </div>
        <div className={styles.statuses}>{renderStatus(status, setStatus)}</div>
        <div className={styles.action}>
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={!method ? "disabled" : ""}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
