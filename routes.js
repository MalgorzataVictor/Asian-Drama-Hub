'use strict';

import express from 'express';
import logger from "./utils/logger.js";



const router = express.Router();


import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import dramas from './controllers/dramas.js';
import songs from './controllers/songs.js';
import accounts from './controllers/accounts.js';
import favourite from './controllers/favourite.js';


router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/dramas/:id', dramas.createView);
router.get('/favourite', favourite.createView);
router.get('/songs', songs.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/dramas/:id/deleteDrama/:dramaId', dramas.deleteDrama);
router.get('/dashboard/deleteSeries/:id', dashboard.deleteSeries);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/addFavourtie/:id', accounts.addFavourtie);
router.get('/removeFavourtie/:id', accounts.removeFavourtie);

router.post('/dramas/:id/adddrama', dramas.addDrama);
router.post('/dashboard/addSeries', dashboard.addSeries);
router.post('/dramas/:id/updateDrama/:dramaId', dramas.updateDrama);
router.post('/dashboard/updateSeries/:id', dashboard.updateSeries);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/dramas/:id/series/:dramaId/addSongImage', songs.addSongImage);


export default router;
