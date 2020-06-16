import React, { useEffect, useState } from "react";
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

const Overzicht = () => {
    const {uiStore, authStore} = useStores()
    // const currentProfile = uiStore.currentProfile; 
    const currentReis = uiStore.currentReis; 
    console.log('dit is de currentReis', currentReis);
    const history = useHistory();

    // const USER_FOUND = "user gevonden";
    // const USER_NOT_FOUND = "Het ziet er naar uit dat we je niet vinden. Nog eens inloggen?";

    useEffect(() => {
      if(authStore.accessToken === undefined){
      // window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foverzicht%2F&scope=activity%20profile&expires_in=604800');
      console.log('access token ophalen')
      let url = window.location.hash; 
  
      console.log(url);
      const access_token = url.split("=")[1].split("&")[0]
      console.log(access_token);
  
      authStore.setAccessToken(access_token);
      history.push('/overzicht');
    }else {
      history.push('/overzicht');
    };
  
    // const loadCurrentUser = async () => {
    //   try {
    //     const user = uiStore.currentProfile();
    //     if (!user) {
    //       setState(USER_NOT_FOUND);
    //       return;
    //     }
    //     setUser(user);
    //     //setState(STATE_LOADING_MORE_DETAILS);
    //     //await groupStore.loadGroupUsers(id);
    //     setState(USER_FOUND);
    //   } catch (error) {
    //     /*if (error.response && error.response.status === 404) {
    //       setState(STATE_DOES_NOT_EXIST);
    //     }*/
    //     setState(USER_NOT_FOUND);
    //   }
    // };
    // loadCurrentUser();

  }, []);
    

  return useObserver(() => {
    
    // if (state === USER_NOT_FOUND) {
    //   return <p>Nog eens inloggen?</p>;
    // }
    return (
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
      <img src={geenReis}></img>
      : 
      <img className={styles.kaart} src={vietnam}></img>
      }
    </div>
    </section>
  
   </>
  )});
};

export default Overzicht;
