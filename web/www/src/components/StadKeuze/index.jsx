import React from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import logo from "../../assets/img/logo.svg"

import styles from "./StadKeuze.module.css";
import LottieFeedback from "../Feedback/LottieFeedback";

const StadKeuze = () => {
 
  const { id } = useParams();
  const {uiStore, stedenStore } = useStores();
  const stad = stedenStore.getStadById(id)
  console.log(stad)

  const handleStart = (e) => {
    // uiStore.setCurrentReis(bestemming.id);
    // e.preventDefault();
    const stappen = uiStore.currentUser.stappen;
    const updateStappen = (stappen - stad.stappen);
    
    uiStore.currentUser.setCurrentStappen(updateStappen);
    
    console.log(updateStappen)
    // user.updateReis();
    // history.push('/feedback')
    // return <Redirect to={`${ROUTES.stadDetail.to}${stad.id}`}/>
  }

  return useObserver(() => (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

    {(uiStore.currentSteps < stad.stappen) ?
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Je hebt nog niet genoeg stappen.</h1>
        <p className={styles.uitleg}>Het ziet er naar uit dat je nog niet genoeg stappen hebt verzameld om <span className={styles.uitleg_nadruk}>{stad.naam}</span> te kunnen ontdekken.</p>
        <p className={styles.vraag}>Kom je later nog eens terug?</p>
    </div>
    <LottieFeedback
          props="verbaasd"
    />           
        <div className={styles.button_wrapper}>
            <Link className={styles.button_sec} to={ROUTES.reisaanbod}>Terug naar overzicht</Link>
            <Link className={styles.button} to={ROUTES.rugzak}>Beginnen met stappen</Link>
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
            <Link className={styles.button_sec} to={ROUTES.reisaanbod}>Terug naar overzicht</Link>
            <Link onClick={e => handleStart(e)} className={styles.button} to={`${ROUTES.stadDetail.to}${stad.id}`}>Stappen indienen</Link>

        </div>
    </section>
    }
    </>
 ) );
};

export default StadKeuze;
