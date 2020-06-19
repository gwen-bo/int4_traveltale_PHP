import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import styles from "./StadDetail.module.css";

// import rooftopbar from "../../assets/img/rooftopbar.svg"
// import treinstraat from "../../assets/img/treinstraat.svg"
import step from "../../assets/img/reisaanbod/niveau1.svg"
import Terug from "../buttons/Terug";
import AantalStappen from "../AantalStappen";
import Empty from "../Empty"
import hangers from "../../assets/img/reisoverzicht/hangers.svg"
import kaart from "../../assets/img/kaart.svg"
import { ROUTES } from "../../consts";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";


// import style from "./StadDetail.module.css";

const StadDetail = () => {
  const {stedenStore, uiStore} = useStores();

  const { id } = useParams();
  console.log(id);

  const STATE_LOADING = "aan het laden..";
  const STATE_DOES_NOT_EXIST = "bestaat niet..";
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
  }, [id, stedenStore, setStad]);

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <Empty message={"Oeps! Deze stad hebben we niet gevonden."} />;
    }
    if (state === STATE_LOADING_MORE_DETAILS) {
      return <Empty message={"Even geduld, we zijn de activiteiten aan het laden.."} />;
    }
    return (
   <>
   <section>
        <img className={styles.kaart} src={kaart} alt=""/>

        <div className={styles.nav_wrapper}>
            <Terug className={styles.order} path={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`}/>
                <div className={styles.midden}>
                    <div className={styles.reis_title}>
                          <img src={hangers}></img>
                          <p className={styles.bestemming_naam}>{stad.naam}</p>
                    </div>
                </div>
            <AantalStappen />
              </div>

<div className={styles.activiteiten}>
        {stad.activiteiten.map(
            activiteit => (
              // console.log(activiteit)
                <div key ={activiteit.id}className={styles.activiteit}>
                  <img className={styles.img_act} src={require(`../../assets/img/steden/${stad.naam}/${activiteit.header_img}.svg`)} alt={`hoofdafbeelding van de activiteit ${activiteit.naam}`}/>
                  <p className={styles.activiteit_title}>{activiteit.naam}</p>
                  <div className={styles.text_but_pos}>
                    <p className={`${styles.activiteit_text}`}>{activiteit.activiteit_uitleg}</p>
                    <div className={styles.pos}>
                      <div className={styles.steps}>
                          <img src={step} alt="voetstappen icoontje, maximum hoeveelheid stappen tijdens deze activiteit"/>
                          <p className={styles.steps_aantal}>{activiteit.max_steps}</p>
                      </div>
                      <Link to={`${ROUTES.intro.to}${stad.id}`} className={styles.button}>Starten</Link>
                    </div>
                  </div>
                </div>        


          )
        )}
</div>
   </section>
   </>
   )});
};

export default StadDetail;
