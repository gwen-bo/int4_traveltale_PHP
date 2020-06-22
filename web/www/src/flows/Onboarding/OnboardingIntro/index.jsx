import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "./UncontrolledLottie";

import styles from "./Onboarding1.module.css";

const Onboarding1 = () => {
  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <div className={styles.img_bol}>
          <UncontrolledLottie className={styles.animatie_circle} props="zwaaien" />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <h1 className={styles.title}>Welkom bij Travel Tale!</h1>
            <p className={styles.uitleg}> Ga met je Fitbit op stap en ontgrendel jouw droomreis op Travel Tale! <br></br>Klik op de knop <span className={styles.strong}>‘Geef mij wat uitleg’</span> om Travel Tale beter te leren kennen!
            </p>
            
          </div>
          <div className={styles.bot}>
           
            <div className={styles.buttons}>
              <Link className={styles.button_sec} to={ROUTES.inloggen}>
                Overslaan
              </Link>
              <Link className={styles.button} to={ROUTES.onboardingDownload}>
              Geef mij wat uitleg
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Onboarding1;
