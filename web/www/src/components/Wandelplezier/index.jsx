import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Wandelplezier.module.css";
import Rugzak from "../buttons/Rugzak";
import AantalStappen from "../AantalStappen";
import LottieFeedback from "../Feedback/LottieFeedback";
import Help from "../buttons/Help";


const Wandelplezier = () => {
    const history = useHistory();
  return (
    <>

    <div className={styles.nav_wrapper}>
      <button onClick={history.goBack()} className={styles.nav_li}>
          <div className={`${styles.nav_button} ${styles.terug_button}`}>
          </div>
          <p className={styles.nav_tekst}>Terug</p>
      </button>
      <Help />
      <Rugzak />
      <AantalStappen />
    </div>
    <div className={styles.uitleg}>
          <div className={styles.filmpjes}>
            <div className={styles.bol_ipad}><LottieFeedback props="ipad"/></div>
            <img className={styles.arrow_to} src={'/assets/img/arrow_to.svg'} alt="uitleg over de fitbit"/>
            <div className={styles.bol_oma}><LottieFeedback props="wandelplezier"/></div>

          </div>
          <div className={styles.text}>
            <h1 className={styles.title}>Veel wandelplezier!</h1>
              <h2 className={styles.text_bot}>Klaar om wat stappen te verzamelen? <br></br>Dan mag je nu gerust jouw tablet aan de kant leggen en genieten van je wandeling.</h2>
              <p>Wanneer je terug komt, zullen wij jouw nieuw stappen aantal ophalen zodat je direct weer verder kan gaan! </p>
              <div className={styles.button_wrapper}>

              <button onClick={() => {history.goBack();}} className={styles.butotn_terug}>Terug</button>
              <button className={styles.button_stappen}>Stappen inzetten <img className={styles.button_stappen_icon} src={'/assets/img/stappenIcon.svg'} alt="stappen icon"/> </button>
             
              
              </div>
              
          </div>
    </div>
    </>
  );
};

export default Wandelplezier;
