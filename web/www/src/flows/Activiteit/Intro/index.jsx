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

import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
import oma from "../../../assets/img/oma_uitleg.svg"

import { useEffect } from "react";
import Empty from "../../../components/Empty";
import LottieUitleg from "../LottieUitleg";
import StedenStore from "../../../stores/StedenStore.";
import LottieActiviteit from "./LottieActiviteit";



const Intro = () => {
  const { id } = useParams();
  const {uiStore , activiteitenStore, stedenStore} = useStores();

  const history = useHistory();

const STATE_LOADING = "loading"; 
const STATE_FULLY_LOADED = "fullyLoaded"; 

const [activiteit, setActiviteit] = useState(activiteitenStore.getActiviteitById(id))
const [state, setState] = useState(activiteit ? STATE_FULLY_LOADED : STATE_LOADING); 


useEffect (() => {
  const loadActiviteit = async (id) => {
    try {
    await stedenStore.loadAllSteden();
    await activiteitenStore.loadAllActiviteiten(); 
    const activiteit = activiteitenStore.getActiviteitById(id);
    if(!activiteit){
      uiStore.setFeedback({
        title: 'Oeps!', 
        uitleg: 'Er is iets misgelopen met de activiteit, probeer je nog eens?',
        animation: 'verbaasd',
        sec_path: '', 
        sec_name: 'Vorige',
        prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
        prim_name: 'Terug naar reisoverzicht'
      })
      history.push('/feedback');
      return;
    }
    setActiviteit(activiteit);
    setState(STATE_FULLY_LOADED);
  }catch (error){
    if(error.response && error.response.status === 400){
    }
  }
  };
  loadActiviteit(id);
}, [id, setState, stedenStore, activiteitenStore, setActiviteit])


return useObserver (() => {
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  return (
   <>
<div className={styles.nav_wrapper}>
   <Terug className={styles.order} path={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}/>
   <Rugzak/>
  </div>
   <AantalStappen />

<div className={styles.midden}>
<div className={styles.reis_title}>
      <img src={hangers}></img>
      <p className={styles.bestemming_naam}>{activiteit.naam}</p>
</div>
</div>

   <div className={styles.background_img}>
     {/* <img className={styles.img_activiteit}  src={require(`../../../assets/img/activiteiten/${activiteit.header_img}/begin.svg`)} alt="achtergrondfoto van de activiteit"/> */}
    <div className={styles.img_activiteit}>
    < LottieActiviteit 
     name={activiteit.header_img} place="begin"
     />
    </div>
   </div>

   <div className={styles.oma_ballon}>
      {/* <img  src={oma} alt="jouw reisbegeleider die uitleg geeft"/> */}
      <div className={styles.oma_img}>
      < LottieUitleg 
     props="uitleg"
     />
     </div>
      <div className={styles.oma_box}>
        <p className={styles.oma_title}>{activiteit.intro.titel}</p>
        <p className={styles.oma_text}>{activiteit.intro.tekst}</p>
        <Link className={styles.button} to={`${ROUTES.split.to}${activiteit.id}`}>
          Volgende
        </Link>
      </div>
   </div>

  </>
 )} );
  
};

export default Intro;