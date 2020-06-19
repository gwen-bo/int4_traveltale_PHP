import React from "react";
import { useStores } from "../../hooks";

import { useHistory } from "react-router-dom";


import styles from "./Wandelplezier.module.css";
import Rugzak from "../buttons/Rugzak";
import AantalStappen from "../AantalStappen";
import test from "../../assets/img/Fitbit_uitleg.svg";
import stappenIcon from "../../assets/img/stappenIcon.svg";

import arrowTo from "../../assets/img/arrow_to.svg";
import LottieFeedback from "../Feedback/LottieFeedback";


const Wandelplezier = () => {
    const history = useHistory();
    const {uiStore} = useStores();
    const stappen = uiStore.currentSteps;

  return (
    <>

    <div className={styles.nav_wrapper}>
      <button className={styles.nav_li}>
          <div className={`${styles.nav_button} ${styles.terug_button}`}>
          </div>
          <p className={styles.nav_tekst}>Terug</p>
      </button>

      <Rugzak />
      <AantalStappen />
    </div>
    <div className={styles.uitleg}>
          <div className={styles.filmpjes}>
            <div className={styles.bol_ipad}><LottieFeedback props="ipad"/></div>
            <img className={styles.arrow_to} src={arrowTo} alt="uitleg over de fitbit"/>
            <div className={styles.bol_oma}><LottieFeedback props="wandelt"/></div>

          </div>
          <div className={styles.text}>
            <p className={styles.title}>Veel wandelplezier!</p>
              <p className={styles.text_bot}>Bij Travel Tale maken we gebruik van de Fitbit. Een Fitbit is een sporthorloge dat onder andere jouw stappen telt en je hartslag meet.</p>
              <p>Om jou een onvergetelijke reiservaring te bieden, moeten we weten hoeveel stappen je doorheen de dag zet. Voorlopig werken we daarvoor enkel met Fitbit.</p>
              <div className={styles.button_wrapper}>

              <button onClick={() => {history.goBack();}} className={styles.butotn_terug}>Terug</button>
              <button className={styles.button_stappen}>Stappen inzetten <img className={styles.button_stappen_icon} src={stappenIcon} alt="stappen icon"/> </button>
             
              
              </div>
              
          </div>
    </div>
    </>
  );
};

export default Wandelplezier;
