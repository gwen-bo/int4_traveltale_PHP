import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";

import styles from "./StadKeuze.module.css";
import LottieFeedback from "../Feedback/LottieFeedback";
import Help from "../buttons/Help";
import Empty from "../Empty";

const StadKeuze = () => {
 
  const { id } = useParams();
  const {uiStore, stedenStore } = useStores();
  const history = useHistory();

  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "fullyLoaded";
  const [stad, setStad] = useState(stedenStore.getStadById(id));
  const [state, setState] = useState(stad ? STATE_FULLY_LOADED : STATE_LOADING);
  
  useEffect(() => {
    const loadStad = async (id) => {
      if(stad === undefined){
      try {
        await stedenStore.loadAllSteden(); 
        stedenStore.loadActiviteitenVanStad(id);
        const stad = await stedenStore.getStadById(id);
        if (!stad) {
          uiStore.setFeedback({
            title: 'Deze stad konden wij niet vinden!', 
            uitleg: 'Sorry, maar het ziet er naar uit dat deze stad niet bestaat. Selecteer een andere stad om te verkennen.',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
            prim_name: 'Terug naar reisaanbod'
          })
          history.push('/feedback');
        }
        setStad(stad);
        console.log(stad);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          uiStore.setFeedback({
            title: 'Er ging iets fout.', 
            uitleg: 'Sorry, maar het ziet er naar uit dat deze stad niet bestaat. Selecteer een andere stad om te verkennen.',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
            prim_name: 'Terug naar reisoverzicht'
          })
          history.push('/feedback');        }
      }}else {
        setState(STATE_FULLY_LOADED);
      }
    };
    loadStad(id);
  }, [id, setState, setStad, history, stedenStore, uiStore, stad]);

  const handleStart = () => {
    const isChecked = uiStore.currentUser.checkifCheckedStad(id); 

    if(isChecked === undefined){
    uiStore.currentUser.addCheckedStad(stad.id);
    const stappen = uiStore.currentUser.stappen;
    const updateStappen = (stappen - stad.stappen);
    
    uiStore.currentUser.setCurrentStappen(updateStappen);
    }
  }

  return useObserver(() => {
    if (state === STATE_LOADING) {
        return <Empty message={"Even aan het laden.."} />;
      }
      return(
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>

    {(uiStore.currentSteps < stad.stappen) ?
    <section className={styles.section}>
    <Help />
        <div className={styles.section_header}>
        <h1 className={styles.title}>Je hebt nog niet genoeg stappen.</h1>
        <p className={styles.uitleg}>Het ziet er naar uit dat je nog niet genoeg stappen hebt verzameld om <span className={styles.uitleg_nadruk}>{stad.naam}</span> te kunnen ontdekken.</p>
        <p className={styles.vraag}>Kom je later nog eens terug?</p>
    </div>
    <LottieFeedback
          props="verbaasd"
    />           
        <div className={styles.button_wrapper}>
            <Link className={styles.button_sec} to={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}>Terug naar overzicht</Link>
            <Link className={styles.button} to={ROUTES.wandelplezier}>Beginnen met stappen</Link>
        </div>
    </section>
    : 
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Welkom in {stad.naam}</h1>
        <p className={styles.uitleg}>Om <span className={styles.uitleg_nadruk}>{stad.naam}</span> te ontdekken heb je {stad.stappen} <span className={styles.icon}></span> stappen nodig</p>
    <p className={styles.vraag}>Wil je {stad.stappen} <span className={styles.icon}></span> stappen indienen om {stad.naam} te ontdekken?</p>
    </div>
    <LottieFeedback
          props="vertrekt"
    />          
    <div className={styles.button_wrapper}>
            <Link className={styles.button_sec} to={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`}>Terug naar overzicht</Link>
            <Link onClick={e => handleStart()} className={styles.button} to={`${ROUTES.stadDetail.to}${stad.id}`}>Stappen indienen</Link>

        </div>
    </section>
    }
    </>
 )});
};

export default StadKeuze;
