import React from "react";
import { Link, Redirect } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import styles from "./Inloggen.module.css";
import Help from "../buttons/Help";

const Inloggen = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;
 

  return (
   <>
   {(currentProfile === undefined)? 
    
    <section className={styles.wrapper}>
      <div className={styles.inloggen}>
        <div className={styles.section_header}>
          <h1 className={styles.title}>Welkom bij Travel Tale</h1>
          <p className={styles.uitleg}><span className={styles.uitleg_nadruk}>Ben je hier voor de eerste keer of ben je hier al vaker geweest?</span></p>
        </div>

      <Help />

      <div className={styles.button_wrapper}>
                <Link className={styles.button} to={ROUTES.registratie}>Dit is mijn eerste keer</Link>
                <Link className={styles.button} to={ROUTES.aanmelden}>Ik heb al een account</Link>

      </div>
      </div>
  </section>
  : 
    <Redirect to={ROUTES.overzicht} /> 
   }
   </>
  );
};

export default Inloggen;