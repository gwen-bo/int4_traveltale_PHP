import DataStore from "./DataStore";
import UiStore from "./UiStore";
import BestemmingenStore from "./BestemmingenStore"
import ActiviteitenStore from "./ActiviteitenStore"
import AuthStore from "./AuthStore"

import { decorate  } from "mobx";
import StedenStore from "./StedenStore.";

class RootStore {
  constructor() {
    this.dataStore = new DataStore(this);
    this.activiteitenStore = new ActiviteitenStore(this);
    this.bestemmingenStore = new BestemmingenStore(this);
    this.stedenStore = new StedenStore(this);

    this.authStore = new AuthStore(this);

    this.uiStore = new UiStore(this);
  }

  loadAllData = async () => {
    await this.bestemmingenStore.seedBestemmingenStore();
    this.stedenStore.seedStedenStore();
    this.activiteitenStore.seedActiviteitenStore();
  };



}

decorate(RootStore, {
});

export default RootStore;
