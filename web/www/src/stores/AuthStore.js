import {decorate, observable, configure, action} from 'mobx';

configure({enforceActions: 'observed'});

class AuthStore {

  constructor(rootStore) {
    this.accessToken = undefined;
    this.rootStore = rootStore;
  }

   setAccessToken(access_token){
       this.accessToken= access_token;
       this.fetchUserData().then(data => this.rootStore.dataStore.updateProfileFromServer(data.user));
       this.fetchActivityData().then(data => this.rootStore.uiStore.addSteps(data.lifetime))
   }

   fetchUserData = async() => {
    try {
    let response = await fetch('https://api.fitbit.com/1/user/-/profile.json',
    {
        headers: new Headers({
            'Authorization': 'Bearer ' + this.accessToken
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

   fetchActivityData = async () => {
      try {
      let response = await fetch('https://api.fitbit.com/1/user/-/activities.json',
      {
          headers: new Headers({
              'Authorization': 'Bearer ' + this.accessToken
          }),
          mode: 'cors',
          method: 'GET'
      });
      let data = await response.json()
      console.log('dit is de activity', data);
      return data;
        }catch(err){
      console.log(err);
        }
   }


}

decorate(AuthStore, {
  accessToken: observable,
  setAccessToken: action,
});

export default AuthStore;


