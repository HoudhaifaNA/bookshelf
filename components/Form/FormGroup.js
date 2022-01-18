import styles from "./FormGroup.module.css";

const FormGroup = ({ value, getEmail }) => {
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
    </div>
  );
};

export default FormGroup;
