import React, { useState } from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import { ROUTES } from "../../consts";
import styles from "./StadDetail.module.css";


import step from "../../assets/img/reisaanbod/niveau1.svg"
import Terug from "../buttons/Terug";

const StadDetail = () => {
  const {stedenStore} = useStores();

  const { id } = useParams();
  console.log(id);
  const stad = stedenStore.getStadById(id);

  console.log(stad);

  const {uiStore, authStore} = useStores()
  // const currentProfile = uiStore.currentProfile; 
  const currentReis = uiStore.currentReis; 


  
  return (
   <>
   <div>
     <Terug path={`${ROUTES.reisoverzicht.to}${currentReis.id}`}/>
    {stad.activities.map(
            activiteit => (
              // console.log(activiteit)
          <div className={styles.activiteit}>
            <img className={styles.img_act} src={require(`../../assets/img/${activiteit.naam}.svg`)} alt={`header afbeelding van ${activiteit}`}></img>
            <p className={styles.activiteit_title}>{activiteit.naam}</p>
            <div className={styles.text_but_pos}>
              <p className={styles.activiteit_text}>{activiteit.intro}</p>
              <div className={styles.pos}>
                <div className={styles.steps}>
                    <img  src={step} alt="voetstapjes"/>
                    <p className={styles.steps_aantal}>{activiteit.steps}</p>
                </div>
                <button className={styles.button}>Starten</button>
              </div>
            </div>
          </div>        
          )
        )}

        <div className={styles.activiteiten}>
          <div className={styles.activiteit}>
            <img className={styles.img_act} src={""} alt={`header afbeelding van de rooftopbar`}></img>
            <p className={styles.activiteit_title}>De Rooftopbar</p>
            <div className={styles.text_but_pos}>
              <p className={styles.activiteit_text}>Geen zin meer om de stad in te trekken? Kom mee naar de bekendste rooftopbar van Hanoi. Hier heb je een prachtig uitzicht over de stad.</p>
              <div className={styles.pos}>
                <div className={styles.steps}>
                    <img  src={step} alt=""/>
                    <p className={styles.steps_aantal}>500</p>
                </div>
                <button className={styles.button}>Starten</button>
              </div>
            </div>
          </div>

          <div className={styles.activiteit}>
            <img className={styles.img_act} src={""} alt=""/>
            <p className={styles.activiteit_title}>Treinstraat</p>
            <div className={styles.text_but_pos}>
              <p className={styles.activiteit_text}>Midden in Hanoi vind je een smalle straat waar de trein dwars door rijdt. Op tijd aan de kant gaan is de boodschap!</p>
              <div className={styles.pos}>
                <div className={styles.steps}>
                    <img  src={step} alt=""/>
                    <p className={styles.steps_aantal}>500</p>
                </div>
                <button className={styles.button}>Starten</button>
              </div>
            </div>
          </div>

          <div className={styles.activiteit}>
            <img className={styles.img_act} src={""} alt=""/>
            <p className={styles.activiteit_title}>Avondmarkt</p>
            <div className={styles.text_but_pos}>
              <p className={styles.activiteit_text}>Culinaire lekkernijen, de geur specerijen en exotisch fruit... Dompel je helemaal onder in de Vietnamese keuken!</p>
              <div className={styles.pos}>
                <div className={styles.steps}>
                    <img  src={step} alt=""/>
                    <p className={styles.steps_aantal}>500</p>
                </div>
                <button className={styles.button}>Starten</button>
              </div>
            </div>
          </div>

        </div>

        
        
    </div>
   </>
  );
};

export default StadDetail;