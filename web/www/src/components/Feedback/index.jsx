import React from "react";
import { Link, useHistory } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import styles from "./Feedback.module.css";
import LottieFeedback from "./LottieFeedback";
import Help from "../buttons/Help";

const Feedback = () => {
 
  const history = useHistory();
  const {uiStore} = useStores();

  return (
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <Help />
    <section className={styles.section}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>{uiStore.title}</h1>
        <p className={styles.uitleg}>{uiStore.uitleg}</p>
        </div>
    <LottieFeedback
          props={uiStore.animation}
        />
        <div className={styles.button_wrapper}>
            <button onClick={() => {history.goBack();}} className={styles.button_sec} to={ROUTES.home}>{uiStore.sec_name}</button>
            <Link className={styles.button} to={uiStore.prim_path}>{uiStore.prim_name}</Link>
        </div>

    </section>
    </>
  );
};

export default Feedback;
