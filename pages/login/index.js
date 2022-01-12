import styles from "../../styles/AuthPage.module.css";
import Form from "../../components/Form/Form";
import Icon from "../../components/Icon";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const Login = () => {
  const { notification } = useContext(GlobalContext);
  const [content, toggleNotification] = notification;

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
        <h1 className={styles.title}>Sign in to your account</h1>
        <Form textContent={"Sign in"} url="/user/login" />
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {

//   return {
//     redirect: {
//       permanent: false,
//       destination: "/",
//     },
//     props: {},
//   };
// };

export default Login;
