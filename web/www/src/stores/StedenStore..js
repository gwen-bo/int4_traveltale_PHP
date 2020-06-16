import {decorate, observable, configure, action} from 'mobx';
import StedenModel from '../models/StedenModel';

configure({enforceActions: 'observed'});

class StedenStore {

  constructor(rootStore) {
    this.steden = [];
    this.rootStore = rootStore;
  }

    seedStedenStore(){
        new StedenModel({id: "1", name: 'Hanoi', countryId: '1', steps: '10000', store: this});
        new StedenModel({id: "3", name: 'Sa Pa', countryId: '1', steps: '15000', store: this});  
        new StedenModel({id: "2", name: 'Cat Ba', countryId: '1', steps: '20000', store: this});
        new StedenModel({id: "4", name: 'Ninh Binh', countryId: '1', steps: '10000', store: this});  
    }

    addStad(stad){
        this.steden.push(stad)
    }

    getStadById(id){
        return this.steden.find(stad => stad.id === id);
    }
}

decorate(StedenStore, {
    steden: observable, 
    seedStedenStore: action, 
});

export default StedenStore;


