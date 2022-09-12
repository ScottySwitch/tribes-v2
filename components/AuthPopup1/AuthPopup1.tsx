import classNames from "classnames";
import Button from "components/Button/Button";
import { useRouter } from "next/router";
import styles from "./AuthPopup1.module.scss";
interface AuthPopup1Props {
  className?: string;
}

const AuthPopup1 = (props: AuthPopup1Props) => {
  const { className } = props;

  const router = useRouter();

  return (
    <div className={classNames(styles.popup_deal, className)}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Log in or Sign up now to explore our exclusive deals
        </h1>
      </div>
      <div className={styles.options}>
        <Button
          onClick={() => router.push("/login")}
          className={styles.button}
          text="Log in"
          backgroundColor="#3FAEFF"
          size="medium"
        />
        <Button
          onClick={() => router.push("/signup")}
          className={styles.button}
          variant="outlined"
          text="Sign up"
        />
      </div>
    </div>
  );
};

export default AuthPopup1;
