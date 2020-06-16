import {decorate, configure } from 'mobx';

configure({enforceActions: 'observed'});

class ActiviteitModel {

  constructor({name, id, steps, store, stadId}) {
    this.name = name;   
    this.id = id;
    this.stadId = stadId;
    this.steps = steps; 
    this.store = store; 
    this.store.addActiviteit(this);
    this.resolveStad(stadId);
  }

  resolveStad(id){
    console.log(this);
    const stad = this.store.rootStore.stedenStore.getStadById(id);
    stad.addActivity(this);
  }

}

decorate(ActiviteitModel, {

});

export default ActiviteitModel;
