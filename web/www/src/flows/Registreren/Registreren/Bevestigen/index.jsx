import React from "react";
import logo from "../../../assets/img/logo.svg"

import styles from "./Bevestigen.module.css";
import LottieFeedback from "../../../components/Feedback/LottieFeedback";

const Bevestigen = () => {

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    <section className={styles.section}>
        <div className={styles.section_header}>
          <h1 className={styles.title}>We zijn klaar!</h1>
          <p className={styles.uitleg}>Jouw account is nu volledig klaar om te gebruiken! </p> <p className={styles.uitleg}>Veel plezier! </p>
      </div>
      <LottieFeedback
          props="feest"
        />
        <div className={styles.button_wrapper}>
        <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Ftoken%2F&scope=activity%20profile&expires_in=31536000'}>Klaar</a>
        {/* <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM56&redirect_uri=https%3A%2F%2Fthawing-plains-60681.herokuapp.com%2Foverzicht&scope=activity%20profile&expires_in=31536000'}>Registreren</a> */}

        </div>

    </section>
    </>
  );
};

export default Bevestigen;
