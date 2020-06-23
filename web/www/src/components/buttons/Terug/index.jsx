import React from "react";
import styles from "./Terug.module.css";
import { Link } from "react-router-dom";

const Terug = ({path}) => {


  return (
    <Link
    className={styles.nav_li}
    to={path}
  >
    <div className={`${styles.nav_button} ${styles.terug_button}`}>
    </div>
    <p className={styles.nav_tekst}>Terug</p>
  </Link>
  );
};

export default Terug;
