import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";
import UncontrolledLottie from "./UncontrolledLottie";

import styles from "./OnboardingDownload.module.css";

const OnboardingDownload = () => {
  return (
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <div className={styles.img_bol}>
          <UncontrolledLottie className={styles.animatie_circle} props="pwa" />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <h1 className={styles.title}>Download Travel Tale</h1>
            <p className={styles.uitleg}>
              <span className={styles.uitleg_nadruk}>Maak je gebruik van een tablet? </span><br></br>Dan is Travel Tale niet enkel bereikbaar via het internet, je kan het ook downloaden! Lekker handig want zo hoef je niet altijd op zoek te gaan naar onze site.
            </p>
            <h2 className={styles.hidden}>Hoe kan je travel tale downloaden?</h2>
            <ol>
              <li className={styles.uitleg}>Druk op de <span className={styles.iconDeel}> </span> <span className={styles.uitleg_nadruk}>'Deel knop in jouw browser.</span></li>
              <li className={styles.uitleg}>Druk op <span className={styles.iconPlus}></span> <span className={styles.uitleg_nadruk}>‘Zet op beginscherm’.</span></li>
            </ol>
          </div>
          <div className={styles.bot}>
            <div className={styles.bollen}>
            <ul className={styles.list}>
            <li className={styles.list_item_active}>1</li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
          </ul>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.button_sec} to={ROUTES.home}>
                Vorige
              </Link>
              <Link className={styles.button} to={ROUTES.onboardingHulp}>
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

export default OnboardingDownload;
