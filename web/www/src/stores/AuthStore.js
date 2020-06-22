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
    this.fitbit_steps = undefined
    this.usersService = new RestService("users");
  }
  
   setAccessToken(access_token){
       this.accessToken= access_token;
       sessionStorage.clear();
       sessionStorage.setItem('access_token', access_token);
       this.fetchData();
   }

   fetchData = async() => {
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

  findUser(){
    const currentUser = this.users_database.find(user => user.id === this.user_id);
    if(currentUser === undefined){
      console.log('user bestaat nog niet in database')
      const user = this.updateUserFromServer(this.fitbit_user);
      user.create();
      this.addUser(user);
      this.rootStore.uiStore.setCurrentUser(user);
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
    console.log('user update', json);
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
    const json = await this.usersService.update(user);
    this.updateUserFromServer(json);
  };

  updateCurrentReis = async user => {
    const json = await this.usersService.updateCurrentReis(user);
    this.updateUserFromServer(json);
  }

  insertCheckedStad = async json => {
    console.log('json bij stad inserten', json);
    const response = await this.usersService.insertChecked(json, "stad");
    console.log('stad is geinsert', response);
  }

  insertCheckedActiviteit = async json => {
    console.log('json bij activiteit inserten', json);
    const response = await this.usersService.insertChecked(json, "activiteit");
    console.log('activiteit is geinsert', response);
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
    this.loadCheckedStadForUser(user);
    return
  }

  loadCheckedStadForUser = async user => {
    const jsonCheckedStad = await this.usersService.loadChecked(user.id, 'stad');
    jsonCheckedStad.forEach(stad => user.checkedSteden.push(stad))
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
});

export default AuthStore;


