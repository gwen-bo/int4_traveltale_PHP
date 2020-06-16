import React from "react";
import { useStores } from "../../hooks";
import stappenIcon from "../../assets/img/stappenIcon.svg"

import styles from "./AantalStappen.module.css";

const AantalStappen = () => {
 
    const {uiStore} = useStores();
    const stappen = uiStore.currentSteps;

  return (
    <>
    <div className={styles.wrapper}>
        <p className={styles.text}>Stappen:</p>
        <div className={styles.bol}>
            <p className={styles.stappen}>{stappen}</p>
            <img className={styles.img} src={stappenIcon} alt="zwarte voetstappen"></img>

        </div>

    </div>
    </>
  );
};

export default AantalStappen;
