import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";

import logo from "../../../assets/img/logo.png"


import styles from "./FontSize.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

const FontSize = () => {
  const {uiStore} = useStores();
  const {dataStore} = useStores();
  const currentProfile = uiStore.currentProfile;

  const history = useHistory();

  const handleLink = (feedbackLink) => {
    console.log(feedbackLink);
    uiStore.setFeedback(feedbackLink);
  }


  
  return useObserver (() =>

   <>
  <img src={logo} alt="logo Travel Tale"></img>
  <section className={styles.fontsize}>
  <p className={styles.title}>Selecteer de tekst die voor jou het beste leesbaar is</p>

      <form action="" className={styles.fontsize_position}>
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'small'} onChange={e => dataStore.setSize('small')} name='small' id="small"></input>
                    <label className={styles.thema_radio} htmlFor="small">
                   <div className={`${styles.fontsize_text} ${styles.small}`} key={'small'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken. 
                      </p>
                   </div>
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'medium'} onChange={e => dataStore.setSize('medium')} name='medium' id="medium"></input>
                  <label className={styles.thema_radio} htmlFor="medium">
                    <div className={`${styles.fontsize_text} ${styles.medium}`} key={'medium'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken.</p>  
                    </div>
                  </label>
                </div>
                
                <div className={styles.input_wrapper}>
                  <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'big'} onChange={e => dataStore.setSize('big')} name='medium' id="big"></input>
                    <label className={styles.thema_radio} htmlFor="big">
                      <div className={`${styles.fontsize_text} ${styles.big}`} key={'big'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken. 
                      </p>    
                   </div>
                  </label>
                  </div>
                  </form>
                <div className={styles.button_wrapper}>
                  <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Vorige</button>
                  <Link className={styles.button} to={ROUTES.feedback} onClick={e => (handleLink({
                   title: 'We zijn er bijna!', 
                  uitleg: 'Om zeker te zijn dat je reis een onvergetelijke ervaring wordt, polsen we hoe graag en ver je nog wandelt. Zo kunnen we een reis maken op jouw maat!',
                  animation: 'animatie',
                  sec_path: '', 
                  sec_name: 'Vorige',
                  prim_path: ROUTES.bewegen,
                  prim_name: 'Volgende'}))}>Volgende</Link>
            </div>
            </section>
</>
  );
  
};

export default FontSize;