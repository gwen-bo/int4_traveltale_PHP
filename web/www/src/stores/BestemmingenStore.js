import {decorate, observable, configure, action} from 'mobx';
import BestemmingModel from '../models/BestemmingModel';

configure({enforceActions: 'observed'});

class BestemmingenStore {

  constructor(rootStore) {
    this.bestemmingen = [];
    this.selectedBestemming = undefined;
    this.rootStore = rootStore;
  }

    seedBestemmingenStore(){
        new BestemmingModel({id: "1", name: 'Vietnam', country: 'Vietnam', steps: 2, store: this});
        new BestemmingModel({id: "2", name: 'Cuba', country: 'Cuba', steps: 3, store: this});
        new BestemmingModel({id: "3", name: 'Colombia', country: 'Colombia', steps: 1, store: this});  
    }

    addBestemming(bestemming){
        this.bestemmingen.push(bestemming)
    }

    getBestemmingById(id){
        return this.bestemmingen.find(bestemming => bestemming.id === id);
    }

    setSelectedBestemming(bestemming){
        this.selectedBestemming = bestemming;
    }
}

decorate(BestemmingenStore, {
    bestemmingen: observable, 
    seedBestemmingenStore: action, 

    selectedBestemming: observable, 
    setSelectedBestemming: action, 
});

export default BestemmingenStore;


