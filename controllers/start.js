"use strict";

import logger from "../utils/logger.js";
import dramasList from "../models/AsianTvDramasCollection.js";
import userStore from "../models/user-store.js";
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    logger.info("Start page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      // Fetch all users
      const allUsers = userStore.getAllUsers();

      // Calculate statistics
      const numUsers = allUsers.length;
      let totalNumSeries = 0;
      let totalNumDramas = 0;
      let maxItemsUser;
      let minItemsUser;
      let maxItemsCount = -Infinity;
      let minItemsCount = Infinity;

      allUsers.forEach(user => {
        const userSeries = dramasList.getUserSeries(user.id);
        totalNumSeries += userSeries.length;

        userSeries.forEach(item => {
          totalNumDramas += item.series.length;
        });

        const totalItems = userSeries.reduce((acc, curr) => acc + curr.series.length, 0);
        if (totalItems > maxItemsCount) {
          maxItemsCount = totalItems;
          maxItemsUser = user;
        }
        if (totalItems < minItemsCount) {
          minItemsCount = totalItems;
          minItemsUser = user;
        }
      });

      const viewData = {
        title: "Welcome to the Asian Drama app!",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        profilePicture: loggedInUser.profilePicture,
        numUsers: numUsers,
        totalNumSeries: totalNumSeries,
        totalNumDramas: totalNumDramas,
        avgItemsPerUser: totalNumSeries / numUsers,
        maxItemsUser: maxItemsUser,
        minItemsUser: minItemsUser,
      };

      response.render('start', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default start;
