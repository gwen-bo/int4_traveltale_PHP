import React from "react";
// import {ROUTES} from "../../consts";
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
import { useParams, Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";



const ReisOverzicht = () => {
  const { id } = useParams();
  const history = useHistory();

    const {uiStore, bestemmingenStore} = useStores()
    const currentProfile = uiStore.currentProfile; 
    const bestemming = bestemmingenStore.getBestemmingById(id)
    console.log(bestemming);

    const checkSteps = (e, stad) => {
        e.preventDefault();
        console.log('dit is de stad', stad.steps);
        if(uiStore.currentSteps > stad.steps){
          console.log('je hebt genoeg stappen!');
          uiStore.setFeedback({
            title: `Welkom in ${stad.name}`, 
            uitleg: `Om ${stad.name} te kunnen ontdekken, heb je ${stad.steps} stappen nodig. Wil je ${stad.steps} stappen indienen om Hanoi te ontdekken?`,
            animation: 'animatie',
            sec_path: `${ROUTES.reisoverzicht.to}${bestemming.id}`, 
            sec_name: 'Terug naar overzicht',
            prim_path: `${ROUTES.stadDetail.to}${stad.id}`,
            prim_name: 'Stappen indienen'
          })
          history.push('/feedback')

        }else {
          console.log('je hebt NIET genoeg stappen!');
          uiStore.setFeedback({
            title: `Je hebt nog niet genoeg stappen`, 
            uitleg: `Het ziet er naar uit dat je nog niet genoeg stappen hebt verzameld om ${stad.name} te kunnen ontdekken. Kom je later nog eens terug?`,
            animation: 'animatie',
            sec_path: `${ROUTES.reisoverzicht.to}${bestemming.id}`, 
            sec_name: 'Terug naar overzicht',
            prim_path: `${ROUTES.reisoverzicht.to}${bestemming.id}`,
            prim_name: 'Beginnen met stappen'
          })
          // Redirect to="/feedback"
          history.push('/feedback')
        }
    }
    

  return useObserver(() => (
   <>
   <div className={styles.nav_wrapper}>
   <Terug path={ROUTES.overzicht}/>
   <Rugzak/>
   <AantalStappen/>
   </div>
   <section>
     <div className={styles.reis_title}>
          <img src={hangers}></img>
          <p className={styles.bestemming_naam}> {bestemming.name}</p>
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
                    <img className={styles.steps_icon} src={steps}></img>
                    <p>{stad.steps}</p>
                    </div>
                    <p className={styles.stadName}>{stad.name}</p>
                    <img className={styles.lijn} src={lijn} alt="lijn naar beneden"></img>
                  </div>
                  <img className={styles.stad_background} src={require(`../../assets/img/reisoverzicht/${bestemming.name}/${stad.name}.svg`)} alt={`illustratie van skyline ${stad.name}`}></img>
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
              {(uiStore.currentSteps > stad.steps) ?  <img alt={`${stad} is nog niet beschikbaar`} src={open}></img> :  <img alt={`${stad} is nog niet beschikbaar`} src={locked}></img>}
           
            <Link key={stad.id} onClick={e => checkSteps(e, stad)} to={`${ROUTES.stadDetail.to}${stad.id}`} className={`${styles.button} ${styles.button_stad}`}>{stad.name} ontdekken</Link>
          </div>
          </div>
        ))}
    </div>
    </div>
</section>
   </>
  ));
};

export default ReisOverzicht;
