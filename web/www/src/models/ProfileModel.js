import {decorate, observable, configure , action, computed} from 'mobx';

configure({enforceActions: 'observed'});

class ProfileModel {

  constructor({id, store, ...json}) {
    this.id = id;
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store; 
    // this.naam = json.firstName;
    // this.fullName = json.fullName;
    // this.age = json.age;
    this.fontsize = "medium"
    this.reisbegeleider = "oma"
    this.currentReis_id = undefined;
    if(this.currentReis_id !== 0){
      console.log('er is een reis gaande');
      // this.store.rootStore.uiStore.setCurrentReis(this.currentReis_id);
    }
    this.updateFromJson(json);
  }

  resolveReis(id){
    console.log('reis aan het zoeken', id);
    // const land = this.store.rootStore.landenStore.landen.find(land => land.id === id);
    // if(land != undefined){
    //   this.store.rootStore.uiStore.setCurrentReis(land);
    // }
  }

  updateFromJson = ({
    firstName = undefined,
    fullName = undefined,
    age = undefined,
    leeftijd = undefined,
    encodedId = undefined, 
    id = undefined, 

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

  updateReis = async () => {
  this.store.updateCurrentReis(this.asJson)
  }

  updateCurrentStappen = async () => {
    this.store.updateCurrentStappen(this.asJson)
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
    console.log((this.stappen));
    this.store.rootStore.uiStore.setSteps(steps);
    this.updateCurrentStappen();
  }

  addSteps(stappen){
    this.stappen = stappen; 
  }

  get asJson() {
    return {
      id: this.id,
      firstName: this.firstName,
      fullName: this.fullName,
      age: this.age, 
      fontSize: this.fontsize, 
      reisbegeleider: this.reisbegeleider, 
      stappen: this.stappen, 
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
