import React from "react";
// import {ROUTES} from "../../consts";
import { useObserver } from "mobx-react-lite";
import styles from "./Weergave.module.css";

import { useStores } from "../../../hooks";


import oma from "../../../assets/img/instellingen/oma.svg"
import opa from "../../../assets/img/instellingen/opa.svg"

const Profiel = () => {

  const {dataStore} = useStores();


  return useObserver(() => (
   <>
   <div className={styles.pos}>
   </div>
   <div className={styles.pos}>
      <p className={styles.title}>Jouw reisbegeleider </p>
      <p className={styles.text}>Kies hier wie jouw reisbegeleider zal worden doorheen de reizen die je zal maken.</p>
      <div className={styles.bewegen_position}>
          <input type="radio" checked={dataStore.sizes.font === 'Maria'} onChange={e => dataStore.setBewegen('Maria')} name='Maria' id={'Maria'}></input>
          <label className={styles.thema_radio} htmlFor={'Maria'}>
                <div className={`${styles.bewegen_text} ${styles.box}`}>
                  <img className={styles.bewegen_img} src={oma} alt=""/>
                <p className={styles.bewegen_label}>Maria</p>
                </div>
            </label>

            <input type="radio" checked={dataStore.sizes.font === 'Fons'} onChange={e => dataStore.setBewegen('Fons')} name='Fons' id={'Fons'}></input>
            <label className={styles.thema_radio} htmlFor={'Fons'}>
                  <div className={`${styles.bewegen_text} ${styles.box}`}>
                  <img className={styles.bewegen_img} src={opa} alt=""/>
                  <p className={styles.bewegen_label}>Fons</p>
                  </div>
            </label>

            
            </div>
            <div className={styles.form_wrapper}>
                  <div className={styles.form_header}>
            <p className={styles.title}>Tekstgrootte </p>
            <p className={styles.text}>Zijn die kleine lettertjes net iets te klein, of die grote letters net iets te groot? pas de tekstgrootte aan, naar jouw voorkeur.</p>
            </div>
            <form action="" className={styles.fontsize_position}>
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'small'} onChange={e => dataStore.setSize('small')} name='small' id="small"></input>
                  <label className={styles.thema_radio} htmlFor="small">
                  <div className={`${styles.fontsize_text} ${styles.small}`} key={'small'}>
                  <p>Klein Font</p>
                  </div>
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'medium'} onChange={e => dataStore.setSize('medium')} name='medium' id="medium"></input>
                  <label className={styles.thema_radio} htmlFor="medium">
                  <div className={`${styles.fontsize_text} ${styles.medium}`} key={'medium'}>
                  <p>Medium Font</p>
                  </div>
                  </label>
                </div>
                
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'big'} onChange={e => dataStore.setSize('big')} name='medium' id="big"></input>
                    <label className={styles.thema_radio} htmlFor="big">
                      <div className={`${styles.fontsize_text} ${styles.big}`} key={'big'}>
                  <p>Groot Font</p>
                  </div>
                  </label>
                  </div>
                  </form>
                  </div>
   </div>
    

   </>
  ));
};

export default Profiel;
