import React from "react";
import {  useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";

import logo from "../../../assets/img/logo.svg"


import styles from "./FontSize.module.css";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";

const FontSize = () => {
  const {uiStore} = useStores();
  const {dataStore} = useStores();
//   const currentProfile = uiStore.currentProfile;

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
                  <label className={styles.thema_radio} htmlFor="smal">
                    <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'smal'} onChange={e => dataStore.setSize('smal')} name='font' id="smal" ></input>
                    <div className={`${styles.fontsize_text} ${styles.small}`} key={'smal'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken.</p>  
                    </div>
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="medium">
                    <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'medium'} onChange={e => dataStore.setSize('medium')} name='font' id="medium"></input>
                    <div className={`${styles.fontsize_text} ${styles.medium}`} key={'medium'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken.</p>  
                    </div>
                  </label>
                </div>
                
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="big">
                    <input className={styles.input_fontsize} type="radio" checked={dataStore.sizes.font === 'big'} onChange={e => dataStore.setSize('big')} name='font' id="big"></input>
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
                  animation: 'fitness',
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