import React from "react";
import { Link } from "react-router-dom";
import {ROUTES} from "../../consts";
import styles from "./ComingSoon.module.css";
import LottieFeedback from "../Feedback/LottieFeedback";
import Help from "../buttons/Help";

const ComingSoon = () => {
 
  return (
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <Help />
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>We zijn er mee bezig</h1>
        <p className={styles.uitleg}>De pagina die je probeert te zoeken bestaat <span className={styles.uitleg_nadruk}>nog niet.</span> <br></br>Kom je later eens terug?</p>
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

export default ComingSoon;
