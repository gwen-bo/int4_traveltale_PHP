import {decorate, configure, observable, action, computed } from 'mobx';

configure({enforceActions: 'observed'});

class LandModel {

  constructor({id, store, ...json}) {

    this.steden = [];   
    this.id = id;
    this.souvenirs = [];
    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store; 
    this.store.addLand(this);
    this.store.loadSouvenirs(this.id);
    this.updateFromJson(json);
  }

  addStad(stad){
    this.steden.push(stad);
  }

  updateFromJson = ({
    id = undefined,
    naam = undefined,
    stappen_niveau = undefined,
    intro = undefined, 
    uitleg = undefined,
    tag = undefined,
    steden = undefined, 
    souvenirs = undefined

  }) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.intro = (intro !== undefined) ? intro : this.intro;
    this.uitleg = (uitleg !== undefined) ? uitleg : this.uitleg;
    this.tag = (tag !== undefined) ? tag : this.tag;
    this.id = (id !== undefined) ? id : this.id;
    this.stappen_niveau = (stappen_niveau !== undefined) ? stappen_niveau : this.stappen_niveau;
    if (steden !== undefined) {
      this.steden = [];
      steden.forEach(stad => {
        this.store.rootStore.stedenStore.updateStedenFromServer(stad).linkLand(this);
      });
    }
    if(souvenirs !== undefined){
      this.souvenirs = [];
      console.log('souvenirs aan het pushen', this)
      souvenirs.forEach(souvenir => {
        this.addSouvenir(souvenir)
      })
    }
  };

  addSouvenir(souvenir){
    this.souvenirs.push(souvenir);
  }

  get asJson() {
    return {
      naam: this.naam,
      stappen_niveau: this.stappen_niveau,
      intro: this.intro, 
      uitleg: this.uitleg, 
      tag: this.tag, 

    };
  }


}

decorate(LandModel, {
  steden: observable, 
  stappen_niveau: observable,
  intro: observable, 
  uitleg: observable, 
  
  addStad: action,
  souvenirs: observable, 
  addSouvenir: action, 

  updateFromJson: action, 
  asJson: computed

});

export default LandModel;
