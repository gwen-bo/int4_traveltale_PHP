import React, { useState } from "react";
import { useParams } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import { useEffect } from "react";

import styles from "./Optie2.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";

import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
import oma from "../../../assets/img/oma_uitleg.svg"
import LottieUitleg from "../LottieUitleg";



const Optie2 = () => {
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
   <Terug path={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`}/>
   <Rugzak/>
   <div className={styles.midden}>
      <div className={styles.reis_title}>
            <img src={hangers}></img>
            <p className={styles.bestemming_naam}> {activiteit.naam}</p>
      </div>
  </div>
   <AantalStappen/>
   </div>
   <div className={styles.background_img}>
   <img className={styles.img_activiteit} src={require(`../../../assets/img/activiteiten/${activiteit.header_img}/optie_2.svg`)} alt="achtergrondfoto van de activiteit"/>
   </div>

   <div className={styles.oma_ballon}>
   <div className={styles.oma_img}>
      < LottieUitleg 
     props="uitleg"
     />
     </div>     
    <div className={styles.oma_box}>
        <p className={styles.oma_title}>{activiteit.optie2.titel}</p>
        <p className={styles.oma_text}>{activiteit.optie2.tekst}</p>
        <Link className={styles.button} to={`${ROUTES.einde.to}${activiteit.id}`}>
          {activiteit.optie2.button}
        </Link>
      </div>
   </div>

  </>
  );
  
};

export default Optie2;