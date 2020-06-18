import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {ROUTES} from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg"
import animatie from "../../../assets/img/animatie.png"

import styles from "./Aanmelden.module.css";

const Aanmelden = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;
 
  const history = useHistory();

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    <section className={styles.section}>
        <div>
        <h1 className={styles.title}>Blij dat je er weer bent!</h1>
        <p className={styles.uitleg}>We hebben geen extra gegevens meer nodig!</p>
        <p className={styles.uitleg}>Door op te knop te klikken, log je je direct in met je Fitbit account.</p>
    </div>
    <img className={styles.animatie_circle} src={animatie} alt="animatie"></img>

        <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Terug</button>
            <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%2Foverzicht%2F&scope=activity%20profile&expires_in=604800'}>Aanmelden</a>

        </div>

    </section>
    </>
  );
};

export default Aanmelden;
