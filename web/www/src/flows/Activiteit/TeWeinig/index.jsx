import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import styles from "./TeWeinig.module.css";
import { useObserver } from "mobx-react-lite";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";
import LottieUitleg from "../LottieUitleg";
import LottieActiviteit from "../Intro/LottieActiviteit";
import Empty from "../../../components/Empty";
import Help from "../../../components/buttons/Help";


const TeWeinig = () => {  
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
  }, [id, setState, stedenStore, activiteitenStore, setActiviteit, history, uiStore])
  
  return useObserver (() => {
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  return (
   <>
    <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <Help />
   <div className={styles.midden}>
      <div className={styles.reis_title}>
      <img alt="de touwtjes waaraan het naambordje hangt" src={'/assets/img/reisoverzicht/hangers.svg'}></img>
            <p className={styles.bestemming_naam}>{activiteit.naam}</p>
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
        <p className={styles.oma_text}>Je komt nog een aantal stappen tekort. Tijd om een wandeling te maken?</p>
        <div className={styles.btton_pos}>
            <button className={styles.button}>{activiteit.einde.button}</button>
            <button className={styles.button}>Ik ga wandelen</button>
          </div>
      </div>
   </div>

  </>
)});
  
};

export default TeWeinig;