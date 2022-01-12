import styles from "../../styles/AuthPage.module.css";
import Form from "../../components/Form/Form";
import { useRouter } from "next/router";
import Icon from "../../components/Icon";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const Login = () => {
  const { notification } = useContext(GlobalContext);
  const [content, toggleNotification] = notification;
  const router = useRouter();
  const { token } = router.query;

  return (
    <div className={styles.page}>
      {content !== null ? (
        <div className={styles.notification}>
          <div className={styles.icon}>
            <svg className={styles[content.type]}>
              <Icon icon={content.type} />
            </svg>
          </div>
          <div className={styles.text}>
            <h2>{content.type}</h2>
            <p>{content.message}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.container}>
        <h1 className={styles.title}>Confirm your email</h1>
        <Form textContent={"Confirm"} url={`/auth/${token}`} />
      </div>
    </div>
  );
};

export default Login;
