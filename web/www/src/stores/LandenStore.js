import {decorate, observable, configure, action} from 'mobx';
import LandModel from '../models/LandModel';
import RestService from "../services/RestService";

configure({enforceActions: 'observed'});

class LandenStore {

  constructor(rootStore) {
    this.landen = [];
    this.selectedLand = undefined;
    this.rootStore = rootStore;
    this.landenService = new RestService("landen");
  }

  loadAllLanden = async () => {
    const jsonLanden = await this.landenService.getAll();
    console.log(jsonLanden)
    jsonLanden.forEach(json => this.updateLandenFromServer(json));
  };

  loadLand = async (id) => {
    const jsonLand = await this.landenService.getById(id);
    this.updateLandFromServer(jsonLand);
    return this.getLandById(id);
  }

  loadStedenVanLand = async (id) => {
    const jsonSteden = await this.landenService.getById(id, 'steden');
    this.updateLandenFromServer({ id, steden: jsonSteden });
    return this.getLandById(id);
  };

  updateLandenFromServer(json) {
    let land = this.landen.find(land => land.id === json.id);
    if (!land) {
      land = new LandModel({
        id: json.id,
        store: this.rootStore.landenStore
      });
    }
    if (json.isDeleted) {
      this.landen.remove(land);
    } else {
      land.updateFromJson(json);
    }
    return land;
  }

    addLand(land){
        this.landen.push(land)
    }

    getLandById(id){
        const number = Number(id);
        console.log(number);
        return this.landen.find(land => land.id === number);
    }


    setSelectedBestemming(land){
        this.selectedLand = land;
    }
}

decorate(LandenStore, {
    landen: observable, 
    updateLandenFromServer: action, 
    
    addLand: action, 


    selectedBestemming: observable, 
    setSelectedBestemming: action, 
});

export default LandenStore;


