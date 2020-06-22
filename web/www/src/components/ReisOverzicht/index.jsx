import React, { useEffect, useState } from "react";
import {useStores} from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { ROUTES } from "../../consts";
import Terug from "../buttons/Terug";
import Rugzak from "../buttons/Rugzak";
import hangers from "../../assets/img/reisoverzicht/hangers.svg"
import open from "../../assets/img/reisoverzicht/open.svg"
import locked from "../../assets/img/reisoverzicht/locked.svg"
import lijn from "../../assets/img/reisoverzicht/lineDown.svg"
import steps from "../../assets/img/stappenIcon.svg"
import styles from "./ReisOverzicht.module.css";
import AantalStappen from "../AantalStappen";
import Empty from "../Empty";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import ScrollLottie from "../buttons/Scroll/ScrollLottie";
import OmaWalkLottie from "../buttons/Scroll/OmaWalkLottie";


const ReisOverzicht = () => {
  const { id } = useParams();
  const history = useHistory();

  const {uiStore, landenStore, authStore} = useStores()

  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [bestemming, setBestemming] = useState(landenStore.getLandById(id));
  const [state, setState] = useState(bestemming ? STATE_FULLY_LOADED : STATE_LOADING);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const loadLand = async (id) => {
      if(uiStore.currentUser === undefined){
        setState(STATE_LOADING)
        await authStore.fetchData();
      }
      try {
        const bestemming = await landenStore.loadLand(id);
        if (!bestemming) {
          uiStore.setFeedback({
            title: 'Oeps!', 
            uitleg: 'Het ziet er naar uit dat je nog geen reis gekozen hebt. Kies je er eentje?',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisaanbod,
            prim_name: 'Terug naar reisaanbod'
          })
          history.push('/feedback');
        }
        setBestemming(bestemming);
        setProgress(progressLength()-5);
        console.log(bestemming)
        await landenStore.loadStedenVanLand(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error);
        }
      }
    };
    loadLand(id);
  }, [ id, landenStore, setState]); 

    const progressLength = () => {
    const checked = [];
    landenStore.getLandById(id).steden.forEach(stad => {
      const check = uiStore.currentUser.checkifCheckedStad(stad.id);
      if(check !== undefined){
        checked.push(stad);
      }})
      const lengte = checked.length; 
      const percent = (lengte/4)*100;
      if(percent === 0){
        return 20
      }
      console.log(percent);
      return percent
    }

    const testColor = {
    width: `${progress}%`,
    backgroundColor:'#FFBD3A',
    height: '1.5rem',
    borderRadius: '2rem',
  }

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    }
    return (
      <>
      <div className={styles.scroll_pos}>
        <ScrollLottie props="handswipe" />
      </div>
      <div className={styles.oma}>
        <OmaWalkLottie props="wandelen" />
      </div>
      <div className={styles.nav_wrapper}>
        <Terug path={ROUTES.overzicht} />
        <Rugzak />
        <AantalStappen />
      </div>
      <section>
        <div className={styles.reis_title}>
          <img src={hangers} alt="hangers voor het naamplaatje"></img>
          <p className={styles.bestemming_naam}> {bestemming.naam}</p>
        </div>
        <div className={styles.wrapper_steden}>
          <div className={styles.wrapper_top}>
            <div className={styles.start}>
              <img
                className={styles.start_background}
                src={require(`../../assets/img/reisoverzicht/Start.svg`)}
                alt="Start van het reisoverzicht"
              ></img>
            </div>
            {bestemming.steden.map((stad) => (
              <div className={styles.stad} key={stad.id}>
                <div></div>
                <div className={styles.stad_img}>
                  <div className={styles.tekst_wrapper}>
                    <div className={styles.steps_wrapper}>
                      <img
                        className={styles.steps_icon}
                        src={steps}
                        alt="icoontje voetstappen"
                      ></img>
                      <p className={styles.steps}>{stad.stappen}</p>
                    </div>
                    <p className={styles.stadName}>{stad.naam}</p>
                    <img
                      className={styles.lijn}
                      src={lijn}
                      alt="lijn naar beneden"
                    ></img>
                  </div>
                  <img
                    className={styles.stad_background}
                    src={require(`../../assets/img/reisoverzicht/${bestemming.naam}/${stad.naam}.svg`)}
                    alt={`illustratie van skyline ${stad.naam}`}
                  ></img>
                </div>
              </div>
            ))}
            <div className={styles.finish}>
              <img
                className={styles.start_background}
                src={require(`../../assets/img/reisoverzicht/Finish.svg`)}
                alt="Einde van het reisoverzicht"
              ></img>
            </div>
          </div>
          <div className={styles.wrapper_bottom}>
            <div className={styles.progressbar}>
              <div style={testColor}></div>
            </div>
            <div className={styles.width_start}></div>
            {bestemming.steden.map((stad) => ( 
              (uiStore.currentUser.checkifCheckedStad(stad.id) === undefined) ? 
                
                <div key={stad.id} className={styles.width_stad}>
                <div className={styles.progess_wrapper}>
                  {uiStore.currentSteps >= stad.stappen ? (
                    <img alt={`${stad} kan je nu ontdekken!`} src={open}></img>
                  ) : (
                    <img alt={`${stad} is nog niet beschikbaar`} src={locked} ></img>
                  )}
                  <Link to={`${ROUTES.stadkeuze.to}${stad.id}`} className={`${styles.button} ${styles.button_stad}`}>
                    {stad.naam} ontdekken </Link>
                </div>
              </div>
              : 
              <div key={stad.id} className={styles.width_stad}>
                <div className={styles.progess_wrapper}>
                <img alt={`${stad.naam} kan je nu ontdekken!`} src={open}></img>
                  <Link
                    to={`${ROUTES.stadDetail.to}${stad.id}`} className={`${styles.button} ${styles.button_stad}`} >
                    {stad.naam} ontdekken
                  </Link>
                </div>
              </div>
              )
              )}
          </div>
        </div>
      </section>
    </>
    )
  });
};

export default ReisOverzicht;
