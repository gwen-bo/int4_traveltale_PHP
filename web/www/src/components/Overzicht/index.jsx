import React, { useEffect, useState } from "react";
import {useStores} from "../../hooks";
import { useObserver } from "mobx-react-lite";
import Navigatie from "../Navigatie";
import { Link} from "react-router-dom";
import { ROUTES } from "../../consts";
import styles from "./Overzicht.module.css";
import LottieOverzicht from "./LottieOverzicht";
import Empty from "../Empty";

const Overzicht = () => {
    const {uiStore, authStore} = useStores()
    // const currentProfile = uiStore.currentProfile; 
    const currentReis = uiStore.currentReis; 

    const STATE_LOADING = "loading";
    const STATE_FULLY_LOADED = "FullyLoaded";

    const [state, setState] = useState(STATE_LOADING);
    const [reis, setReis] = useState(uiStore.currentReis);
    const [user, setUser] = useState(uiStore.currentUser);

    useEffect(() => {
      const loadData = async () => {
        if(uiStore.currentUser === undefined || uiStore.currentReis === undefined){
        await authStore.fetchData();
        setReis(uiStore.currentReis);
        setUser(uiStore.currentUser);
        setState(STATE_FULLY_LOADED);
      }else {
        setState(STATE_FULLY_LOADED);
      }}
      loadData();
    }, []);

  return useObserver(() => {

    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    }
   return (
    <>
    <Navigatie />
    <div className={styles.center}>
      <div className={styles.wrapper}>
        <section className={styles.overzicht}>
          <div className={styles.links_wrapper}>
            <p className={styles.title}>{uiStore.begroeting} {user.firstName}</p>
            {currentReis === undefined ? (
              <>
                <p className={styles.uitleg}>
                  Het ziet er naar uit dat je momenteel nog geen reis gaande
                  hebt.{" "}
                </p>

                <p className={styles.uitleg_nadruk}>
                  Zullen we een reis starten?
                </p>
                <Link className={styles.button} to={ROUTES.reisaanbod}>
                  Toon reisaanbod
                </Link>
              </>
            ) : (
              <>
                <p className={styles.uitleg}>Welkom terug! </p>
                <p className={styles.uitleg}>
                  Momenteel ben je op reis in <span className={styles.uitleg_nadruk}>{currentReis.naam}</span>! Klaar om
                  er weer in te vliegen?
                </p>
                <div className={styles.icons_wrapper}>
                  <div className={styles.info_wrapper}>
                    <div className={styles.info_icon}>
                      <img
                        className={styles.icon_img}
                        src={'/assets/img/vlag.svg'}
                        alt="Vietnam vlag (het land waar je momenteel aan het reizen bent)"
                      />
                    </div>
                    <p className={styles.icon_tekst}>Vietnam</p>
                  </div>
                  <div className={styles.info_wrapper}>
                    <div className={styles.info_icon}>
                      <img
                        className={styles.icon_img}
                        src={'/assets/img/weer.svg'}
                        alt="Zon/wolken (welk weer het momenteel is in Vietnam)"
                      />
                    </div>
                    <p className={styles.icon_tekst}>24°C</p>
                  </div>
                  <div className={styles.info_wrapper}>
                    <div className={styles.info_icon}>
                      <img
                        className={styles.icon_img}
                        src={'/assets/img/weer.svg'}
                        alt="Finish vlag (in hoeverre het land voltooid is)"
                      />
                    </div>
                    <p className={styles.icon_tekst}>80% voltooid</p>
                  </div>
                </div>
                <Link
                  className={styles.button}
                  to={`${ROUTES.reisoverzicht.to}${currentReis.id}`}
                >
                  Ga verder met je reis
                </Link>
              </>
            )}
          </div>
          <div>
            {currentReis === undefined ? (
              <div className={styles.lottie}>
                <LottieOverzicht props="kaartkijken" />
              </div>
            ) : (
              <img className={styles.kaart} src={'assets/img/vietnamKaart.png'}></img>
            )}
          </div>
        </section>
      </div>
    </div>
  </>
  )
  });
};

export default Overzicht;
