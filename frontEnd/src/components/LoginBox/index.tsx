import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Connect and share your message </strong>

      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Access with Github
      </a>
    </div>
  );
}
