import {decorate, configure, observable, action } from 'mobx';

configure({enforceActions: 'observed'});

class StedenModel {

  constructor({id, store, ...json}) {
    this.activiteiten = [];
    this.id = id;
    this.store = store; 

    this.store.addStad(this);

    this.updateFromJson(json)
  }

  addActivity(activity){
      this.activiteiten.push(activity);
  }

  linkLand(land) {
    const index = land.steden.findIndex(test => test.id === this.id);
    if (index !== -1) {
      land.steden.splice(index, 1);
    }
    land.addStad(this);
    this.land_id = land.id;
  }

  resolveLand(id){
    const land = this.store.rootStore.landenStore.getLandById(id);
    const index = land.steden.findIndex(test => test.id === this.id);
    if (index !== -1) {
      land.steden.splice(index, 1);
    }
    land.addStad(this);
  }

  updateFromJson = ({
    id = undefined,
    naam = undefined,
    stappen = undefined,
    land_id = undefined,
    activiteiten = undefined,
  }) => {
    this.id = (id !== undefined) ? id : this.id;
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.land_id = 
    (land_id !== undefined) ? land_id : this.land_id;
    if (land_id !== undefined) {
      this.resolveLand(land_id);
    }
    this.stappen = (stappen !== undefined) ? stappen : this.stappen;
    if (activiteiten !== undefined) {
      console.log('activiteiten zijn niet undefined');
      activiteiten.forEach(activiteit => {
        console.log('activiteit update from server');
        this.store.rootStore.activiteitenStore.updateActiviteitenFromServer(activiteit)
      });
    }
  };

  get asJson() {
    return {
      id: this.id,
      steps: this.steps,
      naam: this.naam, 
    };
  }
}

decorate(StedenModel, {
  activiteiten: observable, 
  addActivity: action,
  resolveLand: action,

  updateFromJson: action, 
  linkLand: action, 

});

export default StedenModel;
