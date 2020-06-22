import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "../OnboardingIntro/UncontrolledLottie";

import styles from "./OnboardingKnoppen.module.css";

const OnboardingKnoppen = () => {
  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <div className={styles.img_bol}>
          <UncontrolledLottie className={styles.animatie_circle} props="knoppen" />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <h1 className={styles.title}>Zo werken de knoppen:</h1>
            <p className={styles.uitleg}>
              In Travel Tale zitten enkele soorten knoppen waar je op kan klikken.
            </p>
            <ol>
              <li className={styles.uitleg}>De menu-knoppen die geel worden als je er op hebt geklikt.</li>
              <li className={styles.uitleg}>Witte en zwarte afgeronde knoppen.</li>
              <li className={styles.uitleg}>Knoppen die een geel randje krijgen als je er op klikt.</li>
            </ol>
          </div>
          <div className={styles.bot}>
            <div className={styles.bollen}>
            <ul className={styles.list}>
              <li className={styles.list_item}></li>
              <li className={styles.list_item}></li>
              <li className={styles.list_item_active}>3</li>
              <li className={styles.list_item}></li>
            </ul>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.button_sec} to={ROUTES.onboardingHulp}>
                Vorige
              </Link>
              <Link className={styles.button} to={ROUTES.onboardingPlezier}>
                Volgende
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OnboardingKnoppen;
