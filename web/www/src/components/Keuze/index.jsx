import React from "react";
import { Link, useParams } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import styles from "./Keuze.module.css";
import LottieFeedback from "../Feedback/LottieFeedback";
import Help from "../buttons/Help";

const Keuze = () => {
 
  const { id } = useParams();
  const {uiStore, landenStore } = useStores();
  const bestemming = landenStore.getLandById(id)
  console.log(bestemming)

  const handleStart = () => {
    uiStore.setCurrentReis(bestemming.id);
    // user.updateReis();
  }

  return useObserver(() => (
    <>
    <Help />
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>

    {(uiStore.currentReis === undefined) ?
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Laten we beginnen!</h1>
        <p className={styles.uitleg}>Klaar om <span className={styles.uitleg_nadruk}>{bestemming.naam}</span> te ontdekken?</p>
    </div>
    <LottieFeedback
          props="vertrekt"
    />          
    <div className={styles.button_wrapper}>
            <Link className={styles.button_sec} to={ROUTES.reisaanbod}>Terug naar overzicht</Link>
            <Link onClick={e => handleStart()} className={styles.button} to={`${ROUTES.reisoverzicht.to}${bestemming.id}`}>Start deze reis</Link>
        </div>
    </section>
    : 
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Je bent al aan het reizen!</h1>
        <p className={styles.uitleg}>Het ziet er naar uit dat je momenteel al in <span className={styles.uitleg_nadruk}>{uiStore.currentReis.naam}</span> zit.</p>
        <p className={styles.uitleg_nadruk}>Ben je zeker dat je deze reis wilt verlaten om een nieuwe reis te beginnen?</p>
    </div>
    <LottieFeedback
          props="verbaasd"
    />       
    <div className={styles.button_wrapper}>
            <Link className={styles.button_sec} to={ROUTES.reisaanbod}>Terug naar overzicht</Link>
            <Link onClick={e => handleStart()} className={styles.button} to={`${ROUTES.reisoverzicht.to}${bestemming.id}`}>Start deze reis</Link>

        </div>
    </section>
    }
    </>
 ) );
};

export default Keuze;
