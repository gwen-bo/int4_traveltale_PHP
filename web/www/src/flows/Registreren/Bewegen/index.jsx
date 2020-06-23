import React  from "react";
import { useHistory } from "react-router";
import { useStores } from "../../../hooks";
import {ROUTES} from "../../../consts";
import styles from "./Bewegen.module.css";
import { Link } from "react-router-dom";
import Help from "../../../components/buttons/Help";
import { useObserver } from "mobx-react-lite";

const Bewegen = () => {
  const {authStore} = useStores();
  const history = useHistory();
  
return useObserver(() =>
   <>
    <Help />

    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <div className={styles.bewegen}>
          <p className={styles.title}>Selecteer wat voor jou van toepassing is</p>
          <form action="" className={styles.bewegen_position}>
                <label className={styles.thema_radio} htmlFor={'kroes'}>
                <input className={styles.input_bewegen} type="radio" checked={authStore.registratieBeweeg === 'kroes'} onChange={e => authStore.setBewegenRegistratie('kroes')} name='bewegen' id={'kroes'}></input>
                      <div className={`${styles.bewegen_text} ${styles.box}`}>
                            <img className={styles.bewegen_img} src={'/assets/img/scooter_bomma.svg'} alt="Ouder vrouwtje in een scooter, je bent niet zo heel goed meer te been, maar wil gerust wel wandelen."/>
                        <p className={styles.bewegen_label}>Ik voel kwaaltjes als ik wandel</p>
                        </div>
                  </label>

        <label className={styles.thema_radio} htmlFor={'skate'}>
        <input className={styles.input_bewegen} type="radio" checked={authStore.registratieBeweeg === 'skate'} onChange={e => authStore.setBewegenRegistratie('skate')} name='bewegen' id={'skate'}></input>
              <div className={`${styles.bewegen_text} ${styles.box}`}>
                    <img className={styles.bewegen_img} src={'/assets/img/skate_bomma.svg'} alt="Ouder vrouwtje op een skateboard, je bent redelijk vlot te been."/>
                    <p className={styles.bewegen_label}>Na een tijdje krijg ik het lastig</p>
                    </div>
                    </label>

        <label className={styles.thema_radio} htmlFor={'fly'}>
        <input className={styles.input_bewegen} type="radio" checked={authStore.registratieBeweeg === 'fly'} onChange={e => authStore.setBewegenRegistratie('fly')} name='bewegen' id={'fly'}></input>
              <div className={`${styles.bewegen_text} ${styles.big}`}>
                    <img className={styles.bewegen_img} src={'/assets/img/fly_bomma.svg'} alt="Ouder vrouwtje die vliegt, je bent zeer vlot te been en hebt geen enkel probleem met stapepn."/>
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