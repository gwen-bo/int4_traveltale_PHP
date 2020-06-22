import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import UncontrolledLottie from "../OnboardingIntro/UncontrolledLottie";

import styles from "./OnboardingPlezier.module.css";

const OnboardingPlezier = () => {
  return (
    <>
      <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
      <div className={styles.center}>
        <div className={styles.wrapper}>
          <div className={styles.img_bol}>
            <UncontrolledLottie className={styles.animatie_circle} props="feest" />
          </div>
          <div className={styles.right}>
            <div className={styles.text}>
              <h1 className={styles.title}>Veel plezier met Travel Tale!</h1>
              <p className={styles.uitleg}>
              Vergeet niet, <br></br>klik op <span className={styles.icon}>‘Help’</span> wanneer je even hulp nodig hebt.</p>
              
            </div>
            <div className={styles.bot}>
              <div className={styles.bollen}>
              <ul className={styles.list}>
                <li className={styles.list_item}></li>
                <li className={styles.list_item}></li>
                <li className={styles.list_item}></li>
                <li className={styles.list_item_active}>4</li>
              </ul>
              </div>
              <div className={styles.buttons}>
              <Link className={styles.button_sec} to={ROUTES.onboardingKnoppen}>
                Vorige
              </Link>
              <Link className={styles.button} to={ROUTES.inloggen}>
                Inloggen
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPlezier;
