import RootStore from "../stores/";
import { createContext } from "react";

const store = new RootStore();

window.store = store;
store.loadAllData();
console.log(store);

export const storesContext = createContext(store);
