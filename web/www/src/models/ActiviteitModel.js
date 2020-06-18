import {decorate, configure } from 'mobx';

configure({enforceActions: 'observed'});

class ActiviteitModel {

  constructor({id, store, ...json}) {
    this.id = id;

    this.intro = {};
    this.split = {};
    this.optie1 = {};
    this.optie2 = {};
    this.einde = {};
    this.store = store; 
    this.store.addActiviteit(this);
    this.updateFromJson(json)
  }

  
  linkStad(stad) {
    const index = stad.activiteiten.findIndex(test => test.id === this.id);
    if (index !== -1) {
      stad.steden.splice(index, 1);
    }
    stad.addActivity(this);
    this.stad_id = stad.id;
  }

  resolveStad(id){
    const stad = this.store.rootStore.stedenStore.getStadById(id);
    const index = stad.activiteiten.findIndex(test => test.id === this.id);
    if (index !== -1) {
      stad.activiteiten.splice(index, 1);
    }
    stad.addActivity(this);
  }

  updateFromJson = ({
  id = undefined, 
  naam = undefined, 
  stad_id = undefined, 
  max_steps = undefined, 
  header_img = undefined, 
  activiteit_uitleg = undefined, 
  intro_tekst = undefined, 
  intro_titel = undefined,
  split_titel = undefined, 
  split_tekst1 = undefined, 
  split_span1 = undefined, 
  split_tekst2 = undefined, 
  split_span2 = undefined, 
  split_button1_tekst = undefined, 
  split_button1_kost = undefined, 
  split_button2_tekst = undefined, 
  split_button2_kost = undefined, 
  optie1_titel = undefined, 
  optie1_tekst = undefined, 
  optie1_button = undefined, 
  optie2_titel = undefined, 
  optie2_tekst = undefined, 
  optie2_button = undefined, 
  einde_titel = undefined, 
  einde_tekst = undefined, 
  einde_button = undefined, 

  }) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.id = (id !== undefined) ? id : this.id;
    this.stad_id = (stad_id !== undefined) ? stad_id : this.stad_id;
    if (stad_id !== undefined) {
      this.resolveStad(stad_id);
    }
    this.max_steps = (max_steps !== undefined) ? max_steps : this.max_steps;
    this.header_img = (header_img !== undefined) ? header_img : this.header_img;
    this.activiteit_uitleg = (activiteit_uitleg !== undefined) ? activiteit_uitleg : this.activiteit_uitleg;
    this.intro.tekst = (intro_tekst !== undefined) ? intro_tekst : this.intro.tekst;
    this.intro.titel = (intro_titel !== undefined) ? intro_titel : this.intro.titel;
    this.split.titel = (split_titel !== undefined) ? split_titel : this.split.titel;
    this.split.tekst1 = (split_tekst1 !== undefined) ? split_tekst1 : this.split.tekst1;
    this.split.span1 = (split_span1 !== undefined) ? split_span1 : this.split.span1;
    this.split.tekst2 = (split_tekst2 !== undefined) ? split_tekst2 : this.split.tekst2;
    this.split.span2 = (split_span2 !== undefined) ? split_span2 : this.split.span2;
    this.split.button1_tekst = (split_button1_tekst !== undefined) ? split_button1_tekst : this.split.button1_tekst;
    this.split.button1_kost = (split_button1_kost !== undefined) ? split_button1_kost : this.split.button1_kost;
    this.split.button2_tekst = (split_button2_tekst !== undefined) ? split_button2_tekst : this.split.button2_tekst;
    this.split.button2_kost = (split_button2_kost !== undefined) ? split_button2_kost : this.split.button2_kost;
    this.optie1.titel = (optie1_titel !== undefined) ? optie1_titel : this.optie1.titel;
    this.optie1.tekst = (optie1_tekst !== undefined) ? optie1_tekst : this.optie1.tekst;
    this.optie1.button = (optie1_button !== undefined) ? optie1_button : this.optie1.button;
    this.optie2.titel = (optie2_titel !== undefined) ? optie2_titel : this.optie2.titel;
    this.optie2.tekst = (optie2_tekst !== undefined) ? optie2_tekst : this.optie2.tekst;
    this.optie2.button = (optie2_button !== undefined) ? optie2_button : this.optie2.button;
    this.einde.titel = (einde_titel !== undefined) ? einde_titel : this.einde.titel;
    this.einde.tekst = (einde_tekst !== undefined) ? einde_tekst : this.einde.tekst;
    this.einde.button = (einde_button !== undefined) ? einde_button : this.einde.button;
  };

  // get asJson() {
  //   return {
  //     naam: this.naam,
  //     stappen_niveau: this.stappen_niveau,
  //     intro: this.intro, 
  //     uitleg: this.uitleg, 
  //     tag: this.tag, 

  //   };
  // }

}



decorate(ActiviteitModel, {

});

export default ActiviteitModel;
