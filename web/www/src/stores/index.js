import UiStore from "./UiStore";
import LandenStore from "./LandenStore"
import ActiviteitenStore from "./ActiviteitenStore"
import AuthStore from "./AuthStore"

import { decorate  } from "mobx";
import StedenStore from "./StedenStore.";
import SouvenirsStore from "./SouvenirsStore";

class RootStore {
  constructor() {
    this.activiteitenStore = new ActiviteitenStore(this);
    this.landenStore = new LandenStore(this);
    this.stedenStore = new StedenStore(this);
    this.souvenirsStore = new SouvenirsStore(this);
    
    this.authStore = new AuthStore(this);
    this.uiStore = new UiStore(this);
  }
}

decorate(RootStore, {
});

export default RootStore;
