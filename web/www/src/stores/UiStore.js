import { decorate, observable, action, configure } from "mobx";

configure({enforceActions: 'observed'});

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentReis = undefined;
    this.currentSteps = 0
    this.begroeting = 'Hallo';
    this.currentUser = undefined;
    // if(this.currentUser === undefined && this.rootStore.authStore.accessToken !== undefined){
    //   this.rootStore.authStore.fetchData();
    // }
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

  setBegroeting(){
    const time = new Date();
    const hours = time.getHours(); 
    if (hours >= 0 && hours < 11) {
      this.begroeting = "Goeiemorgen";
    } else if (hours >= 11 && hours <= 16) {
      this.begroeting = "Goeiemiddag";
    } else {
      this.begroeting = "Goeie avond";
    };
}

}

decorate(UiStore, {
  currentUser: observable,
  setcurrentUser: action, 

  currentReis: observable, 
  setCurrentReis: action, 

  currentSteps: observable, 
  setSteps: action,

  // steps: observable, 
  // addSteps: action,
  begroeting: observable,
  setBegroeting: action, 
});

export default UiStore;
