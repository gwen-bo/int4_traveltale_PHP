import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../hooks";
import styles from "./StadDetail.module.css";
import Terug from "../buttons/Terug";
import AantalStappen from "../AantalStappen";
import Empty from "../Empty"
import { ROUTES } from "../../consts";
import { Link } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Help from "../buttons/Help";



const StadDetail = () => {
  const {stedenStore, uiStore} = useStores();
  const { id } = useParams();
  const history = useHistory();

  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [stad, setStad] = useState(stedenStore.getStadById(id));
  const [state, setState] = useState(stad ? STATE_FULLY_LOADED : STATE_LOADING);
  const fontsize = sessionStorage.getItem('fontsize');

  useEffect(() => {
    const loadStad = async (id) => {
      if(stad === undefined){
      try {
        await stedenStore.loadAllSteden(); 
        stedenStore.loadActiviteitenVanStad(id);
        const stad = await stedenStore.getStadById(id);
        if (!stad) {
          uiStore.setFeedback({
            title: 'Deze stad konden wij niet vinden!', 
            uitleg: 'Sorry, maar het ziet er naar uit dat deze stad niet bestaat. Selecteer een andere stad om te verkennen.',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
            prim_name: 'Terug naar reisaanbod'
          })
          history.push('/feedback');
        }
        setStad(stad);
        console.log(stad);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          uiStore.setFeedback({
            title: 'Er ging iets fout.', 
            uitleg: 'Sorry, maar het ziet er naar uit dat deze stad niet bestaat. Selecteer een andere stad om te verkennen.',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
            prim_name: 'Terug naar reisoverzicht'
          })
          history.push('/feedback');        }
      }}else {
        setState(STATE_FULLY_LOADED);
      }
    };
    loadStad(id);
  }, [id, setState, setStad, history, stedenStore, uiStore, stad]);

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Activiteiten aan het laden.."} />;
    }
    return (
      <>
      <AantalStappen className={styles.stappen} />
      <section>
        <img className={styles.kaart} src={'/assets/img/kaart.svg'} alt="de kaart van de stad waar je je nu bevindt" />
        <div className={styles.nav_wrapper}>
          <div className={styles.midden}>
            <div className={styles.reis_title}>
              <img src={'/assets/img/reisoverzicht/hangers.svg'} alt="hangers waar het naamplaatje van de activiteit aan hangt"></img>
              <p className={styles.bestemming_naam}>{stad.naam}</p>
            </div>
          </div>
          <Help />
          <Terug className={styles.order} path={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`} />
        </div>
        <div className={styles.center}>
          <div className={styles.activiteiten}>
            {stad.activiteiten.map((activiteit) => (
              <div key={activiteit.id} className={styles.activiteit}>
                <img
                  className={styles.img_act}
                  src={`/assets/img/steden/${stad.naam}/${activiteit.header_img}.svg`}
                  alt={`hoofdafbeelding van de activiteit ${activiteit.naam}`}
                />
                <p className={styles.activiteit_title}>{activiteit.naam}</p>
                <div className={styles.text_but_pos}>
                  <p className={`${styles.activiteit_text} ${
              (fontsize === "small" ) ? styles.small : (fontsize === "medium" ) ? styles.medium : styles.large}`}>
                    {activiteit.activiteit_uitleg}
                  </p>
                  <div className={styles.pos}>
                    <div className={styles.steps}>
                      <img
                        src={'/assets/img/reisaanbod/niveau1.svg'}
                        alt="voetstappen icoontje, maximum hoeveelheid stappen tijdens deze activiteit"
                      />
                      <p className={styles.steps_aantal}>
                        max. {activiteit.max_steps}
                      </p>
                    </div>
                    <Link
                      to={`${ROUTES.intro.to}${activiteit.id}`}
                      className={styles.button}
                    >
                      Starten
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
   )});
};

export default StadDetail;
