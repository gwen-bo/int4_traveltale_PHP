import React, { useState, useEffect }  from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../hooks";
import styles from "./Rugzak.module.css";
import { ROUTES } from "../../consts";

import kimono from "../../assets/img/rugzak/kimono.svg"
import Terug from "../buttons/Terug";
import { useObserver } from "mobx-react-lite";
import Empty from "../Empty";

const Rugzak = () => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();

  const {uiStore, authStore} = useStores();

  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "FullyLoaded";

  const [user, setUser] = useState(uiStore.currentUser);
  const [state, setState] = useState(user ? STATE_FULLY_LOADED : STATE_LOADING);
  const [fontsize, setFontSize] = useState("medium");

  useEffect(() => {
    const loadData = async () => {
      if(uiStore.currentUser === undefined){
      await authStore.fetchData();
      setUser(uiStore.currentUser);
      setFontSize(uiStore.currentUser.fontsize);
      setState(STATE_FULLY_LOADED);
    }else {
      setState(STATE_FULLY_LOADED);
    }}
    loadData();
  }, []);

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    }
    return(
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
            <p className={`${styles.rugzak_text} ${
              fontsize === "small" ? styles.small : fontsize === "medium" ? styles.medium : styles.large}`}>Hier vindt je een overzicht van alle souvenirs en het totaal aantal gezette stappen.</p>
          </div>
          <div className={styles.rugzak_stappen}>
            <p className={styles.rugzak_totaal}>Totaal aantal gezette stappen</p>
            <p className={styles.rugzak_totaal_stappen}>{user.stappen}</p>
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
   )});
};

export default Rugzak;
