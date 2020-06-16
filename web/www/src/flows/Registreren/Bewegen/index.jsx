import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import scooter from "../../../assets/img/scooter_bomma.svg"
import skate from "../../../assets/img/skate_bomma.svg"
import fly from "../../../assets/img/fly_bomma.svg"
import logo from "../../../assets/img/logo.png"

import styles from "./Bewegen.module.css";
import { Link } from "react-router-dom";

const Bewegen = () => {
  const {uiStore} = useStores();
  const {dataStore} = useStores();
  const history = useHistory();

  
  return (
   <>
    <img src={logo} alt="logo Travel Tale"></img>
    <div className={styles.bewegen}>
          <p className={styles.title}>Selecteer wat voor jou van toepassing is</p>
          <form action="" className={styles.bewegen_position}>
      <input type="radio" checked={dataStore.sizes.font === 'kroes'} onChange={e => dataStore.setBewegen('kroes')} name='kroes' id={'kroes'}></input>
      <label className={styles.thema_radio} htmlFor={'kroes'}>
          <div className={`${styles.bewegen_text} ${styles.box}`}>
            <img className={styles.bewegen_img} src={scooter} alt=""/>
            <p className={styles.bewegen_label}>Ik voel kwaaltjes als ik wandel</p>
          </div>
        </label>

        <input type="radio" checked={dataStore.sizes.font === 'skate'} onChange={e => dataStore.setBewegen('skate')} name='skate' id={'skate'}></input>
        <label className={styles.thema_radio} htmlFor={'skate'}>
          <div className={`${styles.bewegen_text} ${styles.box}`}>
            <img className={styles.bewegen_img} src={skate} alt=""/>
            <p className={styles.bewegen_label}>Na een tijdje krijg ik het lastig</p>
          </div>
        </label>

        <input type="radio" checked={dataStore.sizes.font === 'fly'} onChange={e => dataStore.setBewegen('fly')} name='fly' id={'fly'}></input>
        <label className={styles.thema_radio} htmlFor={'fly'}>
          <div className={`${styles.bewegen_text} ${styles.big}`}>
            <img className={styles.bewegen_img} src={fly} alt=""/>
            <p className={styles.bewegen_label}>Ik ben nog heel goed te been </p>
          </div>
        </label>

      </form>
      <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>Vorige</button>
            <Link className={styles.button} to={ROUTES.bevestigen}>Volgende</Link>
            </div>
      </div>
</>
  );
};

export default Bewegen;