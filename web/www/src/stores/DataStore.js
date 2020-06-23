// import {decorate, configure } from 'mobx';
// import Profile from '../models/ProfileModel';

// configure({enforceActions: 'observed'});

// class DataStore {

//   constructor(rootStore) {
//     this.rootStore = rootStore;
//     this.profiles = []
//   }

//   addProfile(profile){
//     this.profiles.push(profile);
//   }

//   updateProfileFromServer(json) {
//     let profile = this.profiles.find(profile => profile.id === json.encodedId);
//     if (!profile) {
//       profile = new Profile({
//         name: json.firstName, 
//         fullName: json.fullName, 
//         age: json.age, 
//         id: json.encodedId,
//         store: this
//       });
//     }
//     if (json.isDeleted) {
//       this.profiles.remove(profile);
//     } else {
//       profile.updateFromJson(json, this.rootStore);
//     }
//   }

// }

// decorate(DataStore, {
// });

// export default DataStore;


