import {decorate, observable, configure, action} from 'mobx';
import RestService from "../services/RestService";

configure({enforceActions: 'observed'});

class SouvenirsStore {

  constructor(rootStore) {
    this.souvenirs = [];
    this.rootStore = rootStore;
    this.souvenirsService = new RestService("souvenirs");
  }

  loadAllSouvenirs = async () => {
    const jsonSouvenirs = await this.souvenirsService.getAll();
    console.log('souvenirs store', jsonSouvenirs)
    this.souvenirs = [];
    jsonSouvenirs.forEach(souvenir => this.souvenirs.push(souvenir));
  };

  loadSouvenir = async (id) => {
    const jsonSouvenir = await this.souvenirsService.getById(id);
    console.log('één souvenir', jsonSouvenir)
    // return this.getLandById(id);
  }

  getSouvenirById(id){
    const number = Number(id);
    return this.souvenirs.find(souvenir => souvenir.souvenir_id === number);
}
}

decorate(SouvenirsStore, {
  souvenirs: observable,
  loadAllSouvenirs: action,
});

export default SouvenirsStore;


