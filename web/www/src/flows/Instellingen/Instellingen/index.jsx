import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Navigatie from "../../../components/Navigatie";
import styles from "./Instellingen.module.css";
import Profiel from "../Profiel";
import Weergave from "../Weergave";
import Fitbit from "../Fitbit";

const Instellingen = () => {
  const [view, setView] = useState("profiel");

  return useObserver(() => (
    <>
      <Navigatie />
      <div className={styles.center}>
        <div className={styles.wrapper}>
          <article className={styles.instellingen_pos}>
            <div className={styles.instellingen_intro}></div>
            <div className={styles.switchNav}>
              <div className={styles.switch}>
                <button
                  className={
                    view === "profiel"
                      ? `${styles.button_active}`
                      : `${styles.button_nav}`
                  }
                  onClick={(e) => setView("profiel")}
                >
                  {view === "profiel" ? (
                    <img src={'/assets/img/instellingen/profiel_actief.svg'} alt="profiel icon" />
                  ) : (
                    <img src={'/assets/img/instellingen/profiel.svg'} alt="profiel icon" />
                  )}
                  <p className={styles.button_text}>Profiel</p>
                </button>
                <button
                  className={
                    view === "weergave"
                      ? `${styles.button_active}`
                      : `${styles.button_nav}`
                  }
                  onClick={(e) => setView("weergave")}
                >
                  {view === "weergave" ? (
                    <img src={'/assets/img/instellingen/weergave_actief.svg'} alt="weergave icon" />
                  ) : (
                    <img src={'/assets/img/instellingen/weergave.svg'} alt="weergave icon" />
                  )}
                  <p className={styles.button_text}>Weergave</p>
                </button>
                <button
                  className={
                    view === "fitbit"
                      ? `${styles.button_active}`
                      : `${styles.button_nav}`
                  }
                  onClick={(e) => setView("fitbit")}
                >
                  {view === "fitbit" ? (
                    <img src={'/assets/img/instellingen/fitbit_actief.svg'} alt="fitbit icon" />
                  ) : (
                    <img src={'/assets/img/instellingen/fitbit.svg'} alt="fitbit icon" />
                  )}
                  <p className={styles.button_text}>Fitbit</p>
                </button>
              </div>
              <div className={styles.inhoud}>
                <h1 className={styles.title}>Instellingen</h1>
                {view === "profiel" ? (
                  <Profiel />
                ) : view === "weergave" ? (
                  <Weergave />
                ) : (
                  <Fitbit />
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  ));
};

export default Instellingen;
