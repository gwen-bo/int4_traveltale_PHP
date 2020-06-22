import React from "react";
import styles from "./FitbitUitleg.module.css";
import LottieFitbit from "./LottieFitbit";
import { useHistory } from "react-router";

const UitlegFitbit = () => {
  const history = useHistory();

  return (
   <>
    <img src={'assets/img/logo.svg'} alt="logo Travel Tale"></img>

<section className={styles.section}>
    <div className={styles.section_header}>
    <h1 className={styles.title}>Travel Tale <img src={'assets/img/love.svg'} alt=""/> Fitbit
    </h1>
    <div className={styles.uitleg}>
          <div className={styles.filmpjes}>
                <LottieFitbit
                  props="fitbit"
                  />
              <div className={styles.filmpjes_rij2}>
              <LottieFitbit
                  props="fitness"
                />
              <img className={styles.filmpje_down} src={'Fitbit_uitleg.svg'} alt="uitleg over de fitbit"/>
              </div>
          </div>
          <div className={styles.text}>
              <p className={styles.text_bot}>Bij Travel Tale maken we gebruik van de Fitbit. Een Fitbit is een sporthorloge dat onder andere jouw stappen telt en je hartslag meet.</p>
              <p>Om jou een onvergetelijke reiservaring te bieden, moeten we weten hoeveel stappen je doorheen de dag zet. Voorlopig werken we daarvoor enkel met Fitbit.</p>
              <div className={styles.button_wrapper}>
              <button onClick={() => {history.goBack();}}  className={styles.button}>Terug</button>
              <a href="https://www.fitbit.com/">
                <button className={styles.button_fitbit}>
                      <img src={'img/logo_fitbit.svg'} alt=""/>
                      <img className={styles.arrow} src={'img/arrow_W.svg'} alt=""/>
                </button>
              </a>
              
              </div>
              
          </div>
    </div>

</div>

   
</section>
   </>
  );
};

export default UitlegFitbit;
