import React from "react";
import { Link, useHistory } from "react-router-dom";
import {ROUTES} from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg"

import styles from "./Registratie_welkom.module.css";
import { useState } from "react";

const Welkom = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;

  const history = useHistory();

  const handleLink = (feedbackLink) => {
    console.log(feedbackLink);
    uiStore.setFeedback(feedbackLink);
  }

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Welkom</h1>
        <p className={styles.uitleg}>Vooraleer we je aanmelden, zullen we in de volgende stappen Travel Tale aanpassen naar jouw persoonlijke voorkeuren.</p>

    </div>

        <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Vorige</button>
            <Link className={styles.button} to={ROUTES.feedback} onClick={e => (handleLink({
  title: 'Wat gaat voor jou het best?', 
  uitleg: 'Om jou een optimale ervaring te kunnen aanbieden, passen we onze app aan, naar jouw voorkeur!',
  animation: 'vergrootglas',
  sec_path: '', 
  sec_name: 'Vorige',
  prim_path: ROUTES.fontsize,
  prim_name: 'Volgende'}))}>Volgende</Link>
        </div>

    </section>
    </>
  );
};

export default Welkom;
