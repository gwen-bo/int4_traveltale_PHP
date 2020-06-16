import {decorate, observable, configure, action} from 'mobx';
import ActiviteitModel from '../models/ActiviteitModel';

configure({enforceActions: 'observed'});

class ActiviteitenStore {

  constructor(rootStore) {
    this.activiteiten = [];
    this.rootStore = rootStore;
  }

    seedActiviteitenStore(){
      const hanoi = this.rootStore.bestemmingenStore.bestemmingen[0].steden[0];
      console.log(hanoi);
      
      new ActiviteitModel({id: "1", name: 'bootje varen', steps: 500, stadId: hanoi.id, store: this});
      new ActiviteitModel({id: "2" , name: 'zonsondergang', steps: 200, stadId: hanoi.id, store: this});
      new ActiviteitModel({id: "3", name: 'gaan eten', steps: 300, stadId: hanoi.id, store: this});  
    }

    addActiviteit(activiteit){
        this.activiteiten.push(activiteit)
    }

    getActiviteitById(id){
      return this.activiteiten.find(activiteit => activiteit.id === id);
  }

}

decorate(ActiviteitenStore, {
  activiteiten: observable,
  seedActiviteitenStore: action,
});

export default ActiviteitenStore;


