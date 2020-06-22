import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import { useEffect } from "react";

import styles from "./Optie1.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";

import hangers from "../../../assets/img/reisoverzicht/hangers.svg"
import LottieUitleg from "../LottieUitleg";
import Empty from "../../../components/Empty";
import LottieActiviteit from "../Intro/LottieActiviteit";



const Optie1 = () => {
    const { id } = useParams();
    const { activiteitenStore, uiStore, stedenStore} = useStores();
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
  
  return useObserver (() =>{
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  return (
  <>
    <div className={styles.nav_wrapper}>
    <Terug className={styles.order} path={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}/>
   <Rugzak/>
   <div className={styles.midden}>
      <div className={styles.reis_title}>
            <img src={hangers}></img>
            <p className={styles.bestemming_naam}> {activiteit.naam}</p>
      </div>
  </div>
   <AantalStappen/>
   </div>
   <div className={styles.img_activiteit}>
    < LottieActiviteit 
     name={activiteit.header_img} place="optie1"
     />
    </div>

   <div className={styles.oma_ballon}>
   <div className={styles.oma_img}>
      < LottieUitleg 
     props="uitleg"
     />
     </div>      
     <div className={styles.oma_box}>
        <p className={styles.oma_title}>{activiteit.optie1.titel}</p>
        <p className={styles.oma_text}>{activiteit.optie1.tekst}</p>
        <Link className={styles.button} to={`${ROUTES.einde.to}${activiteit.id}`}>
          {activiteit.optie1.button}
        </Link>
      </div>
   </div>

  </>)}
  );
  
};

export default Optie1;