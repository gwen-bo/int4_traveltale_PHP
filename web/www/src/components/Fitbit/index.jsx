import React from "react";
// import {ROUTES} from "../../consts";
import { useObserver } from "mobx-react-lite";
import Navigatie from "../Navigatie";
import styles from "./Fitbit.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

import logo_fitbit from "../../assets/img/logo_fitbit.svg"




const Fitbit = () => {



  return useObserver(() => (
  <>
   <div className={styles.pos}>
      <p className={styles.title}>Extra gegevens:</p>
      <p  className={styles.text}>Je bent ingelogd met jouw Fitbit account. <br></br>
      Om wijzigingen aan te brengen in jouw Fitbit account,  verwijzen we je door naar de site van Fitbit. Klik op het logo om doorverwezen te worden.
      </p>
      <button className={styles.button_fitbit}>
            <img className={styles.fitbit_logo} src={logo_fitbit} alt=""/>
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
