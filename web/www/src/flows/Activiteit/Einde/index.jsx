import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import { useEffect } from "react";
import Terug from "../../../components/buttons/Terug";
import Rugzak from "../../../components/buttons/Rugzak";
import AantalStappen from "../../../components/AantalStappen";
import styles from "./Einde.module.css";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LottieUitleg from "../LottieUitleg";
import Empty from "../../../components/Empty";
import LottieActiviteit from "../Intro/LottieActiviteit";
import Help from "../../../components/buttons/Help";

const Einde = () => {
  const { id } = useParams();
  const {uiStore , activiteitenStore, stedenStore} = useStores();
  
  const history = useHistory();
  
  const STATE_LOADING = "aan het laden"; 
  const STATE_FULLY_LOADED = "volledig geladen"; 
  
  const [activiteit, setActiviteit] = useState(activiteitenStore.getActiviteitById(id))
  const [state, setState] = useState(activiteit ? STATE_FULLY_LOADED : STATE_LOADING); 
  
  
  useEffect (() => {
    const loadActiviteit = async (id) => {

      if(activiteit === undefined){
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
    }}else {
      setState(STATE_FULLY_LOADED);
    }
    };
    loadActiviteit(id);
  }, [id, setState, stedenStore, activiteit, activiteitenStore, setActiviteit, history, uiStore])

  const handleEinde = (id) => {
    const isChecked = uiStore.currentUser.checkifCheckedActiviteit(id); 
    if(isChecked === undefined){
    uiStore.currentUser.addCheckedActiviteit(id);
  }}
  
  return useObserver (() =>{
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  return (
<>
   <div className={styles.nav_wrapper}>
   <Terug className={styles.order} path={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}/>
   <Rugzak/>
   <Help />

   <div className={styles.midden}>
      <div className={styles.reis_title}>
      <img alt="de touwtjes waaraan het naambordje hangt" src={'/assets/img/reisoverzicht/hangers.svg'}></img>
            <p className={styles.bestemming_naam}> {activiteit.naam}</p>
      </div>
  </div>
   <AantalStappen/>
   </div>
   <div className={styles.background_img}>

   <div className={styles.img_activiteit}>
    < LottieActiviteit 
     name={activiteit.header_img} place="einde"
     />
    </div>
    </div>

   <div className={styles.oma_ballon}>
   <div className={styles.oma_img}>
      < LottieUitleg props="foto" />
     </div>
     <div className={styles.oma_box}>
        <p className={styles.oma_title}>{activiteit.einde.titel}</p>
        <p className={styles.oma_text}>{activiteit.einde.tekst}</p>

        <Link onClick={e => handleEinde(activiteit.id)} className={styles.button} to={`${ROUTES.stadDetail.to}${activiteit.stad_id}`}>
        {activiteit.einde.button}
        </Link>
      </div>
   </div>
  </>)}
  );
  
};

export default Einde;