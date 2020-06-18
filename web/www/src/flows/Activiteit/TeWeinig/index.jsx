import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";

import styles from "./TeWeinig.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";

/* images */
// import begin from "../../../assets/img/activiteiten/steden/Ninh Binh/tempel/begin.svg"
import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
// import omaUitleg from "../../../assets/img/oma_uitleg.svg"


const TeWeinig = () => {
  const {uiStore} = useStores();
  const {dataStore} = useStores();
  const currentProfile = uiStore.currentProfile;

  const history = useHistory();

  const handleLink = (feedbackLink) => {
    console.log(feedbackLink);
    uiStore.setFeedback(feedbackLink);
  }


  
  return useObserver (() =>

   <>
    <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <div className={styles.midden}>
      <div className={styles.reis_title}>
            <img src={hangers}></img>
            <p className={styles.bestemming_naam}> Tempelbezoek</p>
      </div>
  </div>
   <AantalStappen/>
   </div>
   <div>
     {/* <img className={styles.img_activiteit} src={begin} alt=""/> */}
   </div>

   <div className={styles.oma_ballon}>
      {/* <img className={styles.oma_img} src={omaUitleg} alt=""/> */}
      <div className={styles.oma_box}>
        <p className={styles.oma_title}>Ai, je hebt nog niet genoeg stappen gezet.</p>
        <p className={styles.oma_text}>Je komt nog <span className={styles.bold}>x stappen</span> tekort. Tijd om een wandeling te maken?</p>
        <div className={styles.btton_pos}>
            <button className={styles.button}>Terug naar Sa Pa</button>
            <button className={styles.button}>Ik ga wandelen</button>
          </div>
      </div>
   </div>

  </>
  );
  
};

export default TeWeinig;