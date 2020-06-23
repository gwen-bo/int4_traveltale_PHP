import {decorate, observable, configure, action} from 'mobx';
import RestService from "../services/RestService";
import ProfileModel from "../models/ProfileModel";
configure({enforceActions: 'observed'});

class AuthStore {

  constructor(rootStore) {
    this.accessToken = undefined;
    this.rootStore = rootStore;
    this.user_id = undefined;
    this.users_database = [];
    this.users = [];
    this.fitbit_user = undefined;
    this.fitbit_steps = undefined;
    this.registratieBeweeg = "fly";
    this.registratieFontSize = "medium";
    this.usersService = new RestService("users");
    this.ingelogd = sessionStorage.getItem('user'); 
  }
  
   setAccessToken(access_token){
     this.setIngelogd();
       this.accessToken = access_token;
       sessionStorage.clear();
       sessionStorage.setItem('access_token', access_token);
       this.fetchData();
   }

   setIngelogd(){
    sessionStorage.setItem('user', "true");
    this.ingelogd = sessionStorage.getItem('user'); 
   }

   fetchData = async() => {
     if(sessionStorage.getItem('access_token') === null){
        window.location.replace('https://thawing-plains-60681.herokuapp.com/');
     }else {
    await this.loadAllUsers();
    await this.fetchUserData().then(data => {
      // this.updateUserFromServer(data.user);
      this.fitbit_user = data.user;      
      this.user_id = data.user.encodedId;
    });
    await this.fetchActivityData().then(data => {
      this.fitbit_steps = data.lifetime.tracker.steps;
    })
    this.findUser();
  }
  }

  setBewegenRegistratie(beweegniveau){
    this.registratieBeweeg = beweegniveau
    sessionStorage.setItem('beweegniveau', beweegniveau);
  }

  setFontsizeRegistratie(size){
    this.registratieFontSize = size
    sessionStorage.setItem('fontsize', size);
  }

  findUser(){
    const currentUser = this.users_database.find(user => user.id === this.user_id);
    if(currentUser === undefined){
      console.log('user bestaat nog niet in database')
      const user = this.updateUserFromServer(this.fitbit_user);
      user.create();
      this.addUser(user);
      this.rootStore.uiStore.setCurrentUser(user);
      user.setRegistratie({fontsize: sessionStorage.getItem('fontsize'), niveau: sessionStorage.getItem('beweegniveau')});
      user.setLifeTimeStappen(this.fitbit_steps);
    }else {
    console.log('user bestaat al, setting currentUser', currentUser)
    const user = this.updateUserFromServer(currentUser);
    this.addUser(user);
    this.rootStore.uiStore.setCurrentUser(user);
    const newSteps = this.fitbit_steps - user.lifetime_stappen;
    const stappen = currentUser.stappen += newSteps; 
    user.setCurrentStappen(stappen);
    user.setLifeTimeStappen(this.fitbit_steps);
    this.loadCheckedForUser(user);
    this.rootStore.uiStore.setSize(user.fontsize)
    if (user.currentReis_id !== undefined) {
      console.log('reis id is aanwezig', user.currentReis_id);
      sessionStorage.setItem('currentReis_id', user.currentReis_id);
      this.rootStore.uiStore.setCurrentReis(user.currentReis_id);
    }
  }
}

   fetchUserData = async() => {
    try {
    let response = await fetch('https://api.fitbit.com/1/user/-/profile.json',
    {
        headers: new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }),
        mode: 'cors',
        method: 'GET'
    });
    let data = await response.json()
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
              'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
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

   loadAllUsers = async () => {
    const jsonUsers = await this.usersService.getAll();
    jsonUsers.forEach(json => this.users_database.push(json));
  };

   updateUserFromServer(json) {
    let user = this.users.find(user => user.id === json.encodedId);
    if (!user) {
      user = new ProfileModel({
        id: json.encodedId,
        store: this.rootStore.authStore
      });
    }
    if (json.isDeleted) {
      this.users.remove(user);
    } else {
      user.updateFromJson(json);
    }
    return user;
  }

  createUser = async user => {
    const json = await this.usersService.create(user);
    this.updateUserFromServer(json);
  };

  updateUser = async user => {  
    console.log('updating user', user)
    const json = await this.usersService.update(user);
    this.updateUserFromServer(json);
  };

  updateCurrentReis = async user => {
    const json = await this.usersService.updateCurrentReis(user);
    this.updateUserFromServer(json);
  }

  insertCheckedStad = async json => {
    return await this.usersService.insertChecked(json, "stad");
  }

  insertCheckedActiviteit = async json => {
    return await this.usersService.insertChecked(json, "activiteit");
  }

  insertCheckedSouvenir = async json => {
    return await this.usersService.insertChecked(json, "souvenirs");
  }

  updateCurrentStappen = async user => {
    const json = await this.usersService.updateCurrentStappen(user);
    this.updateUserFromServer(json);
  }

  setLifetimeStappen = async user => {
    const json = await this.usersService.setLifetimeStappen(user);
    this.updateUserFromServer(json);
  }

  loadCheckedForUser = (user) => {
    this.loadCheckedStedenForUser(user);
    this.loadCheckedActiviteitenForUser(user);
    this.loadCheckedSouvenirsForUser(user);
    return
  }

  loadCheckedStedenForUser = async user => {
    const jsonCheckedStad = await this.usersService.loadChecked(user.id, 'steden');
    user.checkedSteden = [];
    jsonCheckedStad.forEach(stad => user.checkedSteden.push(stad))
  }

  loadCheckedActiviteitenForUser = async user => {
    const jsonCheckedActiviteiten = await this.usersService.loadChecked(user.id, 'activiteiten');
    user.checkedActiviteiten = [];
    jsonCheckedActiviteiten.forEach(activiteit => user.checkedActiviteiten.push(activiteit))
  }

  loadCheckedSouvenirsForUser = async user => {
    const jsonCheckedSouvenirs = await this.usersService.loadChecked(user.id, 'souvenirs');
    user.checkedSouvenirs = [];
    jsonCheckedSouvenirs.forEach(souvenir => user.checkedSouvenirs.push(souvenir))
  }

  addUser(user){
    this.users.push(user);
  }

}

decorate(AuthStore, {
  accessToken: observable,
  setAccessToken: action,
  users: observable, 

  updateUserFromServer: action, 
  addUser: action,

  setIngelogd: action, 
  ingelogd: observable, 

  registratieBeweeg: observable, 
  setBewegenRegistratie: action, 
  registratieFontSize: observable, 
  setFontsizeRegistratie: action, 
});

export default AuthStore;


