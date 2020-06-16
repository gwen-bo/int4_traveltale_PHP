import Profile from './ProfileModel';
import DataStore from '../stores/DataStore';

test('Create a new profile (+ default picture)', () => {
  const profile = new Profile({name: 'Gwen'});
  expect(profile.name).toBe('Gwen');
  expect(profile.teaparties.length).toBe(0);
  expect(profile.pic).toBe(1);
});


test('Error: Profile heeft een naam nodig', () => {
  expect(() => new Profile({ pic: 2 })).toThrow("profile heeft een naam nodig");
});

test('Add teaparty to profile', () => {
  const store = new DataStore();
  const profile = new Profile({name: 'Gwen'});
  expect(profile.teaparties.length).toBe(0);
  profile.addTeaParty({story: 'Spilling the tea', subject: 'test'}, store);
  expect(profile.teaparties.length).toBe(1);
  expect(profile.teaparties[0].story).toBe('Spilling the tea');
  expect(profile.teaparties[0].subject).toBe('test');
});

test('Length teaparties - via getter', () => {
  const store = new DataStore();
  const profile = new Profile({name: 'Gwen'});
  expect(profile.teaparties.length).toBe(0);
  profile.addTeaParty({story: 'test 1', subject: 'test'}, store);
  profile.addTeaParty({story: 'test 2', subject: 'test'}, store);

  expect(profile.teaparties[1].story).toBe('test 1');
  expect(profile.teaparties[0].subject).toBe('test');

  expect(profile.getLength).toBe(2);
});

test('Setters - testing setters for inputfields', () => {
  const store = new DataStore();
  const profile = new Profile({name: 'Test'});
  expect(profile.teaparties[0]).toBe(undefined);

  profile.setSubject('test subject')
  profile.setStory('test story')
  profile.setTea('test tea')

  const story = profile.story; 
  const subject = profile.subject; 
  const tea = profile.tea; 

  profile.addTeaParty({story: story, subject: subject, tea: tea}, store);

});

test('Length teaparties - via getter', () => {
  const store = new DataStore();
  const profile = new Profile({name: 'Gwen'});
  expect(profile.teaparties.length).toBe(0);
  profile.addTeaParty({story: 'test 1', subject: 'test'}, store);

  profile.setStory('test')
  expect(profile.teaparties[0].story).toBe('test 1');

  expect(profile.getLength).toBe(1);
});



