import {decorate, observable, configure} from 'mobx';
import ActiviteitModel from '../models/ActiviteitModel';
import RestService from "../services/RestService";

configure({enforceActions: 'observed'});

class ActiviteitenStore {

  constructor(rootStore) {
    this.activiteiten = [];
    this.rootStore = rootStore;
    this.activiteitenService = new RestService("activiteiten");
  }

  loadAllActiviteiten = async () => {
    const jsonActiviteiten = await this.activiteitenService.getAll();
    jsonActiviteiten.forEach(json => this.updateActiviteitenFromServer(json));
  };

  updateActiviteitenFromServer(json) {
    let activiteit = this.activiteiten.find(activiteit => activiteit.id === json.id);
    if (!activiteit) {
      activiteit = new ActiviteitModel({
        id: json.id,
        store: this.rootStore.activiteitenStore
      });
    }
    if (json.isDeleted) {
      this.activiteiten.remove(activiteit);
    } else {
      activiteit.updateFromJson(json);
    }
    return activiteit;
  }

    addActiviteit(activiteit){
        this.activiteiten.push(activiteit)
    }

    getActiviteitById(id){
      const number = Number(id);
      return this.activiteiten.find(activiteit => activiteit.id === number);
    }

}

decorate(ActiviteitenStore, {
  activiteiten: observable,
});

export default ActiviteitenStore;


