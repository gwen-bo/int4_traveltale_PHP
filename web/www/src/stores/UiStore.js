import { decorate, observable, action, configure } from "mobx";

configure({enforceActions: 'observed'});

class UiStore {
  constructor(rootStore) {
    this.currentProfile = undefined;
    this.rootStore = rootStore;
    this.currentReis = undefined;
    this.currentSteps = 0
    this.begroeting = 'goeiemorgen';
    this.title = ""; 
    this.uitleg = ""; 
    this.animation = ""; 
    this.sec_path = ""; 
    this.sec_name = ""; 
    this.prim_path = ""; 
    this.prim_name = ""; 
  }

  setCurrentProfile(profile) {
    this.currentProfile = profile;
  }

  useSteps(amount){
    let currentSteps = this.currentSteps;
    this.currentSteps = currentSteps - amount;
  }

  setFeedback(feedback){
    this.title = feedback.title; 
    this.uitleg = feedback.uitleg; 
    this.animation = feedback.animation; 
    this.sec_path = feedback.sec_path; 
    this.sec_name = feedback.sec_name; 
    this.prim_path = feedback.prim_path; 
    this.prim_name = feedback.prim_name; 
  }


  setCurrentReis(bestemming) {
    this.currentReis = bestemming;
  }

  addSteps(data){
    this.currentSteps = data.tracker.steps; 
    // let profiel = this.rootStore.dataStore.profiles.find(profile => profile.id === this.currentProfile.id);
    // profiel.addSteps(this.currentSteps);
  }

  setBegroeting(begroeting){
    this.begroeting = begroeting; 
  }




}

decorate(UiStore, {
  // currentProfile: observable,
  // setCurrentProfile: action, 

  // steps: observable, 
  // addSteps: action,
  
  begroeting: observable,
  setBegroeting: action, 
});

export default UiStore;
