import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigatie.module.css";
import { ROUTES } from "../../consts";

const Navigatie = () => {
  return (
    <nav className={styles.navigatie_wrapper}>
        <NavLink to={ROUTES.home}><img className={styles.nav_logo} src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img></NavLink>
      <div className={styles.nav}>
          <NavLink
            className={styles.nav_li}
            activeClassName={styles.active}
            exact
            to={ROUTES.overzicht}
          >
            <div className={`${styles.nav_button} ${styles.mijn_reis}`}>
            </div>
            <p className={styles.nav_tekst}>Mijn reis</p>
          </NavLink>
          <NavLink
            className={styles.nav_li}
            activeClassName={styles.active}
            to={ROUTES.reisaanbod}
          >
            <div className={`${styles.nav_button} ${styles.reisaanbod}`}>
            </div>
            <p className={styles.nav_tekst}>Reisaanbod</p>
          </NavLink>
          <NavLink
            className={styles.nav_li}
            activeClassName={styles.active}
            exact
            to={ROUTES.instellingen}
          >
            <div className={`${styles.nav_button} ${styles.instellingen}`}>
            </div>
            <p className={styles.nav_tekst}>Instellingen</p>
          </NavLink>
      </div>
    </nav>
  );
};

export default Navigatie;