"use strict";

import logger from "../utils/logger.js";
import infoList from "../models/app-store.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    logger.info("About the Asian Dramas App");

    const loggedInUser = accounts.getCurrentUser(request);

    let numSeries = 0;
    let numDramas = 0;
    let maxSeriesName = "";
    let minSeriesName = "";
    let avgDramasPerSeries = 0;

    if (loggedInUser) {
      const userSeries = dramasList.getUserSeries(loggedInUser.id);
      numSeries = userSeries.length;

      let maxDramasCount = -Infinity;
      let minDramasCount = Infinity;

      for (let item of userSeries) {
        let numDramasInSeries = item.series.length;
       numDramas += numDramasInSeries;


        if (numDramasInSeries > maxDramasCount) {
          maxDramasCount = numDramasInSeries;
          maxSeriesName = item.type;
        }

        if (numDramasInSeries < minDramasCount) {
          minDramasCount = numDramasInSeries;
          minSeriesName = item.type;
        }
      }

      avgDramasPerSeries = numDramas / numSeries;
    }

        console.log(infoList)

    const viewData = {
      title: "About Us🌟",
      info: infoList.getAppInfo(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      profilePicture: loggedInUser.profilePicture,
      displayNumSeries: numSeries,
      displayNumDramas: numDramas,
      AvgDramasPerSeries: avgDramasPerSeries,
      MaxSeries: maxSeriesName,
      MinSeries: minSeriesName,
    };

    response.render("about", viewData);
  },
};

export default about;
