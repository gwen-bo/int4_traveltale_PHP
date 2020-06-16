import DataStore from './DataStore';
import Profile from '../models/ProfileModel';

test('Testing datastore', () => {
  const store = new DataStore();
  store.addProfile('Gwen');
  expect(store.profiles.length).toBe(1);
});

test('Testing datastore x2', () => {
  const store = new DataStore();
  store.addProfile('Gwen');
  store.addProfile('Mama');
  expect(store.profiles.length).toBe(2);
});

test('Testing seed function', () => {
  const store = new DataStore();
  store.seedDataStore(); 
  expect(store.profiles.length).toBe(3);
});

test('Testing all messages function', () => {
  const store = new DataStore();
  store.seedDataStore(); 
  store.allMessages();
  expect(store.allmessages[2].subject).toBe('I cried a lot');
});

test('Testing getTeaPartyByDetail function', () => {
  const store = new DataStore();

  const profiel = new Profile({name: 'Test'})
  store.addProfile(profiel); 
  profiel.addTeaParty({story: 'test', subject: 'test'}, store)
  const id = profiel.teaparties[0].id;
  console.log(id);

  expect(profiel.teaparties[0].id).toBe(id);
  expect(store.getTeaPartyByDetail(profiel.teaparties[0].id)).toBe(profiel.teaparties[0]);
});
