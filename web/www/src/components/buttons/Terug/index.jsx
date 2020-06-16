import React from "react";
import styles from "./Terug.module.css";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";

const Terug = ({path}) => {


  return (
    <NavLink
    className={styles.nav_li}
    activeClassName={styles.active}
    to={path}
  >
    <div className={`${styles.nav_button} ${styles.terug_button}`}>
    </div>
    <p className={styles.nav_tekst}>Terug</p>
  </NavLink>
  );
};

export default Terug;
