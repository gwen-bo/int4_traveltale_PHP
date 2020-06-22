import { decorate, observable, action, configure } from "mobx";

configure({enforceActions: 'observed'});

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.currentReis = undefined;
    this.currentSteps = 0
    this.currentUser = undefined;
    // feedbackcomponent 
    this.title = ""; 
    this.uitleg = ""; 
    this.animation = "zwaaien"; 
    this.sec_path = ""; 
    this.sec_name = ""; 
    this.prim_path = ""; 
    this.prim_name = ""; 

    // customization voor user
    this.fontSize = "medium";
    this.begroeting = 'Hallo';
    this.reisBegeleider = "oma";
    this.beweegNiveau = "skate";
  }

  setCurrentUser(profile) {
    this.currentUser = profile;
  }

  setBewegen(niveau) {
    this.beweegNiveau = niveau;
  }

  setSize(value) {
        console.log(value);
        this.fontSize = value;
  }

  setBegeleider(begeleider){
    this.reisBegeleider = begeleider;
  }
    
  setBewegen(value) {
    console.log(value);
    this.bewegen.beweeg = value;
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
