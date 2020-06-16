import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useStores } from "../../hooks";

import { useState, useEffect } from "react";


const Login = () => {
    console.log("javascript wordt ingeladen");
    const history = useHistory();

    const {dataStore, uiStore} = useStores()
    const [status, setStatus] = useState("false");

useEffect(() => {
    console.log('access token ophalen')
    let url = window.location.hash; 

    console.log(url);
    const access_token = url.split("=")[1].split("&")[0]
    console.log(access_token);

    let fitbitAccessToken = access_token;

async function getUserAsync() 
{
  try {
  let response = await fetch('https://api.fitbit.com/1/user/-/profile.json',
  {
      headers: new Headers({
          'Authorization': 'Bearer ' + fitbitAccessToken
      }),
      mode: 'cors',
      method: 'GET'
  });
  let data = await response.json()
  console.log('dit is de data', data);
  return data;
    }catch(err){
  console.log(err);
    }
}

getUserAsync().then(data => dataStore.updateProfileFromServer(data.user)); 

// activities ophalen
async function getActivityAsync() 
{
  try {
  let response = await fetch('https://api.fitbit.com/1/user/-/activities.json',
  {
      headers: new Headers({
          'Authorization': 'Bearer ' + fitbitAccessToken
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

getActivityAsync().then(data => uiStore.addSteps(data.lifetime));


}, [dataStore, uiStore]);

return (
    <>
    <p>Login is succesvol!</p>
    </>
)

}

export default Login;
