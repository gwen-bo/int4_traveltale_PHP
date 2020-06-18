import RootStore from "../stores/";
import { createContext } from "react";

const store = new RootStore();

const loadAllData = async () => {
    console.log('alle loads worden gestart');
    await store.landenStore.loadAllLanden();
    await store.stedenStore.loadAllSteden();
    store.activiteitenStore.loadAllActiviteiten();
};
  
loadAllData();

window.store = store;


export const storesContext = createContext(store);
