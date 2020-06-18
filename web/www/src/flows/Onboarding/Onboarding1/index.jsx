import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "./UncontrolledLottie";

import styles from "./Onboarding1.module.css";

const Onboarding1 = () => {
  const history = useHistory();
  const { uiStore } = useStores();

  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>

      <section className={styles.section}>
        <UncontrolledLottie
          className={styles.animatie_circle}
          props="zwaaien"
        />
        <div className={styles.section_header}>
          <h1 className={styles.title}>Welkom bij Travel Tale!</h1>
          <p className={styles.uitleg}>
            Ga met je Fitbit op stap en ontgrendel jouw droomreis op Travel
            Tale! Klik op de knop{" "}
            <span className={styles.strong}>‘Volgende’</span> om Travel Tale
            beter te leren kennen!
          </p>
          <ul className={styles.list}>
            <li className={styles.list_item_active}>1</li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
          </ul>
          <div className={styles.button_wrapper}>
          <button
            onClick={() => {
              history.goBack();
            }}
            className={styles.button_sec}
            to={ROUTES.home}
          >
            Vorige
          </button>
          <Link className={styles.button} to={uiStore.prim_path}>
            Volgende
          </Link>
        </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding1;
