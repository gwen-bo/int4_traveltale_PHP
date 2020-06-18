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
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";



const ReisOverzicht = () => {
  const { id } = useParams();
  const history = useHistory();

    const {uiStore, landenStore} = useStores()
    // const currentProfile = uiStore.currentProfile; 
    // const bestemming = landenStore.getLandById(id)

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [bestemming, setBestemming] = useState(landenStore.getLandById(id));
  const [state, setState] = useState(bestemming ? STATE_LOADING_MORE_DETAILS : STATE_LOADING);

  useEffect(() => {
    const loadLand = async (id) => {
      try {
        const bestemming = await landenStore.getLandById(id);
        if (!bestemming) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setBestemming(bestemming);
        setState(STATE_LOADING_MORE_DETAILS);
        console.log('loading steden');
        await landenStore.loadStedenVanLand(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadLand(id);
  }, [ id, landenStore, setBestemming ]); 

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <p>Niet gevonden</p>;
    }
    if (state === STATE_LOADING) {
      return <p>Aan het laden..</p>;
    }
    console.log(bestemming);
    return (
     
   <>
   <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <AantalStappen/>
   </div>
   <section>
     <div className={styles.reis_title}>
          <img src={hangers} alt="hangers voor het naamplaatje"></img>
          <p className={styles.bestemming_naam}> {bestemming.naam}</p>
     </div>
   
   <div className={styles.wrapper_steden}>
     <div className={styles.wrapper_top}>
     <div className={styles.start}>
         <img className={styles.start_background} src={require(`../../assets/img/reisoverzicht/Start.svg`)} alt="Start van het reisoverzicht"></img>
    </div>
        {bestemming.steden.map(
            stad => (
        <div className={styles.stad} key={stad.id}>
                <div>
                </div>
                <div className={styles.stad_img}>
                  <div className={styles.tekst_wrapper}>
                    <div className={styles.steps_wrapper}>
                    <img className={styles.steps_icon} src={steps} alt="icoontje voetstappen"></img>
                    <p>{stad.stappen}</p>
                    </div>
                    <p className={styles.stadName}>{stad.naam}</p>
                    <img className={styles.lijn} src={lijn} alt="lijn naar beneden"></img>
                  </div>
                  <img className={styles.stad_background} src={require(`../../assets/img/reisoverzicht/${bestemming.naam}/${stad.naam}.svg`)} alt={`illustratie van skyline ${stad.naam}`}></img>
                </div>
        </div>
        ))}
    <div className={styles.finish}>
        <img className={styles.start_background} src={require(`../../assets/img/reisoverzicht/Finish.svg`)} alt="Einde van het reisoverzicht"></img>
    </div>
    </div>
    <div className={styles.wrapper_bottom}>
      <div className={styles.progressbar}></div>
      <div className={styles.width_start}></div>
        {bestemming.steden.map(stad => (
          <div key={stad.id} className={styles.width_stad}>
            <div className={styles.progess_wrapper}>
              {(uiStore.currentSteps > stad.stappen) ?  <img alt={`${stad} is nog niet beschikbaar`} src={open}></img> :  <img alt={`${stad} is nog niet beschikbaar`} src={locked}></img>}
           
            <Link to={`${ROUTES.stadkeuze.to}${stad.id}`} className={`${styles.button} ${styles.button_stad}`}>{stad.naam} ontdekken</Link>
          </div>
          </div>
        ))}
    </div>
    </div>
</section>
   </>)
  });
};

export default ReisOverzicht;
