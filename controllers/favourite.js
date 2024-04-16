"use strict";

import logger from "../utils/logger.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import accounts from "./accounts.js";

const favourite = {
  createView(request, response) {
    logger.info("Favourites page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    const favourites = loggedInUser.favourites;

    const dramas = dramasList.getUserSeries(loggedInUser.id);
    
    function isFavourite(drama) {
      return favourites.includes(drama.id)
    }

    const viewData = {
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      profilePicture: loggedInUser.profilePicture,
      title: "Favourites ★",
      dramas: dramas.filter(isFavourite),
    };

    response.render("favourite", viewData);
  },
};

export default favourite;
