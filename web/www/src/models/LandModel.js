import {decorate, configure, observable, action, computed } from 'mobx';

configure({enforceActions: 'observed'});

class LandModel {

  constructor({naam, stappen_niveau, id, store, ...json}) {
    this.naam = naam;   
    this.stappen_niveau = stappen_niveau;
    this.steden = [];   
    this.id = id;

    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store; 
    this.store.addLand(this);
    
    this.updateFromJson({
      naam,
      stappen_niveau,
    });
  }

  addStad(stad){
    this.steden.push(stad);
  }

  updateFromJson = ({
    naam = undefined,
    stappen_niveau = undefined,
  }) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.stappen_niveau = (stappen_niveau !== undefined) ? stappen_niveau : this.stappen_niveau;
  };

  get asJson() {
    return {
      id: this.id,
      naam: this.naam,
      stappen_niveau: this.stappen_niveau,
    };
  }


}

decorate(LandModel, {
  steden: observable, 
  addStad: action,

  updateFromJson: action, 
  asJson: computed

});

export default LandModel;
