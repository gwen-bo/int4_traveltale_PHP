import DataStore from "./DataStore";
import UiStore from "./UiStore";
import LandenStore from "./LandenStore"
import ActiviteitenStore from "./ActiviteitenStore"
import AuthStore from "./AuthStore"

import { decorate  } from "mobx";
import StedenStore from "./StedenStore.";

class RootStore {
  constructor() {
    this.dataStore = new DataStore(this);
    this.activiteitenStore = new ActiviteitenStore(this);
    this.landenStore = new LandenStore(this);
    this.stedenStore = new StedenStore(this);

    this.authStore = new AuthStore(this);

    this.uiStore = new UiStore(this);
  }

  // loadAllData = async () => {
  //   await this.bestemmingenStore.seedBestemmingenStore();
  //   this.stedenStore.seedStedenStore();
  //   this.activiteitenStore.seedActiviteitenStore();
  // };



}

decorate(RootStore, {
});

export default RootStore;
