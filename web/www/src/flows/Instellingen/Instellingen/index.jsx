import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Navigatie from "../../../components/Navigatie";
import styles from "./Instellingen.module.css";

import Profiel from "../Profiel";
import Weergave from "../Weergave";
import Fitbit from "../Fitbit";


import profiel from "../../../assets/img/instellingen/profiel.svg" 
import weergave from "../../../assets/img/instellingen/weergave.svg" 
import fitbit from "../../../assets/img/instellingen/fitbit.svg" 

import profiel_active from "../../../assets/img/instellingen/profiel_actief.svg" 
import weergave_active from "../../../assets/img/instellingen/weergave_actief.svg" 
import fitbit_active from "../../../assets/img/instellingen/fitbit_actief.svg" 


const Instellingen = () => {
  const [view, setView] = useState("profiel");

  return useObserver(() => (
   <>
    <Navigatie />
    <article className={styles.instellingen_pos}>
      <div className={styles.instellingen_intro}>
        
      </div>
      <div className={styles.switchNav}>
        <div className={styles.switch}>
          <button className={ (view === "profiel") ? `${styles.button_active}` : `${styles.button_nav}`} onClick={e => setView("profiel")}>
          {view === "profiel" ? <img src={profiel_active} alt="profiel icon"/> : <img src={profiel} alt="profiel icon"/>}
          <p className={styles.button_text}>Profiel</p>
          </button>
          <button className={ (view === "weergave") ? `${styles.button_active}` : `${styles.button_nav}`} onClick={e => setView("weergave")}>
          {view === "weergave" ? <img src={weergave_active} alt="weergave icon"/> : <img src={weergave} alt="weergave icon"/>}
          <p className={styles.button_text}>Weergave</p>
          </button>
          <button className={ (view === "fitbit") ? `${styles.button_active}` : `${styles.button_nav}`} onClick={e => setView("fitbit")} >
            {view === "fitbit" ? <img src={fitbit_active} alt="fitbit icon"/> : <img src={fitbit} alt="fitbit icon"/>}
            <p className={styles.button_text}>Fitbit</p>
          </button>
        </div>
        <div className={styles.inhoud}>
        <h1 className={styles.title}>Instellingen</h1> 
        {(view === "profiel") ? <Profiel /> : (view === "weergave") ?  <Weergave /> :  <Fitbit />}
        </div>
      </div>

    </article>

   </>
  ));
};

export default Instellingen;
