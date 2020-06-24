import RootStore from "../stores/";
import { createContext } from "react";

const store = new RootStore();

const loadAllData = async () => {
    await store.landenStore.loadAllLanden();
    await store.stedenStore.loadAllSteden();
    await store.activiteitenStore.loadAllActiviteiten();
    store.souvenirsStore.loadAllSouvenirs();
    store.uiStore.setBegroeting();
};
  
loadAllData();

window.store = store;

export const storesContext = createContext(store);
