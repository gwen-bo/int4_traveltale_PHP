import React from "react";
import { Link, Redirect } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import logo from "../../assets/img/logo.svg"
import UncontrolledLottie from "../../flows/Onboarding/OnboardingIntro/UncontrolledLottie"
import styles from "./Inloggen.module.css";

const Inloggen = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;
 

  return (
   <>
   {(currentProfile === undefined)? 
  
  <section className={styles.section}>
    <UncontrolledLottie
    // className={styles.animatie_circle}
    props="welkom"
  />
    <div className={styles.button_wrapper}>
              <Link className={styles.button} to={ROUTES.registratie}>Dit is mijn eerste keer</Link>
              <Link className={styles.button} to={ROUTES.aanmelden}>Ik heb al een account</Link>

    </div>
  </section>
  : 
    <Redirect to={ROUTES.overzicht} /> 
   }
   </>
  );
};

export default Inloggen;