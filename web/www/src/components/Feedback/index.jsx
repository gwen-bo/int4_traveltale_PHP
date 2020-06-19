import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import logo from "../../assets/img/logo.svg"

import styles from "./Feedback.module.css";
import UiStore from "../../stores/UiStore";
import LottieFeedback from "./LottieFeedback";

const Feedback = () => {
 
  const history = useHistory();
  const {uiStore} = useStores();

  return (
    <>
    <img src={logo} alt="logo Travel Tale"></img>

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
