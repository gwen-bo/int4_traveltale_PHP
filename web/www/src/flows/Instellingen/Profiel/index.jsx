import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Profiel.module.css";
import { useStores } from "../../../hooks";

const Profiel = () => {

  const {uiStore} = useStores();


  return useObserver(() => (
   <>
   <div className={styles.profiel_pos}>
      <p className={styles.profiel_title}>Gebruikersnaam </p>
      <p  className={styles.profiel_text}>Dit is de naam die gebruikt wordt om jou aan te spreken, hier in Travel Tale.<br></br>
      Klik op de naam om die te wijzigen.</p>

      <input className={styles.profiel_name_input} type="text" placeholder="Type hier uw naam" onChange={e => uiStore.setUsername(e)} name='username' id={'username'}></input>
   </div>
   <div className={`${styles.profiel_pos} ${styles.beweging_wrapper}`}>
      <p className={styles.profiel_title}>Bewegingsniveau </p>
      <p className={styles.profiel_text}>Om een reis op jouw maat te kunnen aanbieden, polsen we even hoe graag en ver je nog wandelt. </p>
      <div className={styles.bewegen_position}>
            <input type="radio" checked={uiStore.beweegNiveau === 'kroes'} onChange={e => uiStore.setBewegen('kroes')} name='kroes' id={'kroes'}></input>
            <label className={styles.thema_radio} htmlFor={'kroes'}>
                  <div className={`${styles.bewegen_text} ${styles.box}`}>
                        <img className={styles.bewegen_img} src={'/assets/img/scooter_bomma.svg'} alt=""/>
                        <p className={styles.bewegen_label}>Lastig</p>
                        </div>
                        </label>
                        <input type="radio" checked={uiStore.beweegNiveau === 'skate'} onChange={e => uiStore.setBewegen('skate')} name='skate' id={'skate'}></input>
                        <label className={styles.thema_radio} htmlFor={'skate'}>
                              <div className={`${styles.bewegen_text} ${styles.box}`}>
                                    <img className={styles.bewegen_img} src={'/assets/img/skate_bomma.svg'} alt=""/>
                                    <p className={styles.bewegen_label}>Goed</p>
                                    </div>
                                    </label>
                                    <input type="radio" checked={uiStore.beweegNiveau === 'fly'} onChange={e => uiStore.setBewegen('fly')} name='fly' id={'fly'}></input>
            <label className={styles.thema_radio} htmlFor={'fly'}>
                  <div className={`${styles.bewegen_text} ${styles.big}`}>
                        <img className={styles.bewegen_img} src={'/assets/img/fly_bomma.svg'} alt=""/>
                        <p className={styles.bewegen_label}>zeer goed</p>
                        </div>
                        </label>
                        </div>
                        </div>
    

   </>
  ));
};

export default Profiel;
