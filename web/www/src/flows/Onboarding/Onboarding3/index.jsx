import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "../Onboarding1/UncontrolledLottie";

import styles from "./Onboarding3.module.css";

const Onboarding1 = () => {
  const history = useHistory();
  const { uiStore } = useStores();

  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>

      <section className={styles.section}>
        <UncontrolledLottie className={styles.animatie_circle} props="knoppen" />
        <div className={styles.section_header}>
          <h1 className={styles.title}>Zo werken de knoppen:</h1>
          <p className={styles.uitleg}>
            In Travel Tale zitten enkele soorten knoppen waar je op kan klikken.
          </p>
          <ol className={styles.ol}>
            <li className={styles.li}><span className={styles.spacer}>1.</span> De menu-knoppen die geel worden als je er op hebt geklikt.</li>
            <li className={styles.li}><span className={styles.spacer}>2.</span> Witte en zwarte afgeronde knoppen.</li>
            <li className={styles.li}><span className={styles.spacer}>3.</span> Knoppen die een geel randje krijgen als je er op klikt.</li>
          </ol>
          <ul className={styles.list}>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item_active}>3</li>
            <li className={styles.list_item}></li>
          </ul>
          <div className={styles.button_wrapper}>
          <Link className={styles.button_sec} to={ROUTES.onboarding2}>
              Vorige
            </Link>
            <Link className={styles.button} to={ROUTES.onboarding4}>
              Volgende
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding1;
