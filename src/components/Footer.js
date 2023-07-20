import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = ({ setOpenForm }) => {
  return (
    <div className={styles.footerWrap}>
      <Link to="/">
        <div className={styles.icon}>
          <i class="fa-solid fa-house"></i>
        </div>
      </Link>
      <div
        onClick={() => {
          setOpenForm(true);
        }}
        className={styles.icon}
      >
        <i class="fa-solid fa-circle-plus"></i>
      </div>
      <Link to="/profile">
        <div className={styles.icon}>
          <i class="fa-solid fa-user-large"></i>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
