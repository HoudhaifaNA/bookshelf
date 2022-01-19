import axios from "axios";
import { useState, useContext, useRef } from "react";

import FormGroup from "./FormGroup";
import styles from ".//Form.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const customStyle = { width: "100%", borderRadius: ".5rem", padding: "1rem 0" };

const Form = ({ textContent, url }) => {
  const [email, setEmail] = useState("");
  const submitRef = useRef();
  const { notification } = useContext(GlobalContext);
  const [, toggleNotification] = notification;

  const getEmail = (value) => setEmail(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      submitRef.current.textContent = `${textContent} ...`;
      const response = await axios.post(`/api${url}`, { email });
      toggleNotification({
        type: "success",
        message: response.data.message,
      });

      if (textContent === "Confirm") {
        setTimeout(() => {
          location.assign("/");
        }, 1000);
      }
    } catch (err) {
      toggleNotification({ type: "error", message: err.response.data.message });
    }
    submitRef.current.textContent = `${textContent}`;
    // setTimeout(() => {
    //   toggleNotification(null);
    // }, 2500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup value={email} getEmail={getEmail} />
      <button
        ref={submitRef}
        type="submit"
        className="primary-btn"
        style={customStyle}
      >
        {textContent}
      </button>
    </form>
  );
};

export default Form;
