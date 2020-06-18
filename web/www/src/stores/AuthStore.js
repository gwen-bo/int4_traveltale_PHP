import {decorate, observable, configure, action} from 'mobx';
import RestService from "../services/RestService";
import ProfileModel from "../models/ProfileModel";
configure({enforceActions: 'observed'});

class AuthStore {

  constructor(rootStore) {
    this.accessToken = localStorage.getItem('access_token');
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
       sessionStorage.setItem('access_token', access_token);

       console.log(access_token);
       this.fetchData();
   }

   fetchData = async() => {
    await this.loadAllUsers();
    this.fetchUserData().then(data => {
      // this.updateUserFromServer(data.user);
      this.fitbit_user = data.user;
      console.log('fitbit user data', this.fitbit_user);
      
      this.user_id = data.user.encodedId;
      this.findUser();
    });
    this.fetchActivityData().then(data => {
      this.fitbit_steps = data.lifetime.tracker.steps;
      console.log(this.fitbit_steps);
      this.rootStore.uiStore.setSteps(data.lifetime.tracker.steps);
    })
  }

  findUser(){
    const currentUser = this.users_database.find(user => user.id === this.user_id);
    if(currentUser === undefined){
      console.log('user bestaat nog niet in database')
      const user = this.updateUserFromServer(this.fitbit_user);
      console.log(user)

      user.create();
      this.addUser(user);
      this.rootStore.uiStore.setCurrentUser(user);
      this.rootStore.uiStore.currentUser.setCurrentStappen(this.fitbit_steps);
      if (user.currentReis_id != undefined) {
        console.log('reis id is aanwezig', user.currentReis_id);
        this.rootStore.uiStore.setCurrentReis(user.currentReis_id);
      }
    }else {
    console.log('user bestaat al, setting currentUser', currentUser)
    console.log(currentUser)
    const user = this.updateUserFromServer(currentUser);
    console.log('dit is de bestaande user', user);
    this.addUser(user);
    this.rootStore.uiStore.setCurrentUser(user);
    this.rootStore.uiStore.currentUser.setCurrentStappen(this.fitbit_steps);
    if (user.currentReis_id != undefined) {
      console.log('reis id is aanwezig', user.currentReis_id);
      this.rootStore.uiStore.setCurrentReis(user.currentReis_id);
    }
  }
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

   loadAllUsers = async () => {
    const jsonUsers = await this.usersService.getAll();
    jsonUsers.forEach(json => this.users_database.push(json));
  };

   updateUserFromServer(json) {
    console.log('user update', json);
    let user = this.users.find(user => user.id === json.encodedId);
    if (!user) {
      console.log('nieuwe user aanmaken')
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

  updateUserFromDatabase(json) {
    console.log('user update', json);
    let user = this.users.find(user => user.id === json.encodedId);
    if (!user) {
      console.log('nieuwe user aanmaken')
      user = new ProfileModel({
        id: json.id,
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
    console.log(user);  
    const json = await this.usersService.update(user);
    this.updateUserFromServer(json);
  };

  updateCurrentReis = async user => {
    console.log(user);
    const json = await this.usersService.updateCurrentReis(user);
    console.log(json);
    this.updateUserFromServer(json);
  }

  updateCurrentStappen = async user => {
    console.log(user);
    const json = await this.usersService.updateCurrentStappen(user);
    console.log(json);
    this.updateUserFromServer(json);
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


