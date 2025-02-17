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
    this.help = false; 
  }

  setUsername(name) {
    // naar current user gaan
    // this.name instelle
    // profiel updaten
  }

  setHelp(value){
    this.help = value; 
  }

  setCurrentUser(profile) {
    this.currentUser = profile;
  }

  setBewegen(niveau) {
    this.beweegNiveau = niveau;
    sessionStorage.setItem('beweegniveau', niveau);
    this.currentUser.setBeweegNiveau(niveau);
  }

  setSize(value) {
    this.fontSize = value;
    sessionStorage.setItem('fontsize', value);
    this.currentUser.setFontSize(value);
  }

  setBegeleider(begeleider){
    this.reisBegeleider = begeleider;
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
  setCurrentUser: action, 

  currentReis: observable, 
  setCurrentReis: action, 

  currentSteps: observable, 
  setSteps: action,

  beweegNiveau: observable, 
  setBewegen: action, 

  reisBegeleider: observable, 
  setBegeleider: action, 

  fontSize: observable, 
  setSize: action, 

  help: observable, 
  setHelp: action,
  
  begroeting: observable,
  setBegroeting: action, 
});

export default UiStore;
