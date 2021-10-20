import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";

export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Connect and share your message </strong>

      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Access with Github
      </a>
    </div>
  );
}
