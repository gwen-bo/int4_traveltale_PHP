import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../hooks";
import Navigatie from "../Navigatie";
import styles from "./Rugzak.module.css";
import { ROUTES } from "../../consts";
import { Link } from "react-router-dom";

import kimono from "../../assets/img/rugzak/kimono.svg"
import Terug from "../buttons/Terug";



// import style from "./LandDetail.module.css";

const Rugzak = () => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();

  const {activiteitenStore, uiStore} = useStores();
  const activiteit = activiteitenStore.getActiviteitById(id)
  console.log(activiteit)

  return (
   <>
    {/* <Link
        className={styles.back}
        to={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`}
        >
        <div className={`${styles.nav_button} ${styles.mijn_reis}`}>
              </div>
              <p className={styles.nav_tekst}>Terug</p>
      </Link> */}
      <Terug path={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`} />
      <article className={styles.rugzak_pos}>
        <div className={styles.rugzak_pos_header}>
          <div className={styles.rugzak_intro}>
            <p className={styles.rugzak_title}>Mijn rugzak</p>
            <p className={styles.rugzak_text}>Hier vindt je een overzicht van alle souvenirs en het totaal aantal gezette stappen.</p>
          </div>
          <div className={styles.rugzak_stappen}>
            <p className={styles.rugzak_totaal}>Totaal aantal gezette stappen</p>
            <p className={styles.rugzak_totaal_stappen}>7.001 stappen</p>
          </div>
        </div>
        <div className={styles.rugzak_items_pos}>
          <div className={styles.rugzak_items}>
            <p className={styles.rugzak_plaats}>Hanoi</p>
            <div className={styles.rugzak_item_bol}>
              <img className={styles.rugzak_item} src={kimono} alt=""/>
            </div>
            <p className={styles.rugzak_item_naam}>Zijden kimono</p>
          </div>
          <div className={styles.rugzak_items}>
            <p className={styles.rugzak_plaats}>Hanoi</p>
            <div className={styles.rugzak_item_bol}>
              <img className={styles.rugzak_item} src={kimono} alt=""/>
            </div>
            <p className={styles.rugzak_item_naam}>Zijden kimono</p>
          </div>
          <div className={styles.rugzak_items}>
            <p className={styles.rugzak_plaats}>Hanoi</p>
            <div className={styles.rugzak_item_bol}>
              <img className={styles.rugzak_item} src={kimono} alt=""/>
            </div>
            <p className={styles.rugzak_item_naam}>Zijden kimono</p>
          </div>
          <div className={styles.rugzak_items}>
            <p className={styles.rugzak_plaats}>Hanoi</p>
            <div className={styles.rugzak_item_bol}>
              <img className={styles.rugzak_item} src={kimono} alt=""/>
            </div>
            <p className={styles.rugzak_item_naam}>Zijden kimono</p>
          </div>
        </div>
        

      </article>
   </>
  );
};

export default Rugzak;
