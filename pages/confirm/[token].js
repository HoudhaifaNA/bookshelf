import { useRouter } from "next/router";

import styles from "../../styles/AuthPage.module.css";
import Form from "../../components/Form/Form";

const Login = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Confirm your email</h1>
        <Form textContent={"Confirm"} url={`/auth/${token}`} />
      </div>
    </div>
  );
};

export default Login;
