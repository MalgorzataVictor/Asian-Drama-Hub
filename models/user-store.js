'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import cloudinary from 'cloudinary';
import { createRequire } from "module";


const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}


const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',
  array: 'favourites',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
  async addUser(user, response) {
    
       function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(user.profilePicture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
    
    let result = await uploader();
  logger.info('cloudinary result', result);
  user.profilePicture = result.url;
     
    
    this.store.addCollection(this.collection, user);
    response();
  },
  
  addFavourtie(id, seriesId){
    this.store.addItem(this.collection, id, this.array, seriesId);
  },
  
  removeFavourtie(id, seriesId){
    console.log(seriesId)
    this.store.removeItemFromArray(this.collection, id, this.array, seriesId);
  },


};

export default userStore;