import React from "react";
import { Link, useHistory } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import styles from "./NotFound.module.css";
import LottieFeedback from "../Feedback/LottieFeedback";
import Help from "../buttons/Help";

const NotFound = () => {
 
  const history = useHistory();
  const {uiStore} = useStores();

  return (
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <Help />
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Deze pagina bestaat niet!</h1>
        <p className={styles.uitleg}>De pagina die je probeert te zoeken bestaat niet. <br></br><span className={styles.uitleg_nadruk}>Zeker dat je de juiste route hebt?</span></p>
    </div>
    <LottieFeedback
          props="verbaasd"
        />
        <div className={styles.button_wrapper}>
            <Link className={styles.button} to={ROUTES.overzicht}>Ga terug naar overzicht</Link>
        </div>

    </section>
    </>
  );
};

export default NotFound;
