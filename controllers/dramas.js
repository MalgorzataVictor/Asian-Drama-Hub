"use strict";


import logger from "../utils/logger.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';


const drama = {

  createView(request, response) {

    const dramaId = request.params.id;
  const loggedInUser = accounts.getCurrentUser(request);

    logger.debug("Series id = " + dramaId);
    console.log();

    const viewData = {
      title: "Dramas 📺",
      singleDrama: dramasList.getDrama(dramaId), 
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      profilePicture: loggedInUser.profilePicture,
      dramaImage: dramasList.dramaImage
    };


    response.render("dramas", viewData);
  },
  
  addDrama(request, response) {
    const dramaId = request.params.id;
    const dramas = dramasList.getDrama(dramaId);
    const newDrama = {
      id: uuidv4(),
      name: request.body.name,
      year_created: request.body.creationyear,
      genres: request.body.genres,
      episode_count: request.body.episodecount,
      release_year: request.body.releaseyear,
      actors: request.body.actors,
      soundtracks: request.body.soundtracks,
      dramaImage: request.files.dramaImage,

   
    };
    dramasList.addDrama(dramaId, newDrama, function(){
    response.redirect('/dramas/' + dramaId);
  });
},
  
  deleteDrama(request, response) {
    const seriesId = request.params.id;
    const dramaId = request.params.dramaId;
    logger.debug(`Deleting Drama  ${dramaId} from Series ${seriesId}`);
    dramasList.removeDrama(seriesId, dramaId);
    response.redirect('/dramas/' + seriesId);
},
  
  updateDrama(request, response) {
    const seriesId = request.params.id;
    const dramaId = request.params.dramaId;
    
    const seriesToUpdate = dramasList.getSeries(seriesId);

    
  
    const originalDramaImage =  seriesToUpdate.series.find(x=>x.id == dramaId).dramaImage
    const originalsongImage =  seriesToUpdate.series.find(x=>x.id == dramaId).songImage
    
    

    logger.debug("updating drama " + dramaId);
    const updatedDrama = {
      id: dramaId,
      name: request.body.name,
      year_created: request.body.year_created,
      genres: request.body.genres,
      episode_count: request.body.episode_count,
      release_year: request.body.release_year,
      actors: request.body.actors,
      soundtracks: request.body.soundtracks,
      dramaImage: originalDramaImage,
      songImage: originalsongImage
    };
    dramasList.editDrama(seriesId, dramaId, updatedDrama);
    response.redirect('/dramas/' + seriesId);
}

  
  
};


export default drama;
