import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import auth from '../middlewares/auth';
import User from '../models/User';


const router = express.Router();

router.post('/api/authenticate', (req, res, next) => {
  User.findOne({ email: req.body.email }).populate('companies').exec((err, user) => {
    if (err) {
      return next(err);
    }

    const incorrectCredentials = !user || user.password !== req.body.password;
    if (incorrectCredentials) {
      return res.sendStatus(404);
    }

    const expires = 1440 * 60;
    const token = jwt.sign({ userId: user.id }, config.tokenSecret, { expiresIn: expires });

    res.json({ token, expires });
  });
});

router.get('/api/user', auth, (req, res) => {
  res.json(req.user);
});

export default router;
