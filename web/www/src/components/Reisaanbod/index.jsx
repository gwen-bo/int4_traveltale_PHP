import React, { useEffect, useState }  from "react";
import Navigatie from "../Navigatie";
import { useStores } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import styles from "./Reisaanbod.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import Empty from "../Empty";
import Help from "../buttons/Help";

const Reisaanbod = () => {
  const {landenStore} = useStores()

  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "fullyLoaded";
  const landen = landenStore.landen
  const [state, setState] = useState(STATE_LOADING);

  useEffect(() => {
    const loadBestemmingen = async () => {
      if (landenStore.landen.length === 0) {
      try {
        // await landenStore.loadAllLanden();
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error);
        }
      }
    }else {
      setState(STATE_FULLY_LOADED);
    }};
    loadBestemmingen();
  }, [setState, landen, landenStore]); 

   return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    } return (
    <>
      <Navigatie />
      <Help />
      <div className={styles.center}>
        <div className={styles.wrapper}>
          <section className={styles.reisaanbod}>
            <p className={styles.title}>Ontdek onze bestemmingen</p>
            <div className={styles.filterwrapper}>
              <ul className={styles.filters}>
                <li className={styles.filter_button}>Actieve reizen</li>
                <li className={styles.filter_button}>Gastronomische reizen</li>
                <li className={styles.filter_button}>Rustige reizen</li>
                <li className={styles.filter_button}>Tropische reizen</li>
              </ul>
              <div className={styles.bestemming_wrapper}>
                {landenStore.landen.map((bestemming) => (
                  <Link
                    to={`${ROUTES.aanbodDetail.to}${bestemming.id}`} key={bestemming.id}>
                    <div className={styles.bestemming}>
                      <div className={styles.bestemming_info}>
                        <div className={styles.bestemming_header}>
                          <img alt={`naamplaatje van ${bestemming.naam}`} src={'/assets/img/reisaanbod/nametag.svg'}></img>
                          <p className={styles.bestemming_naam}>
                            {" "}
                            {bestemming.naam}
                          </p>
                        </div>
                        <img alt="het stappenniveau van de bestemming"
                          className={styles.bestemming_niveau}
                          src={
                            bestemming.stappen_niveau === 1
                              ? '/assets/img/reisaanbod/niveau1.svg'
                              : bestemming.stappen_niveau === 2
                              ? '/assets/img/reisaanbod/niveau2.svg'
                              : '/assets/img/reisaanbod/niveau3.svg'
                          }
                        ></img>
                        <div
                          className={`${styles.button} ${styles.details}`}
                          to={`${ROUTES.aanbodDetail.to}${bestemming.id}`}
                          key={bestemming.id}
                        >
                          Details
                        </div>
                      </div>
                      <div className={styles.bestemming_img}>
                        <img alt={`de kaart van ${bestemming.naam}`}
                          src={`/assets/img/reisaanbod/kaarten/${bestemming.naam}.svg`}
                        ></img>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>)
  });
};

export default Reisaanbod;