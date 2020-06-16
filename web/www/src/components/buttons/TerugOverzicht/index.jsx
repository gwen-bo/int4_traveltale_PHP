import React from "react";
import styles from "./TerugOverzicht.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

const TerugOverzicht = () => {


  return (
    <Link
      className={styles.back}
      to={ROUTES.reisaanbod}
    >
      <div className={`${styles.nav_button} ${styles.mijn_reis}`}>
            </div>
            <p className={styles.nav_tekst}>Terug naar overzicht</p>
    </Link>
  );
};

export default TerugOverzicht;
