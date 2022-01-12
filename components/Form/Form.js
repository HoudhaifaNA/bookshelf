import axios from "axios";
import { useState, useContext } from "react";

import FormGroup from "./FormGroup";
import styles from ".//Form.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const customStyle = { width: "100%", borderRadius: ".5rem", padding: "1rem 0" };

const Form = ({ textContent, url }) => {
  const [email, setEmail] = useState("");
  const getEmail = (value) => setEmail(value);
  const { notification } = useContext(GlobalContext);

  const [content, toggleNotification] = notification;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup value={email} getEmail={getEmail} />
      <button type="submit" className="primary-btn" style={customStyle}>
        {textContent}
      </button>
    </form>
  );
};

export default Form;
