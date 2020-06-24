import React, { useEffect, useState } from "react";
import { useStores } from "../../hooks";
import styles from "./AantalStappen.module.css";
import { useObserver } from "mobx-react-lite";
import Loading from "./Loading";

const AantalStappen = () => {
 
    const {uiStore, authStore} = useStores();
    const [stappen, setStappen] = useState(uiStore.currentSteps);

    const STATE_LOADING = "loading";
    const STATE_FULLY_LOADED = "FullyLoaded";

    const [state, setState] = useState(STATE_LOADING);

    useEffect(() => {
      const loadData = async () => {
        if(uiStore.currentUser === undefined){
        await authStore.fetchData();
        const steps = uiStore.currentSteps;
        setStappen(steps);
        setState(STATE_FULLY_LOADED);
      }else {
        setState(STATE_FULLY_LOADED);
      }}
      loadData();
    }, [setState, authStore, uiStore.currentSteps, uiStore.currentUser]);

    return useObserver(() => {
      if (state === STATE_LOADING) {
      return <Loading />;
    }return (
    <>
    <div className={styles.wrapper}>
        <p className={styles.text}>Stappen:</p>
        <div className={styles.bol}>
            <p className={styles.stappen}>{stappen}</p>
            <img className={styles.img} src={'/assets/img/stappenIcon.svg'} alt="zwarte voetstappen"></img>

        </div>
    </div>
    </>
   ) });
};

export default AantalStappen;
