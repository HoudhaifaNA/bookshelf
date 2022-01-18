import styles from "../../styles/AuthPage.module.css";
import Form from "../../components/Form/Form";

const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign in to your account</h1>
        <Form textContent={"Sign in"} url="/user/login" />
      </div>
    </div>
  );
};

export default Login;
