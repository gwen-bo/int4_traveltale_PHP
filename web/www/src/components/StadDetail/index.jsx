import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import styles from "./StadDetail.module.css";

// import rooftopbar from "../../assets/img/rooftopbar.svg"
// import treinstraat from "../../assets/img/treinstraat.svg"
import step from "../../assets/img/reisaanbod/niveau1.svg"
import Terug from "../buttons/Terug";
import AantalStappen from "../AantalStappen";

import hang from "../../assets/img/reisoverzicht/hangers.svg"
import kaart from "../../assets/img/kaart.svg"


// import style from "./StadDetail.module.css";

const StadDetail = () => {
  const {stedenStore} = useStores();

  const { id } = useParams();
  console.log(id);

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [stad, setStad] = useState(stedenStore.getStadById(id));
  const [state, setState] = useState(stad ? STATE_LOADING_MORE_DETAILS : STATE_LOADING);

  useEffect(() => {
    const loadStad = async (id) => {
      try {
        const stad = await stedenStore.getStadById(id);
        if (!stad) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setStad(stad);
        setState(STATE_LOADING_MORE_DETAILS);
        console.log('loading steden');
        await stedenStore.loadActiviteitenVanStad(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadStad(id);
  }, [ id, stedenStore, setStad ]);

  return (
   <>
   <div>

   {/* <Terug path={`${ROUTES.reisoverzicht.to}${currentReis.id}`}/> */}


    {/* <p>Detailpage van {stad.name}</p>
    {stad.activities.map(
            activiteit => (
              // console.log(activiteit)
                <Link key={activiteit.id} to={`${ROUTES.activiteitDetail.to}${activiteit.id}`}>{activiteit.name}</Link>
        )
        )} */}

        <div className={styles.nav}>
               <Terug path={``} />
               <div className={styles.nav_stad}>
                  <img src={hang} alt=""/>
                  <p className={styles.stad_naam}>Hanoi</p>
               </div>
               <AantalStappen/>

        </div>
        <img className={styles.kaart} src={kaart} alt=""/>

        <div className={styles.activiteiten}>
          <div className={styles.activiteit}>
            <img className={styles.img_act} src={""} alt=""/>
            <p className={styles.activiteit_title}>De Rooftopbar</p>
            <div className={styles.text_but_pos}>
              <p className={`${styles.activiteit_text}`}>Geen zin meer om de stad in te trekken? Kom mee naar de bekendste rooftopbar van Hanoi. Hier heb je een prachtig uitzicht over de stad.</p>
              <div className={styles.pos}>
                <div className={styles.steps}>
                    <img  src={step} alt=""/>
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
                    <img  src={step} alt=""/>
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
                    <img  src={step} alt=""/>
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
