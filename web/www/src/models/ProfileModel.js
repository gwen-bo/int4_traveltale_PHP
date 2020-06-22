import {decorate, observable, configure , action, computed} from 'mobx';

configure({enforceActions: 'observed'});

class ProfileModel {

  constructor({id, store, ...json}) {
    this.id = id;
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store; 

    this.fontsize = "medium";
    this.reisbegeleider = "oma";
    this.currentReis_id = undefined;
    this.checkedSteden = [];
    this.checkedLanden = [];
    this.checkedActiviteiten = [];
    this.updateFromJson(json);
  }

  checkifCheckedStad(id){
    return this.checkedSteden.find(stad => stad.stad_id === id);
  }

  checkifCheckedActiviteit(id){
    return this.checkedActiviteiten.find(activiteit => activiteit.activiteit_id === id);
  }

  updateFromJson = ({
    firstName = undefined,
    fullName = undefined,
    age = undefined,
    leeftijd = undefined,
    encodedId = undefined, 
    id = undefined, 
    lifetime_stappen = undefined, 

    fontsize = undefined,
    stappen = undefined,
    reisbegeleider = undefined, 
    currentReis_id = undefined
  }) => {
    this.firstName = (firstName !== undefined) ? firstName : this.firstName;
    this.fullName = (fullName !== undefined) ? fullName : this.fullName;
    this.age = (age !== undefined) ? age : this.age;
    this.age = (leeftijd !== undefined) ? leeftijd : this.age;
    this.id = (encodedId !== undefined) ? encodedId : this.id;
    this.id = (id !== undefined) ? id : this.id;
    this.lifetime_stappen = (lifetime_stappen !== undefined) ? lifetime_stappen : this.lifetime_stappen;
    this.fontsize = (fontsize !== undefined) ? fontsize : this.fontsize;
    this.reisbegeleider = (reisbegeleider !== undefined) ? reisbegeleider : this.reisbegeleider;
    this.stappen = (stappen !== undefined) ? stappen : this.stappen;
    this.currentReis_id = (currentReis_id !== undefined) ? currentReis_id : this.currentReis_id;
  };

  create = async () => {
    const json = this.asJson
    console.log(json);
    this.store.createUser(json)
  };

  update = async () => {
    this.store.updateUser(this.asJson)
  };

  addCheckedStad(id){
    this.checkedSteden.push(id);
    this.store.insertCheckedStad({stad_id: id, user_id: this.id})
  }

  addCheckedActiviteit(id){
    this.checkedActiviteiten.push(id);
    this.store.insertCheckedActiviteit({activiteit_id: id, user_id: this.id})
  }

  updateReis = async () => {
  this.store.updateCurrentReis(this.asJson)
  }

  updateCurrentStappen = async () => {
    console.log('update json', this.asJson);
    this.store.updateCurrentStappen(this.asJson)
  }

  updateLifetimeStappen = async () => {
    this.store.setLifetimeStappen(this.asJson)
  }

  setCurrentReis_id(id){
    this.currentReis_id = id;
    this.updateReis();
  }

  setFontSize(fontsize){
    this.fontsize = fontsize;
    // this.updateFontsize();
  }

  setCurrentStappen(steps){
    this.stappen = steps;
    console.log('set current stappen, nieuwe', steps);
    this.store.rootStore.uiStore.setSteps(steps);
    this.updateCurrentStappen();
  }

  setLifeTimeStappen(steps){
    this.lifetime_stappen = steps; 
    this.updateLifetimeStappen();
  }

  get asJson() {
    return {
      id: this.id,
      firstName: this.firstName,
      fullName: this.fullName,
      age: this.age, 
      stappen: this.stappen, 
      lifetime_stappen: this.lifetime_stappen, 
      fontSize: this.fontsize, 
      reisbegeleider: this.reisbegeleider, 
      currentReis_id: this.currentReis_id, 
    };
  }

}

decorate(ProfileModel, {
  stappen: observable, 
  addSteps: action, 
  firstName: observable, 
  age: observable, 
  fullName: observable, 

  currentReis_id: observable, 
  setCurrentReis_id: action, 
  
  updateFromJson: action, 

  asJson: computed, 

  setUser: action, 
});

export default ProfileModel;
