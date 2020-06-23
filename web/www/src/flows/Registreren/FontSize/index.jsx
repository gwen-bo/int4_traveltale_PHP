import React from "react";
import {useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import styles from "./FontSize.module.css";
import { Link } from "react-router-dom";
import Help from "../../../components/buttons/Help";
import { useObserver } from "mobx-react-lite";

const FontSize = () => {
  const {authStore, uiStore} = useStores();

  const history = useHistory();

  const handleLink = (feedbackLink) => {
    console.log(feedbackLink);
    uiStore.setFeedback(feedbackLink);
  }
  
  return useObserver(() => 

   <>
    <Help/>

    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
  <section className={styles.fontsize}>
  <p className={styles.title}>Selecteer de tekst die voor jou het beste leesbaar is</p>

      <form action="" className={styles.fontsize_position}>
      <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="smal">
                    <input className={styles.input_fontsize} type="radio" checked={authStore.registratieFontSize === 'smal'} onChange={e => authStore.setFontsizeRegistratie('smal')} name='font' id="smal" ></input>
                    <div className={`${styles.fontsize_text} ${styles.small}`} key={'smal'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken.</p>  
                    </div>
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="medium">
                    <input className={styles.input_fontsize} type="radio" checked={authStore.registratieFontSize === 'medium'} onChange={e => authStore.setFontsizeRegistratie('medium')} name='font' id="medium"></input>
                    <div className={`${styles.fontsize_text} ${styles.medium}`} key={'medium'}>
                      <p>Welkom bij Travel Tale!</p>
                      <p>Laten we samen verschillende landen ontdekken.</p>  
                    </div>
                  </label>
                </div>
                
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="large">
                    <input className={styles.input_fontsize} type="radio" checked={authStore.registratieFontSize === 'large'} onChange={e => authStore.setFontsizeRegistratie('large')} name='font' id="large"></input>
                      <div className={`${styles.fontsize_text} ${styles.big}`} key={'large'}>
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