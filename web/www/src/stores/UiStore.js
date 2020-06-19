import { decorate, observable, action, configure } from "mobx";

configure({enforceActions: 'observed'});

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentReis = undefined;
    this.currentSteps = 0
    this.begroeting = 'goeiemorgen';
    // this.currentUser = this.rootStore.authStore.users[0];
    // console.log('huidige gebruiker', this.currentUser);
    this.currentUser = undefined;
    // if(this.currentUser === undefined && this.rootStore.authStore.accessToken !== undefined){
    //   this.rootStore.authStore.fetchData();
    // }
    console.log(this.currentUser);
    // feedbackcomponent 
    this.title = ""; 
    this.uitleg = ""; 
    this.animation = "zwaaien"; 
    this.sec_path = ""; 
    this.sec_name = ""; 
    this.prim_path = ""; 
    this.prim_name = ""; 
  }

  setCurrentUser(profile) {
    this.currentUser = profile;
  }

  // useSteps(amount){
  //   let currentSteps = this.currentSteps;
  //   this.currentSteps = currentSteps - amount;
  // }

  setFeedback(feedback){
    this.title = feedback.title; 
    this.uitleg = feedback.uitleg; 
    this.animation = feedback.animation; 
    this.sec_path = feedback.sec_path; 
    this.sec_name = feedback.sec_name; 
    this.prim_path = feedback.prim_path; 
    this.prim_name = feedback.prim_name; 
  }

  setCurrentReis(id) {
    const bestemming = this.rootStore.landenStore.landen.find(land => land.id === id);
    this.currentReis = bestemming;
    console.log(this.currentUser);
    this.currentUser.setCurrentReis_id(id)
  }

  setSteps(data){
    this.currentSteps = data; 
  }

  setBegroeting(begroeting){
    this.begroeting = begroeting; 
  }

}

decorate(UiStore, {
  currentUser: observable,
  setcurrentUser: action, 

  currentReis: observable, 
  setCurrentReis: action, 

  // steps: observable, 
  // addSteps: action,
  begroeting: observable,
  setBegroeting: action, 
});

export default UiStore;
