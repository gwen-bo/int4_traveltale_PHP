import {decorate, configure } from 'mobx';

configure({enforceActions: 'observed'});

class ActiviteitModel {

  constructor({id, store, ...json}) {
    this.id = id;

    this.store = store; 
    this.store.addActiviteit(this);
    // this.resolveStad(stadId);
    this.updateFromJson(json)
  }

  // resolveStad(id){
  //   console.log(this);
  //   const stad = this.store.rootStore.stedenStore.getStadById(id);
  //   stad.addActivity(this);
  // }

  linkStad(stad) {
    stad.addActivity(this);
    this.stad_id = stad.id;
  }

  updateFromJson = ({
    id = undefined,
    naam = undefined, 
    stad_id = undefined, 
    max_steps = undefined,
    header_img = undefined,
    uitleg = undefined,
    intro = undefined,
    split = undefined, 
    optie1 = undefined,
    optie2 = undefined,
    einde = undefined, 

  }) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.id = (id !== undefined) ? id : this.id;
    this.stad_id = (stad_id !== undefined) ? stad_id : this.stad_id;
    this.max_steps = (max_steps !== undefined) ? max_steps : this.max_steps;
    this.header_img = (header_img !== undefined) ? header_img : this.header_img;
    this.uitleg = (uitleg !== undefined) ? uitleg : this.uitleg;
    this.intro = (intro !== undefined) ? intro : this.intro;
    this.split = (split !== undefined) ? split : this.split;
    this.optie1 = (optie1 !== undefined) ? optie1 : this.optie1;
    this.optie2 = (optie2 !== undefined) ? optie2 : this.optie2;
    this.einde = (einde !== undefined) ? einde : this.einde;  
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
