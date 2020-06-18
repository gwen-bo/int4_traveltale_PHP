import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";

import styles from "./Intro.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";

/* images */
// import begin from "../../../assets/img/activiteiten/steden/Ninh Binh/tempel/begin.svg"
// import omaUitleg from "../../../assets/img/oma_uitleg.svg"
import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
import { useEffect } from "react";



const Intro = () => {
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


  
  return useObserver (() => {

  if (state === STATE_DOES_NOT_EXIST){
    return <p>bestaat niet</p>;
  }
  if (state === STATE_LOADING){
    return <p>aan het laden</p>
  }
  return (

   <>
    <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <div className={styles.midden}>
      <div className={styles.reis_title}>
            <img src={hangers}></img>
            <p className={styles.bestemming_naam}>{activiteit.name}</p>
      </div>
  </div>
   <AantalStappen />
   </div>
   <div>
     {/* <img className={styles.img_activiteit}  src={require(`../../../assets/img/activiteiten/steden/${activiteit.intro.back_img}.svg`)} alt="background van de activiteit"/> */}
   </div>

   <div className={styles.oma_ballon}>
      {/* <img className={styles.oma_img}  src={require(`../../../assets/img/${activiteit.intro.img}.svg`)} alt="oma in het text ballon die uitleg geeft"/> */}
      <div className={styles.oma_box}>
        <p className={styles.oma_title}>{activiteit.intro.titel}</p>
        <p className={styles.oma_text}>{activiteit.intro.tekst}</p>
        <Link to={`${ROUTES.split.to}${activiteit.id}`}>
          <button className={styles.button}>{activiteit.intro.button}</button>
        </Link>
      </div>
   </div>

  </>
 )} );
  
};

export default Intro;