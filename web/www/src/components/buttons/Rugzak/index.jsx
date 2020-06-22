import React from "react";
import styles from "./Rugzak.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

const Rugzak = () => {
  const history = useHistory();

  return (
    <NavLink
    className={styles.nav_li}
    activeClassName={styles.active}
    to={ROUTES.rugzak}
  >
    <div className={`${styles.nav_button} ${styles.rugzak_button}`}>
    </div>
    <p className={styles.nav_tekst}>Mijn rugzak</p>
  </NavLink>
  );
};

export default Rugzak;
