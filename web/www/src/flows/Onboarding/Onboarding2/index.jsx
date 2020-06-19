import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "../Onboarding1/UncontrolledLottie";

import styles from "./Onboarding2.module.css";

const Onboarding2 = () => {
  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>

      <section className={styles.section}>
        <div className={styles.animatie_circle}>
        <UncontrolledLottie className={styles.animatie_circle} props="help" />
        </div>
        <div className={styles.section_header}>
          <h1 className={styles.title}>Hulp nodig? Klik op het vraagteken! </h1>
          <p className={styles.uitleg}>
            Loop je verloren in de app? <br></br>Klik dan op de <span className={styles.icon}>‘Help’ </span> knop, die je rechts onderaan het scherm vindt! 
          </p>
          <ul className={styles.list}>
            <li className={styles.list_item}></li>
            <li className={styles.list_item_active}>2</li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
          </ul>
          <div className={styles.button_wrapper}>
          <Link className={styles.button_sec} to={ROUTES.home}>
            Vorige
          </Link>
            <Link className={styles.button} to={ROUTES.onboarding3}>
              Volgende
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding2;
