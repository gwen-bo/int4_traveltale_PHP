import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {ROUTES} from "../../../consts";
import { useStores } from "../../../hooks";
import styles from "./Souvenir.module.css";
import Help from "../../../components/buttons/Help";
import { useObserver } from "mobx-react-lite";
import Empty from "../../../components/Empty";

const Souvenir = () => {
  const { id } = useParams();
  const {uiStore, souvenirsStore} = useStores();
  const history = useHistory();

  const STATE_LOADING = "aan het laden"; 
  const STATE_FULLY_LOADED = "volledig geladen"; 
  
  const [souvenir, setSouvenir] = useState(souvenirsStore.getSouvenirById(id))
  const [state, setState] = useState(souvenir ? STATE_FULLY_LOADED : STATE_LOADING); 


  useEffect (() => {
    const loadSouvenir = async (id) => {

      if(souvenir === undefined){
      try {
      await souvenirsStore.loadAllSouvenirs();
      const souvenir = souvenirsStore.getSouvenirById(id);
      if(!souvenir){
        uiStore.setFeedback({
          title: 'Oeps!', 
          uitleg: 'Er is iets misgelopen met de activiteit, probeer je nog eens?',
          animation: 'verbaasd',
          sec_path: '', 
          sec_name: 'Vorige',
          prim_path: ROUTES.reisoverzicht.to.sessionStorage.getItem('currentReis_id'),
          prim_name: 'Terug naar reisoverzicht'
        })
        history.push('/feedback');
        return;
      }
      setSouvenir(souvenir);
      console.log(souvenir)
      setState(STATE_FULLY_LOADED);
    }catch (error){
      if(error.response && error.response.status === 400){
      }
    }}else {
      setState(STATE_FULLY_LOADED);
    }};
    loadSouvenir(id);
  }, [id, setState, setSouvenir, souvenirsStore, uiStore, history, souvenir])

  const handleSouvenir = () => {
    const isChecked = uiStore.currentUser.checkifCheckedSouvenir(id); 
    if(isChecked === undefined){
      uiStore.currentUser.addCheckedSouvenir(souvenir.souvenir_id);
      }
  }

  return useObserver(() => {
    if (state === STATE_LOADING) {
      return <Empty message={"Even aan het laden.."} />;
    }
    return(
    <>
    <img src={'/assets/img/logo.svg'} alt="logo Travel Tale"></img>
    <Help />
    <section className={styles.souvenir}>
        <div className={styles.section_header}>
        <h1 className={styles.title}>Je hebt een souvenir verzameld!</h1>
        <p className={styles.uitleg}>{souvenir.souvenir_tekst}</p>
        <p className={styles.uitleg}>Je <span className={styles.uitleg_nadruk}>{souvenir.souvenir_img}</span> vindt je vanaf nu terug in je rugzak.</p>

    </div>

      <img className={styles.img_souvenir} src={`/assets/img/souvenirs/${souvenir.souvenir_img}.svg`} alt={`Dit is een ${souvenir.souvenir_naam}, deze souvenir heb je net verzameld!`}></img>
        <div className={styles.button_wrapper}>
            <Link onClick={e => {handleSouvenir()}} className={styles.button_sec} to={`${ROUTES.reisoverzicht.to}${sessionStorage.getItem('currentReis_id')}`}>Terug naar overzicht</Link>
            <Link onClick={e => {handleSouvenir()}} className={styles.button} to={ROUTES.rugzak}>Bekijk mijn rugzak</Link>
        </div>
    </section>
    </>)
  });
};

export default Souvenir;
