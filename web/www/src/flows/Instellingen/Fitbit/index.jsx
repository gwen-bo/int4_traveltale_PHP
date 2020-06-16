import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Fitbit.module.css";

import logo_fitbit from "../../../assets/img/logo_fitbit.svg"




const Fitbit = () => {

  return useObserver(() => (
  <>
   <div className={styles.pos}>
      <p className={styles.title}>Extra gegevens:</p>
      <p  className={styles.text}>Je bent ingelogd met jouw Fitbit account. <br></br>
      Om wijzigingen aan te brengen in jouw Fitbit account, verwijzen we je door naar de site van Fitbit. Klik op het logo om doorverwezen te worden.
      </p>
      <button className={styles.button_fitbit}>
            <a hef="https://www.fitbit.com/" ><img className={styles.fitbit_logo} src={logo_fitbit} alt=""/></a>
      </button>
      </div>

      <div className={styles.pos}>
            <p className={styles.title}>Toegang tot Fitbit account intrekken</p>
            <p  className={styles.text}>Je bent ingelogd met jouw Fitbit account. <br></br>
            Wanneer je de toegang tot jouw Fitbit account intrekt, kan je je niet meer inloggen tot deze opnieuw gegeven is. <br></br> Travel Tale is enkel functioneel wanneer het aantal stappen gemeten kan worden.
            </p>
            <button className={styles.button}>
                  Toegang intrekken
            </button>
      </div>
   </>
  ));
};

export default Fitbit;
