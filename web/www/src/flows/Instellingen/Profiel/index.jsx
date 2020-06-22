import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Profiel.module.css";

import { useStores } from "../../../hooks";


import scooter from "../../../assets/img/scooter_bomma.svg"
import skate from "../../../assets/img/skate_bomma.svg"
import fly from "../../../assets/img/fly_bomma.svg"

const Profiel = () => {

  const {dataStore} = useStores();


  return useObserver(() => (
   <>
   <div className={styles.profiel_pos}>
      <p className={styles.profiel_title}>Gebruikersnaam </p>
      <p  className={styles.profiel_text}>Dit is de naam die gebruikt wordt om jou aan te spreken, hier in Travel Tale.<br></br>
      Klik op de naam om die te wijzigen.</p>

      <input className={styles.profiel_name_input} type="text" placeholder="Type hier uw naam" onChange={e => dataStore.setUsername(e)} name='username' id={'username'}></input>
   </div>
   <div className={`${styles.profiel_pos} ${styles.beweging_wrapper}`}>
      <p className={styles.profiel_title}>Bewegingsniveau </p>
      <p className={styles.profiel_text}>Om een reis op jouw maat te kunnen aanbieden, polsen we even hoe graag en ver je nog wandelt. </p>
      <div className={styles.bewegen_position}>
            <input type="radio" checked={dataStore.sizes.font === 'kroes'} onChange={e => dataStore.setBewegen('kroes')} name='kroes' id={'kroes'}></input>
            <label className={styles.thema_radio} htmlFor={'kroes'}>
                  <div className={`${styles.bewegen_text} ${styles.box}`}>
                        <img className={styles.bewegen_img} src={scooter} alt=""/>
                        <p className={styles.bewegen_label}>Lastig</p>
                        </div>
                        </label>
                        <input type="radio" checked={dataStore.sizes.font === 'skate'} onChange={e => dataStore.setBewegen('skate')} name='skate' id={'skate'}></input>
                        <label className={styles.thema_radio} htmlFor={'skate'}>
                              <div className={`${styles.bewegen_text} ${styles.box}`}>
                                    <img className={styles.bewegen_img} src={skate} alt=""/>
                                    <p className={styles.bewegen_label}>Goed</p>
                                    </div>
                                    </label>
                                    <input type="radio" checked={dataStore.sizes.font === 'fly'} onChange={e => dataStore.setBewegen('fly')} name='fly' id={'fly'}></input>
            <label className={styles.thema_radio} htmlFor={'fly'}>
                  <div className={`${styles.bewegen_text} ${styles.big}`}>
                  <img className={styles.bewegen_img} src={fly} alt=""/>
                        <p className={styles.bewegen_label}>zeer goed</p>
                        </div>
                        </label>
                        </div>
                        </div>
    

   </>
  ));
};

export default Profiel;
