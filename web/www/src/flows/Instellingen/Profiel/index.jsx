import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Profiel.module.css";
import { useStores } from "../../../hooks";
import { useState } from "react";
import { useEffect } from "react";
import Empty from "../../../components/Empty"
const Profiel = () => {

const {uiStore, landenStore, authStore} = useStores()


  return useObserver(() => {
      return (
   <>
   <div className={styles.profiel_pos}>
      <p className={styles.profiel_title}>Gebruikersnaam </p>
      <p  className={styles.profiel_text}>Dit is de naam die gebruikt wordt om jou aan te spreken, hier in Travel Tale.<br></br>
      Klik op de naam om die te wijzigen.</p>

      <input className={styles.profiel_name_input} type="text" placeholder="Pas je naam hier aan" onChange={e => uiStore.setUsername(e)} name='username' id={'username'}></input>
   </div>
   <div className={`${styles.profiel_pos} ${styles.beweging_wrapper}`}>
      <p className={styles.profiel_title}>Bewegingsniveau </p>
      <p className={styles.profiel_text}>Om een reis op jouw maat te kunnen aanbieden, polsen we even hoe graag en ver je nog wandelt. </p>
      <div className={styles.bewegen_position}>
            <label className={styles.thema_radio} htmlFor={'kroes'}>
            <input className={styles.input_bewegen} type="radio" checked={uiStore.beweegNiveau === 'kroes'} onChange={e => uiStore.setBewegen('kroes')} name='bewegen' id={'kroes'}></input>
            <div className={`${styles.bewegen_text} ${styles.box}`}>
                  <img className={styles.bewegen_img} src={'/assets/img/scooter_bomma.svg'} alt="Ouder vrouwtje in een scooter, je bent niet zo heel goed meer te been, maar wil gerust wel wandelen."/>
                  <p className={styles.bewegen_label}>Lastig</p>
                  </div>
                  </label>
            <label className={styles.thema_radio} htmlFor={'skate'}>
            <input className={styles.input_bewegen} type="radio" checked={uiStore.beweegNiveau === 'skate'} onChange={e => uiStore.setBewegen('skate')} name='bewegen' id={'skate'}></input>
                  <div className={`${styles.bewegen_text} ${styles.box}`}>
                        <img className={styles.bewegen_img} src={'/assets/img/skate_bomma.svg'} alt="Ouder vrouwtje op een skateboard, je bent redelijk vlot te been."/>
                        <p className={styles.bewegen_label}>Goed</p>
                        </div>
                        </label>
            <label className={styles.thema_radio} htmlFor={'fly'}>
            <input className={styles.input_bewegen} type="radio" checked={uiStore.beweegNiveau === 'fly'} onChange={e => uiStore.setBewegen('fly')} name='bewegen' id={'fly'}></input>
                  <div className={`${styles.bewegen_text} ${styles.big}`}>
                        <img className={styles.bewegen_img} src={'/assets/img/fly_bomma.svg'} alt="Ouder vrouwtje die vliegt, je bent zeer vlot te been en hebt geen enkel probleem met stapepn."/>
                        <p className={styles.bewegen_label}>zeer goed</p>
                        </div>
                        </label>
            </div>
            </div>
    

   </>
  )});
};

export default Profiel;
