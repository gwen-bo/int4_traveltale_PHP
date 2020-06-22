import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg";
import UncontrolledLottie from "./UncontrolledLottie";

import styles from "./OnboardingDownload.module.css";

const OnboardingDownload = () => {
  const history = useHistory();
  const { uiStore } = useStores();

  return (
    <>
    
    <img src={logo} alt="logo Travel Tale"></img>
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <div className={styles.img_bol}>
          <UncontrolledLottie className={styles.animatie_circle} props="pwa" />
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <h1 className={styles.title}>Download Travel Tale</h1>
            <p className={styles.uitleg}>
              Travel tale is niet enkel bereikbaar via het internet maar is ook downloadbaar! Lekker handig want zo hoef je niet altijd op zoek te gaan naar onze site.
            </p>
            <ol>
              <li className={styles.uitleg}>Druk op de <span className={styles.iconDeel}> 'Deel</span> knop in jouw browser.</li>
              <li className={styles.uitleg}>Druk op <span className={styles.iconPlus}></span> ‘Zet op beginscherm’.</li>
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
