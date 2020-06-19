import React, { useEffect } from "react";
// import {ROUTES} from "../../consts";
import {useStores} from "../../hooks";
import { useObserver } from "mobx-react-lite";
import Navigatie from "../Navigatie";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";

import styles from "./Overzicht.module.css";
import geenReis from "../../assets/img/geenReis.png"
import vietnam from "../../assets/img/vietnamKaart.png"
import vlag from "../../assets/img/vlag.svg"
import weer from "../../assets/img/weer.svg"
import finish from "../../assets/img/finish.svg"
import LottieOverzicht from "./LottieOverzicht";

const Overzicht = () => {
    const {uiStore, authStore} = useStores()
    // const currentProfile = uiStore.currentProfile; 
    const currentReis = uiStore.currentReis; 
    console.log('dit is de currentReis', currentReis);
    const history = useHistory();

    // const USER_FOUND = "user gevonden";
    // const USER_NOT_FOUND = "Het ziet er naar uit dat we je niet vinden. Nog eens inloggen?";

    useEffect(() => {
      console.log("use effect wordt opgestart")
      if(authStore.accessToken === undefined){
        console.log('access token ophalen')
        let url = window.location.hash; 
    
        console.log(url);
        const access_token = url.split("=")[1].split("&")[0]
        console.log(access_token);
        
        sessionStorage.clear();
        sessionStorage.setItem('access_token', access_token);
        authStore.setAccessToken(sessionStorage.getItem('access_token'));
        history.push('/overzicht');
    }else {
      authStore.fetchData();
      history.push('/overzicht');
    };
  }, []);

  return useObserver(() => (
   <>
   <Navigatie />
   <section className={styles.overzicht}>
     <div className={styles.links_wrapper}>
      <p className={styles.title}>Goeiemorgen Annet</p>
      {(currentReis === undefined) ? 
      <>
          <p className={styles.uitleg}>Het ziet er naar uit dat je momenteel nog geen reis gaande hebt. </p>

          <p className={styles.uitleg_nadruk}>Zullen we een reis starten?</p>
          <Link className={styles.button} to={ROUTES.reisaanbod}>Toon reisaanbod</Link>
      </>
      : 
      <>
        <p className={styles.uitleg}>Welkom terug! </p>
         <p className={styles.uitleg}>Momenteel ben je op reis in {currentReis.name}! Klaar om er weer in te vliegen?</p> 
         <div className={styles.icons_wrapper}>
           <div className={styles.info_wrapper}>
            <div className={styles.info_icon}>
                <img className={styles.icon_img} src={vlag} alt="Vietnam vlag (het land waar je momenteel aan het reizen bent)"/>
            </div>
            <p className={styles.icon_tekst}>Vietnam</p>
           </div>
           <div className={styles.info_wrapper}>
              <div className={styles.info_icon}>
                <img className={styles.icon_img} src={weer} alt="Zon/wolken (welk weer het momenteel is in Vietnam)"/>
            </div>
            <p className={styles.icon_tekst}>24°C</p>
           </div>
           <div className={styles.info_wrapper}>
            <div className={styles.info_icon}>
              <img className={styles.icon_img} src={finish} alt="Finish vlag (in hoeverre het land voltooid is)"/>
            </div>
            <p className={styles.icon_tekst}>80% voltooid</p>
           </div>
         </div>
        <Link className={styles.button} to={`${ROUTES.reisoverzicht.to}${currentReis.id}`}>Ga verder met je reis</Link>
        </>
      }
      </div>
    <div>
    {(currentReis === undefined) ? 
    <div className={styles.lottie}>
      <LottieOverzicht
      props="kaartkijken"/>  
      </div>    : 
      <img className={styles.kaart} src={vietnam}></img>
      }
    </div>
    </section>
  
   </>
  ));
};

export default Overzicht;
