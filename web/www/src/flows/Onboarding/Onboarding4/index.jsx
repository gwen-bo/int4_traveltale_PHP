import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "../Onboarding1/UncontrolledLottie";

import styles from "./Onboarding4.module.css";

const Onboarding1 = () => {
  const history = useHistory();
  const { uiStore } = useStores();

  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>

      <section className={styles.section}>
        <UncontrolledLottie className={styles.animatie_circle} props="feest" />
        <div className={styles.section_header}>
          <h1 className={styles.title}>Veel plezier met Travel Tale! </h1>
          <p className={styles.uitleg}>
            Vergeet niet, klik op de
            <span className={styles.icon}>‘Help’</span> knop wanneer je
            even hulp nodig hebt.
          </p>
          <ul className={styles.list}>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item_active}>4</li>
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
