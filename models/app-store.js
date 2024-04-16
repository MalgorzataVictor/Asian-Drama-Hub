'use strict';


import logger from '../utils/logger.js';
import JsonStore from './json-store.js';


const appStore = {
  
  store: new JsonStore('./models/app-store.json', { info: {} }),
  collection: 'details', 
  array: 'creators', 


  getAppInfo() {
    return this.store.findAll(this.collection);
  },
};


export default appStore;
