import RootStore from "../stores/";
import { createContext } from "react";

const store = new RootStore();

const loadAllData = () => {
    store.landenStore.loadAllLanden();
    console.log('alle loads worden gestart');
};
  
loadAllData();

window.store = store;


export const storesContext = createContext(store);
