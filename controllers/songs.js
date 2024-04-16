"use strict";


import logger from "../utils/logger.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import accounts from './accounts.js';


const songs = {

  createView(request, response) {
 
    logger.info("Songs page loading!");

  const loggedInUser = accounts.getCurrentUser(request);

    var soundtracksList = [];

    
    dramasList.getAllDramas().forEach((drama) => {
  
      drama.series.forEach((series) => {
       
        if (series.soundtracks && series.soundtracks.length > 0) {
       

          soundtracksList = soundtracksList.concat({
          soundtrack:series.soundtracks,
          songImage: series.songImage,
          dramaId: series.id,
          id: drama.id
            
          });
        }
      });
    });


    const viewData = {
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      profilePicture: loggedInUser.profilePicture,
      title: "Songs 🎵",
      songData: soundtracksList,
      
    };

    
    logger.debug(viewData.soundtracks);

  
    response.render("songs", viewData);
  },
  
  
   
  addSongImage(request, response) {
    const seriesId = request.params.id;
    const dramaId = request.params.dramaId;
    
    const drama = dramasList.getSeries(seriesId);

    
    let seriesToUpdate = drama.series.find(x=>x.id == dramaId)

    seriesToUpdate.songImage = request.files.songImage;
    
    logger.debug("updating drama " + dramaId);
   
    
    
    dramasList.addSong(seriesId, dramaId, seriesToUpdate, function(){
   response.redirect('/songs');
    });
}
                       
      
  
//     addSongImage(request, response) {
      
//     const seriesId = request.params.id;
//     const dramaId = request.params.dramaId;
    
//     const seriesToUpdate = dramasList.getSeries(seriesId);

//     const originalName =  seriesToUpdate.series.find(x=>x.id == dramaId).name;
//     const originalYear_created = seriesToUpdate.series.find(x=>x.id == dramaId).year_created;
//     const originalGenres =  seriesToUpdate.series.find(x=>x.id == dramaId).genres;
//     const originalEpisode_count = seriesToUpdate.series.find(x=>x.id == dramaId).episode_count;
//     const originalRelease_year = seriesToUpdate.series.find(x=>x.id == dramaId).release_year;
//     const originalActors = seriesToUpdate.series.find(x=>x.id == dramaId).actors;
//     const originalSoundtracks = seriesToUpdate.series.find(x=>x.id == dramaId).soundtracks;
//     const originalDramaImage = seriesToUpdate.series.find(x=>x.id == dramaId).dramaImage;
    
//     const updatedDrama = {
//       id: dramaId,
//       name: originalName,
//       year_created: originalYear_created,
//       genres: originalGenres,
//       episode_count: originalEpisode_count,
//       release_year: originalRelease_year,
//       actors: originalActors,
//       soundtracks: originalSoundtracks,
//       dramaImage: originalDramaImage,
//       songImage : request.files.songImage

      
//     };
      
//     dramasList.updateDrama(updatedDrama, function(){
//     response.redirect('/songs');
//     });
      
      
// },
  
  
};


export default songs;
