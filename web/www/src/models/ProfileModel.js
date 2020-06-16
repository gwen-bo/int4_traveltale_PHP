import {decorate, observable, configure , action} from 'mobx';

configure({enforceActions: 'observed'});

class Profile {

  constructor({name, fullname, age, id, store, ...json}) {
    this.age = age;
    // if (!name) {
    //   throw new Error("profile heeft een naam nodig");
    // }    
    this.name = name;
    this.fullname = fullname;
    this.id = id;
    this.store = store; 
    this.store.addProfile(this);
    this.steps = 0
  }

  updateFromJson = (json, rootStore) => {
    this.name = json.firstName;
    this.fullname = json.fullName;
    this.age = json.age;
    this.id = json.encodedId;
    rootStore.uiStore.setCurrentProfile(this);
  };

  addSteps(steps){
    this.steps = steps; 
  }

}

decorate(Profile, {
  steps: observable, 
  addSteps: action
});

export default Profile;
