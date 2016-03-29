import express from 'express';
import restify from 'express-restify-mongoose';

import User from '../models/User';


const router = express.Router();
export default router;

restify.serve(router, User);
