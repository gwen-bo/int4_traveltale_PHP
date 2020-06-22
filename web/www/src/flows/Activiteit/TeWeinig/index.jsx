import React, { useState, useEffect } from "react";
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
import LottieUitleg from "../LottieUitleg";
import LottieActiviteit from "../Intro/LottieActiviteit";
// import omaUitleg from "../../../assets/img/oma_uitleg.svg"


const TeWeinig = () => {
    const { id } = useParams();
    const { activiteitenStore, uiStore} = useStores();
  
  const STATE_LOADING = "aan het laden"; 
  const STATE_FULLY_LOADED = "volledig geladen"; 
  const STATE_DOES_NOT_EXIST = "bestaat niet"; 
  
  const [activiteit, setActiviteit] = useState(activiteitenStore.getActiviteitById(id))
  const [state, setState] = useState(activiteit ? STATE_FULLY_LOADED : STATE_LOADING); 
  
  
  useEffect (() => {
    const loadActiviteit = async (id) => {
      try {
      const activiteit = await activiteitenStore.getActiviteitById(id);
      if(!activiteit){
        setState(STATE_DOES_NOT_EXIST)
      }
      setActiviteit(activiteit)
      setState(STATE_FULLY_LOADED)
    }catch (error){
      if(error.response && error.response.status === 400){
        setState(STATE_DOES_NOT_EXIST)
      }
    }
    };
    loadActiviteit(id);
  
  }, [id, activiteitenStore, setActiviteit])
  
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

   <div className={styles.img_activiteit}>
   <div className={styles.img_activiteit}>
    < LottieActiviteit name={activiteit.header_img} place="teweinig" />
  </div>
  </div>
  
   <div className={styles.oma_ballon}>
   <div className={styles.oma_img}>
      < LottieUitleg 
     props="teleurstelling"
     />
     </div> 
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