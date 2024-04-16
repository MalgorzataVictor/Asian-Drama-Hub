"use strict";


import logger from "../utils/logger.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {

  createView(request, response) {

    logger.info("Dashboard page loading!");
   const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      
      let favourites = loggedInUser.favourites;
      console.log(favourites)
      
      const dramas = dramasList.getUserSeries(loggedInUser.id);
      ;
      if(favourites != undefined) {
    
      dramas.forEach(drama => {
        drama.favourited = favourites.includes(drama.id)
      })
      } 
      
      
    const viewData = {
      title: "Dramas 📺",
      dramas: dramas,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      profilePicture: loggedInUser.profilePicture,
    };
      logger.info(viewData.dramas);
     logger.info('about to render' + viewData.dramas);
    response.render('dashboard', viewData);
   
 }
    else response.redirect('/');
  },
  
  addSeries(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();
    
    const newSeries = {
      userid: loggedInUser.id,
      id: uuidv4(),
      type: request.body.type,
      series: [],
      date: timestamp,
      picture: request.files.picture,
    };
    dramasList.addSeries(newSeries, function() {
        response.redirect("/dashboard");
    });
},
  
  deleteSeries(request, response) {
    const seriesId = request.params.id;
    logger.debug(`Deleting Series ${seriesId}`);
    dramasList.removeSeries(seriesId);
    response.redirect("/dashboard");
},
  
  
    updateSeries(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);
    const seriesId = request.params.id;
    logger.debug("Updating Series " + seriesId);

     const seriesToUpdate = dramasList.getSeries(seriesId);
    const originalDramas = seriesToUpdate.series;
    const originalDate = seriesToUpdate.date;
    const originalpicture = seriesToUpdate.picture;
    
    const updatedSeries = {
      userid: loggedInUser.id,
      id: seriesId,
      type: request.body.type,
      series: originalDramas,
      date: originalDate,
      picture: originalpicture
    };

    console.log(updatedSeries)
    dramasList.editSeries(seriesId, updatedSeries);
    response.redirect("/dashboard");
  },
  

  
};


export default dashboard;
