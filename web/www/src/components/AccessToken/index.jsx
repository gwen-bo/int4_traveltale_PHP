import React, { useEffect } from "react";
import {useStores} from "../../hooks";
import { useHistory } from "react-router-dom";


const AccessToken = () => {
    const {authStore} = useStores()
    const history = useHistory();

    useEffect(() => {
      console.log("use effect wordt opgestart")
        console.log('access token ophalen')
        let url = window.location.hash; 
    
        console.log(url);
        const access_token = url.split("=")[1].split("&")[0]
        console.log(access_token);
        
        sessionStorage.clear();
        sessionStorage.setItem('access_token', access_token);
        authStore.setAccessToken(sessionStorage.getItem('access_token'));
        sessionStorage.setItem('accesstoken', "true");
        history.push('/overzicht');
  }, [authStore, history]);

  return (
   <>
  </>
  );
}
export default AccessToken;
