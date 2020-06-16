import React, { useState, useEffect } from 'react';
import {useStores} from "../../hooks";
import {ROUTES} from "../../consts";

import styles from "./Login2.module.css";
import { useObserver } from 'mobx-react-lite';
import { useHistory } from 'react-router';


const Login = () => {
    console.log("javascript wordt ingeladen");

    const {dataStore, uiStore} = useStores()
    const [status, setStatus] = useState("false");
    const history = useHistory();


    const handleLogin = (e) => {
        console.log('handleLogin started');
        
        window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BM45&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2F&scope=activity%20profile&expires_in=604800');

        console.log('access token ophalen')
        let url = window.location.hash; 
    
        console.log(url);
        const access_token = url.split("=")[1].split("&")[0]
        console.log(access_token);
    
        // setfitbitAccessToken(access_token)
        fetchUser(access_token).then(data => dataStore.updateProfileFromServer(data.user));
        fetchActivity(access_token).then(data => uiStore.addSteps(data.lifetime));
        setStatus("success");
        e.preventDefault();
    }

    const fetchUser = async (access_token) => {
        try {
            let response = await fetch('https://api.fitbit.com/1/user/-/profile.json',
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + access_token
                }),
                mode: 'cors',
                method: 'GET'
            });
            let data = await response.json()
            console.log('dit is de data', data);
            return data;
        }catch(err) {
            console.log(err);
        }
    }

    const fetchActivity = async (access_token) => {
        try {
            let response = await fetch('https://api.fitbit.com/1/user/-/activities.json',
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + access_token
                }),
                mode: 'cors',
                method: 'GET'
            });
            let data = await response.json()
            console.log('dit is de activity', data);
            setStatus("succes");
            return data;
        }catch(err){
            console.log(err);
        }
    }


return useObserver(() => (
    <>
    <p>Login</p>
    <button type="button" onClick={(e) => handleLogin(e)} className={styles.button}>Login</button>
    {/* {(status !== "false")? 
        // <Redirect to={ROUTES.reisoverzicht} /> 
        <p>Je bent ingelogd</p>
    : <p>Nog niet ingelogd</p>

    } */}
    </>
))

}

export default Login;
