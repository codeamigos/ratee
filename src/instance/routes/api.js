import express from 'express';
import restify from 'express-restify-mongoose';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/User';


const router = express.Router();

restify.serve(router, User);

router.post('/api/v1/authenticate', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }

    const incorrectCredentials = !user || user.password !== req.body.password;
    if (incorrectCredentials) {
      return res.sendStatus(404);
    }

    const expires = 1440 * 60;
    const token = jwt.sign(user._id, config.tokenSecret, { expiresIn: expires });

    res.json({ token, expires });
  });
});

export default router;
