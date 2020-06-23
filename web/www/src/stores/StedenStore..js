import {decorate, observable, configure, action} from 'mobx';
import StedenModel from '../models/StedenModel';
import RestService from "../services/RestService";

configure({enforceActions: 'observed'});

class StedenStore {

  constructor(rootStore) {
    this.steden = [];
    this.rootStore = rootStore;
    this.stedenService = new RestService("steden");
  }

  loadAllSteden = async () => {
    const jsonSteden = await this.stedenService.getAll();
    jsonSteden.forEach(json => this.updateStedenFromServer(json));
    return; 
  };

  loadStad = async (id) => {
    const jsonStad = await this.stedenService.getById(id);
    this.updateStedenFromServer(jsonStad);
    return this.getStadById(id);
  }
  
  loadActiviteitenVanStad = async (id) => {
    const jsonActiviteiten = await this.stedenService.getById(id, 'activiteiten');
    this.updateStedenFromServer({ id, activiteiten: jsonActiviteiten });
    return this.getStadById(id);
  };

  updateStedenFromServer(json) {
    let stad = this.steden.find(stad => stad.id === json.id);
    if (!stad) {
      stad = new StedenModel({
        id: json.id,
        store: this.rootStore.stedenStore
      });
    }
    if (json.isDeleted) {
      this.steden.remove(stad);
    } else {
      stad.updateFromJson(json);
    }
    return stad;
  }

    addStad(stad){
        this.steden.push(stad)
    }

    getStadById(id){
        const number = Number(id);
        return this.steden.find(stad => stad.id === number);
      }
}

decorate(StedenStore, {
    steden: observable, 

    addStad: action, 
    updateStedenFromServer: action, 
});

export default StedenStore;


