import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {ROUTES} from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg"
import animatie from "../../../assets/img/animatie.png"

import styles from "./Registratie.module.css";
import LottieFeedback from "../../../components/Feedback/LottieFeedback";

const Registratie = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;
 
  const history = useHistory();

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Blij dat je er bent!</h1>
        <p className={styles.uitleg}>Bij Travel Tale werken we met Fitbit, dus kan je je simpel registreren en inloggen met je Fitbit account!</p>
        <Link className={styles.button_uitleg} to={ROUTES.uitlegFitbit}>Ik heb geen Fitbit</Link>
    </div>
    <LottieFeedback
          props="zwaaien"
    />
        <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Vorige</button>
            <Link className={styles.button} to={ROUTES.welkom}>Registreren</Link>
        </div>

    </section>
    </>
  );
};

export default Registratie;
