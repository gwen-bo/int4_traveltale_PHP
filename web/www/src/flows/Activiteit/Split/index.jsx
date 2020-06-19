import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import { useEffect } from "react";

import styles from "./Split.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";

import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
import steps from "../../../assets/img/stappenIcon.svg"
import oma from "../../../assets/img/oma_uitleg.svg"



const Split = () => {
    const { id } = useParams();
    const {uiStore , activiteitenStore} = useStores();
    const currentProfile = uiStore.currentProfile;
  
    const history = useHistory();
  
    const handleLink = (feedbackLink) => {
      console.log(feedbackLink);
      uiStore.setFeedback(feedbackLink);
    }
  
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
  
  const handleKeuze = (e, kost, optie) => {
    // e.preventDefault();
    const stappen = uiStore.currentUser.stappen;
    if(stappen > kost){
      const updateStappen = (stappen - kost);
      uiStore.currentUser.setCurrentStappen(updateStappen);
      if(optie === 'optie1'){
        return <Redirect to={`${ROUTES.optie1}${activiteit.id}`} />
      }else {
        return <Redirect to={`${ROUTES.optie2}${activiteit.id}`} />
      }
    }else {
      return <Redirect to={`${ROUTES.teweinig}${activiteit.id}`} />
    }
  }
  

  
  return useObserver (() =>

   <>
    <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <AantalStappen/>
   </div>
   <div className={styles.midden}>
      <div className={styles.reis_title}>
            <img src={hangers}></img>
            <p className={styles.bestemming_naam}> {activiteit.naam}</p>
      </div>
  </div>
  <section>
    <div className={styles.background_img}>
    <img className={styles.img_activiteit} src={require(`../../../assets/img/activiteiten/${activiteit.header_img}/algemeen.svg`)} alt="achtergrondfoto van de activiteit"/>
    </div>

    <div className={styles.oma_ballon}>
        <img className={styles.oma_img} src={oma} alt="reisbegeleider die uitleg geeft"/>
        <div className={styles.oma_box}>
          <p className={styles.oma_title}>{activiteit.split.titel}</p>
          <p className={styles.oma_text}>{activiteit.split.tekst1} <img className={styles.steps_inlext} src={steps} alt="spannen icon"/> <span className={styles.bold}> {activiteit.split.span1} </span>{activiteit.split.tekst2} <span className={styles.bold}><img className={styles.steps_inlext} src={steps} alt="spannen icon"/> {activiteit.split.span2}</span>?</p>
          
          <div className={styles.btton_pos}>
          <Link onClick={e => handleKeuze(e, activiteit.split.button1_kost, 'optie1')} className={styles.button} to={`${ROUTES.optie1.to}${activiteit.id}`}>
          Offer brengen
          </Link>
          <Link onClick={e=> handleKeuze(e, activiteit.split.button2_kost, 'optie2')} className={styles.button} to={`${ROUTES.optie2.to}${activiteit.id}`}>
          Kaarsje kopen
          </Link>
          </div>
        </div>
    </div>
   </section>
  </>
  );
  
};

export default Split;