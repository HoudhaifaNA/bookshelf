import styles from "./FormGroup.module.css";

const FormGroup = ({ error, value, getEmail }) => {
  return (
    <div className={styles.group}>
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        type="email"
        value={value}
        placeholder="Email"
        id="email"
        className={styles.input}
        required
        onChange={(e) => getEmail(e.target.value)}
      />
      {error ? <span className={styles.error}>Invalid email</span> : ""}
    </div>
  );
};

export default FormGroup;
