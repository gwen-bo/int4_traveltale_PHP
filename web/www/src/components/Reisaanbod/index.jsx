import React, { useState } from "react";
import Navigatie from "../Navigatie";
import { useStores } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import styles from "./Reisaanbod.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

import niveau1 from "../../assets/img/reisaanbod/niveau1.svg"
import niveau2 from "../../assets/img/reisaanbod/niveau2.svg"
import niveau3 from "../../assets/img/reisaanbod/niveau3.svg"
import hangers from "../../assets/img/reisaanbod/nametag.svg"

const Reisaanbod = () => {
  const {landenStore} = useStores()



   return useObserver(() => (
    <>
     <Navigatie />
     <section className={styles.reisaanbod}>
      <p className={styles.title}>Ontdek onze bestemmingen</p>
      <div className={styles.wrapper}>
        <ul className={styles.filters}>
          <li className={styles.filter_button}>Actieve reizen</li>
          <li className={styles.filter_button}>Gastronomische reizen</li>
          <li className={styles.filter_button}>Rustige reizen</li>
          <li className={styles.filter_button}>Tropische reizen</li>
        </ul>
        <div className={styles.bestemming_wrapper}>
        {landenStore.landen.map(bestemming => (
          <Link to={`${ROUTES.aanbodDetail.to}${bestemming.id}`}  key={bestemming.id}>
            <div className={styles.bestemming}>
            <div className={styles.bestemming_info}>
              <div className={styles.bestemming_header}>
                <img src={hangers}></img>
                <p className={styles.bestemming_naam}> {bestemming.name}</p>
              </div>
              <img className={styles.bestemming_niveau} src={(bestemming.steps === 1) ? niveau1 : (bestemming.steps === 2) ? niveau2 : niveau3}></img>
              <div className={`${styles.button} ${styles.details}`} to={`${ROUTES.aanbodDetail.to}${bestemming.id}`}  key={bestemming.id}>Details</div>
            </div>
              <div className={styles.bestemming_img}>
                <img src={require(`../../assets/img/reisaanbod/kaarten/${bestemming.name}.svg`)}></img>
              </div>
              
            </div>
          </Link>

        ))}
        </div>
      </div>
    </section>
  </>
  ));
};

export default Reisaanbod;