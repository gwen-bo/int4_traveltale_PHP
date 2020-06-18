import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {ROUTES} from "../../../consts";
import { useStores } from "../../../hooks";
import logo from "../../../assets/img/logo.svg"
import animatie from "../../../assets/img/animatie.png"

import styles from "./Bevestigen.module.css";
import ProfileModel from "../../../models/ProfileModel";

const Bevestigen = () => {
  const {uiStore, authStore} = useStores();
  const currentProfile = uiStore.currentProfile;
  const [registerState, setregisterState] = useState(authStore.registerState)
  const history = useHistory();

  const handleRegister = () => {
    setregisterState("register")
    

  }

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    <section className={styles.section}>
        <div className={styles.section_header}>
          <h1 className={styles.title}>We zijn klaar!</h1>
          <p className={styles.uitleg}>Jouw account is nu volledig klaar om te gebruiken! </p> <p className={styles.uitleg}>Veel plezier! </p>
      </div>
    <img className={styles.animatie_circle} src={animatie} alt="animatie"></img>

        <div className={styles.button_wrapper}>
            <a className={styles.button} onClick={e => handleRegister()} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%2Foverzicht%2F&scope=activity%20profile&expires_in=604800'}>Klaar</a>
        </div>

    </section>
    </>
  );
};

export default Bevestigen;
