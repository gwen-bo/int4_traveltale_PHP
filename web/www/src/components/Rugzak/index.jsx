import React, { useState, useEffect }  from "react";
import { useStores } from "../../hooks";
import styles from "./Rugzak.module.css";
import { ROUTES } from "../../consts";
import Terug from "../buttons/Terug";
import { useObserver } from "mobx-react-lite";
import Empty from "../Empty";
import Help from "../buttons/Help";
import HelpRugzak from "../../flows/HelpScreens/HelpRugzak";

const Rugzak = () => {
  const {uiStore, authStore } = useStores();
  const STATE_LOADING = "loading";
  const STATE_FULLY_LOADED = "FullyLoaded";
  const [user, setUser] = useState(uiStore.currentUser);
  const [state, setState] = useState(user ? STATE_FULLY_LOADED : STATE_LOADING);
  const [fontsize, setFontSize] = useState("medium");
  
  useEffect(() => {
    const loadData = async () => {
      if(uiStore.currentUser === undefined){
      await authStore.fetchData();
      authStore.loadCheckedForUser(uiStore.currentUser)
      setUser(uiStore.currentUser);
      setFontSize(uiStore.currentUser.fontsize);
      setState(STATE_FULLY_LOADED);
    }else {
      await authStore.loadCheckedForUser(uiStore.currentUser)
      setState(STATE_FULLY_LOADED);
    }}
    loadData();
  }, [setState, setUser, authStore, uiStore.currentUser]);

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    }
    return(
   <>
      {uiStore.help === true ? <HelpRugzak /> : "" }

      <Terug path={`${ROUTES.reisoverzicht.to}${uiStore.currentReis.id}`} />
      <Help />
      <article className={styles.rugzak_pos}>
        <div className={styles.rugzak_pos_header}>
          <div className={styles.rugzak_intro}>
            <p className={styles.rugzak_title}>Mijn rugzak</p>
            <p className={`${styles.rugzak_text} ${
              fontsize === "small" ? styles.small : fontsize === "medium" ? styles.medium : styles.large}`}>Hier vindt je een overzicht van alle souvenirs en het totaal aantal gezette stappen.</p>
          </div>
          <div className={styles.rugzak_stappen}>
            <p className={styles.rugzak_totaal}>Totaal aantal gezette stappen</p>
            <p className={styles.rugzak_totaal_stappen}><img className={styles.steps_inlext} src={'/assets/img/stappenIcon.svg'} alt="spannen icon"/> {user.stappen}</p>
          </div>
        </div>

        
        <div className={styles.rugzak_items_pos}>
              {uiStore.currentReis.souvenirs.map(souvenir => 
                {const isChecked = uiStore.currentUser.checkifCheckedSouvenir(souvenir.souvenir_id); 

                  if(isChecked === undefined){
                    return(
                  <div key={souvenir.stad_naam} className={styles.rugzak_items}>
                    <p className={styles.rugzak_plaats}>{souvenir.stad_naam}</p>
                    <div className={styles.rugzak_item_bol}>
                      <img className={styles.rugzak_item} src={`/assets/img/souvenirs/unlocked.svg`} alt={`Dit is de ${souvenir.souvenir_naam}, dit heb je verdient in ${souvenir.stad_naam}`}/>
                    </div>
                    <p className={styles.rugzak_item_naam}>???</p>
                  </div>
                )
                  }else {
                    return(
                    <div key={souvenir.stad_naam} className={styles.rugzak_items}>
                      <p className={styles.rugzak_plaats}>{souvenir.stad_naam}</p>
                      <div className={styles.rugzak_item_bol}>
                        <img className={styles.rugzak_item} src={`/assets/img/steden/${souvenir.stad_naam}/${souvenir.souvenir_img}.svg`} alt={`Dit is de ${souvenir.souvenir_naam}, dit heb je verdient in ${souvenir.stad_naam}`}/>
                      </div>
                      <p className={styles.rugzak_item_naam}>{souvenir.souvenir_naam}</p>
                    </div>
                  )
                  }
                }
              )}
        </div>
      </article>
   </>  
   )});
};

export default Rugzak;
