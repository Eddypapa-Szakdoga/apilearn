import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import db from '../db';
import app from '..';

let router = express();

//connect db
initializeDb(db => {

    //internal middleware
    router.use(middleware({ config, db }));

    //api routes v1 (/v1)
});

export default router;