import React from "react";
import { Link, Redirect } from "react-router-dom";
import {ROUTES} from "../../consts";
import { useStores } from "../../hooks";
import logo from "../../assets/img/logo.png"

import styles from "./Landingpage.module.css";

const Landingpage = () => {
  const {uiStore} = useStores();
  const currentProfile = uiStore.currentProfile;
 

  return (
   <>
   <img src={logo} alt="logo Travel Tale"></img>
   <h1 className={styles.title}>Welkom bij Travel Tale</h1>
   {(currentProfile === undefined)? 
  
  <div className={styles.button_wrapper}>
            <Link className={styles.button} to={ROUTES.registratie}>Dit is mijn eerste keer</Link>
            <Link className={styles.button} to={ROUTES.aanmelden}>Ik heb al een account</Link>

  </div>
  : 
    <Redirect to={ROUTES.reisoverzicht} /> 
   }
   </>
  );
};

export default Landingpage;


{/* <a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2F&scope=activity%20profile&expires_in=604800'}>Dit is mijn eerste keer</a>
<a className={styles.button} href={'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2F&scope=activity%20profile&expires_in=604800'}>Ik heb al een account</a> */}
