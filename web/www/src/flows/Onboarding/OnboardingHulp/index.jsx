import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "../OnboardingIntro/UncontrolledLottie";

import styles from "./OnboardingHulp.module.css";

const OnboardingHulp = () => {
  return (
    <>
      <img src={logo} alt="logo Travel Tale"></img>
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <div className={styles.img_bol}>
          <UncontrolledLottie className={styles.animatie_circle} props="help" />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
          <h1 className={styles.title}>Hulp nodig? Klik op het vraagteken! </h1>
          <p className={styles.uitleg}>
            Loop je verloren in de app? <br></br>Klik dan op de <span className={styles.icon}>‘Help’ </span> knop, die je rechts onderaan het scherm vindt! 
          </p>
            
          </div>
          <div className={styles.bot}>
            <div className={styles.bollen}>
              <ul className={styles.list}>
                <li className={styles.list_item}></li>
                <li className={styles.list_item_active}>2</li>
                <li className={styles.list_item}></li>
                <li className={styles.list_item}></li>
              </ul>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.button_sec} to={ROUTES.onboardingDownload}>
              Vorige
              </Link>
              <Link className={styles.button} to={ROUTES.onboardingKnoppen}>
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

export default OnboardingHulp;
