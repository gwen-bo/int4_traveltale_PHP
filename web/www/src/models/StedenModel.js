import {decorate, configure, observable, action } from 'mobx';

configure({enforceActions: 'observed'});

class StedenModel {

  constructor({name, countryId, steps, id, store}) {
    this.name = name;   
    this.countryId = countryId;   
    this.activities = [];
    this.id = id;
    this.store = store; 
    this.store.addStad(this);
    this.steps = steps; 
    this.resolveBestemming(countryId);

  }

  addActivity(activity){
      this.activities.push(activity);
  }

  resolveBestemming(id){
    const land = this.store.rootStore.bestemmingenStore.getBestemmingById(id);
    land.addStad(this);
  }



}

decorate(StedenModel, {
    activities: observable, 
    addActivity: action,

});

export default StedenModel;
