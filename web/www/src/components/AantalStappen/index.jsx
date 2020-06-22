import React, { useEffect, useState } from "react";
import { useStores } from "../../hooks";
import stappenIcon from "../../assets/img/stappenIcon.svg"

import styles from "./AantalStappen.module.css";
import { useObserver } from "mobx-react-lite";
import Empty from "../Empty";
import Loading from "./Loading";

const AantalStappen = () => {
 
    const {uiStore, authStore} = useStores();
    // const stappen = uiStore.currentSteps;
    const [user, setUser] = useState(uiStore.currentUser);
    const [stappen, setStappen] = useState(uiStore.currentSteps);

    const STATE_LOADING = "loading";
    const STATE_FULLY_LOADED = "FullyLoaded";

    const [state, setState] = useState(STATE_LOADING);

    useEffect(() => {
      console.log("use effect wordt opgestart")
      const loadData = async () => {
        if(uiStore.currentUser === undefined){
        await authStore.fetchData();
        const steps = uiStore.currentSteps;
        setUser(uiStore.currentUser);
        setStappen(steps);
        setState(STATE_FULLY_LOADED);
      }else {
        setState(STATE_FULLY_LOADED);
      }}
      loadData();
    }, []);

    return useObserver(() => {
      if (state === STATE_LOADING) {
      return <Loading />;
    }return (
    <>
    <div className={styles.wrapper}>
        <p className={styles.text}>Stappen:</p>
        <div className={styles.bol}>
            <p className={styles.stappen}>{stappen}</p>
            <img className={styles.img} src={stappenIcon} alt="zwarte voetstappen"></img>

        </div>
    </div>
    </>
   ) });
};

export default AantalStappen;
