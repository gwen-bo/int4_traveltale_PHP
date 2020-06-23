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
import LottieUitleg from "../LottieUitleg";
import Empty from "../../../components/Empty";
import LottieActiviteit from "../Intro/LottieActiviteit";
import Help from "../../../components/buttons/Help";



const Split = () => {
    const { id } = useParams();
    const {uiStore , activiteitenStore, stedenStore} = useStores();
  
    const history = useHistory();
  
  const STATE_LOADING = "aan het laden"; 
  const STATE_FULLY_LOADED = "volledig geladen"; 
  
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
      }}};
    loadActiviteit(id);
  }, [id, setState, stedenStore, activiteitenStore, setActiviteit, history, uiStore])
  
  const [redirect, setRedirect] = useState(false); 
  const [optie, setOptie] = useState(""); 

  const handleKeuze = (e, kost, optie) => {
    const stappen = uiStore.currentUser.stappen;
    console.log('dit is de kost', kost);
    if(stappen >= kost){
      const updateStappen = (stappen - kost);
      uiStore.currentUser.setCurrentStappen(updateStappen);
      if(optie === 'optie1'){
        setRedirect("opties")
        setOptie("optie1")
        console.log(ROUTES.optie1.to, activiteit.actitviteit_id)
      }else {
        setRedirect("opties")
        setOptie("optie2")
        console.log(ROUTES.optie2.to, activiteit.actitviteit_id)
      }
    }else {
      setRedirect("teweinig")
      console.log('niet genoeg stappen', stappen);
    }
  }
  
  return useObserver (() =>{
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  if (redirect === "opties") {
    if(optie === "optie1"){
    return <Redirect to={`${ROUTES.optie1.to}${activiteit.id}`} />
    }else {
     return <Redirect to={`${ROUTES.optie2.to}${activiteit.id}`} />
    }
  }
  if (redirect === "teweinig") {
    return <Redirect to={`${ROUTES.teweinig.to}${activiteit.id}`} />
  }
  return (
   <>
    <div className={styles.nav_wrapper}>
   <Terug path={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}/>
   <Rugzak/>
   <Help />
   <AantalStappen/>
   </div>

   <div className={styles.midden}>
      <div className={styles.reis_title}>
      <img alt="de touwtjes waaraan het naambordje van de activiteit hangt" src={'/assets/img/reisoverzicht/hangers.svg'}></img>
            <p className={styles.bestemming_naam}> {activiteit.naam}</p>
      </div>
  </div>

  {/* <section> */}
  <div className={styles.background_img}>

  <div className={styles.img_activiteit}>
    < LottieActiviteit name={activiteit.header_img} place="split" />
  </div>
  </div>

    <div className={styles.oma_ballon}>
    <div className={styles.oma_img}>
      < LottieUitleg
     props="uitleg"
     />
     </div>
        <div className={styles.oma_box}>
          <p className={styles.oma_title}>{activiteit.split.titel}</p>
          <p className={styles.oma_text}>{activiteit.split.tekst1} <img className={styles.steps_inlext} src={'/assets/img/stappenIcon.svg'} alt="spannen icon"/> <span className={styles.bold}> {activiteit.split.span1} </span>{activiteit.split.tekst2} <span className={styles.bold}><img className={styles.steps_inlext} src={'/assets/img/stappenIcon.svg'} alt="spannen icon"/> {activiteit.split.span2}</span>?</p>
          
          <div className={styles.btton_pos}>
          <button onClick={e => handleKeuze(e, activiteit.split.button1_kost, 'optie1')} className={styles.button}>
          {activiteit.split.button1_tekst}
          </button>
          <button onClick={e=> handleKeuze(e, activiteit.split.button2_kost, 'optie2')} className={styles.button}>
          {activiteit.split.button2_tekst}
          </button>
          </div>
        </div>
    </div>
    {/* </section> */}
    </>
)});
  
};

export default Split;