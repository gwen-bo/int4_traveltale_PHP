import {decorate, configure, observable, action } from 'mobx';

configure({enforceActions: 'observed'});

class BestemmingModel {

  constructor({name, country, steps, id, img, store, ...json}) {
    this.name = name;   
    this.country = country;
    this.steden = [];   
    this.id = id;
    this.store = store; 
    this.store.addBestemming(this);
    this.steps = steps; 
    this.steden = [];
  }

  addStad(stad){
    this.steden.push(stad);
}


}

decorate(BestemmingModel, {
  steden: observable, 
  addStad: action,

});

export default BestemmingModel;
