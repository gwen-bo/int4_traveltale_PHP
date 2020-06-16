import UiStore from "./UiStore";
import Profile from "../models/ProfileModel";
import DataStore from "./DataStore";

test("Aanmaken van de UiStore", () => {
  const uiStore = new UiStore();
  expect(uiStore.currentUser).toBeUndefined();
});

test("currentProfile instellen", () => {
  const uiStore = new UiStore();
  const profile = new Profile({name: 'Gwen'});
  uiStore.setCurrentProfile(profile);
  expect(uiStore.currentProfile).toBe(profile);
});
