import React from "react";
import { useHistory } from "react-router-dom";
import {ROUTES} from "../../../consts";
import styles from "./Aanmelden.module.css";
import LottieFeedback from "../../../components/Feedback/LottieFeedback";
import Help from "../../../components/buttons/Help";

const Aanmelden = () => { 
  const history = useHistory();

  return (
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <Help />

    <section className={styles.section}>
        <div>
        <h1 className={styles.title}>Blij dat je er weer bent!</h1>
        <p className={styles.uitleg}>We hebben geen extra gegevens meer nodig!</p>
        <p className={styles.uitleg}>Door op te knop te klikken, log je je direct in met je Fitbit account.</p>
    </div>
    <LottieFeedback
          props="zwaaien"
        />
        <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Terug</button>
            <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Ftoken%2F&scope=activity%20profile&expires_in=31536000'}>Aanmelden</a>
            {/* <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM56&redirect_uri=https%3A%2F%2Fthawing-plains-60681.herokuapp.com%2Foverzicht&scope=activity%20profile&expires_in=31536000'}>Aanmelden</a> */}
       
        </div>
    </section>
    </>
  );
};

export default Aanmelden;
