import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import styles from "./StadDetail.module.css";

// import rooftopbar from "../../assets/img/rooftopbar.svg"
// import treinstraat from "../../assets/img/treinstraat.svg"
import step from "../../assets/img/reisaanbod/niveau1.svg"
import Terug from "../buttons/Terug";
import AantalStappen from "../AantalStappen";

import hang from "../../assets/img/reisoverzicht/hangers.svg"
import kaart from "../../assets/img/kaart.svg"


// import style from "./StadDetail.module.css";

const StadDetail = () => {
  const {stedenStore} = useStores();

  const { id } = useParams();
  console.log(id);

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [stad, setStad] = useState(stedenStore.getStadById(id));
  const [state, setState] = useState(stad ? STATE_LOADING_MORE_DETAILS : STATE_LOADING);

  useEffect(() => {
    const loadStad = async (id) => {
      try {
        const stad = await stedenStore.getStadById(id);
        if (!stad) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setStad(stad);
        setState(STATE_LOADING_MORE_DETAILS);
        console.log('loading steden');
        await stedenStore.loadActiviteitenVanStad(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadStad(id);
  }, [ id, stedenStore, setStad ]);

  return (
   <>
   <section>

        <div className={styles.nav}>
               <Terug path={``} />
               <div className={styles.nav_stad}>
                  <img src={hang} alt=""/>
                  <p className={styles.stad_naam}>Hanoi</p>
               </div>
               <AantalStappen/>

        </div>
        <img className={styles.kaart} src={kaart} alt=""/>

<div className={styles.activiteiten}>
        {stad.activiteiten.map(
            activiteit => (
              // console.log(activiteit)
                <div key ={activiteit.id}className={styles.activiteit}>
                  <img className={styles.img_act} src={""} alt=""/>
                  <p className={styles.activiteit_title}>{activiteit.naam}</p>
                  <div className={styles.text_but_pos}>
                    <p className={`${styles.activiteit_text}`}>{activiteit.activiteit_uitleg}</p>
                    <div className={styles.pos}>
                      <div className={styles.steps}>
                          <img  src={step} alt=""/>
                          <p className={styles.steps_aantal}>{activiteit.max_steps}</p>
                      </div>
                      <button className={styles.button}>Starten</button>
                    </div>
                  </div>
                </div>        

          )
        )}
</div>
   </section>
   </>
  );
};

export default StadDetail;
