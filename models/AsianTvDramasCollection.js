"use strict";


import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";
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


const dramasList = {

  store: new JsonStore("./models/AsianTvDramasCollection.json", {
    AsianTVDramas: [],
  }),
  collection: "AsianTVDramas", 
  array: "series", 


  getAllDramas() {
    return this.store.findAll(this.collection);
  },


  getDrama(id) {
    return this.store.findOneBy(this.collection, (drama) => drama.id === id);
  },
  
  getSeries(id) {
    return this.store.findOneBy(this.collection, (series => series.id === id));
},
  
   getAllSeries() {
    return this.store.findAll(this.collection)
      .map((drama) => drama[this.array])
      .flat();
  },
  
 async addDrama(id, drama, response) {
   
   function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(drama.dramaImage.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
   
  let result = await uploader();
  logger.info('cloudinary result', result);
  drama.dramaImage = result.url;
   
   
    this.store.addItem(this.collection, id, this.array, drama);
    response();
   
},
  
  async addSeries(series, response) {
    
    function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(series.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  series.picture = result.url;
    
  
    this.store.addCollection(this.collection, series);
    response();
},
  
  async addSong(id, dramaId, updatedDrama,response) {
    
     function uploader(){
    return new Promise(function(resolve, reject) { 
      console.log(updatedDrama);
      cloudinary.uploader.upload(updatedDrama.songImage.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  updatedDrama.songImage = result.url;
    
  
    this.editDrama(id, dramaId, updatedDrama);
    response();
    
  },
  
  
  removeDrama(id, dramaId) {
    this.store.removeItem(this.collection, id, this.array, dramaId);
},
  
  removeSeries(id) {
    const series = this.getSeries(id);
    this.store.removeCollection(this.collection, series);
},
  
  editDrama(id, dramaId, updatedDrama) {
    console.log(updatedDrama);
    this.store.editItem(this.collection, id, dramaId, this.array, updatedDrama);
},
  
   editSeries(seriesId, updatedSeries) {
    this.store.editCollection(this.collection, seriesId, updatedSeries);
  },
  
  getUserSeries(userid) {
  return this.store.findBy(this.collection, (series => series.userid === userid));
},
  
};


export default dramasList;
