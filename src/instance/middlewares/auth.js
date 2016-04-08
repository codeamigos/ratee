import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/User';


export default function auth(req, res, next) {
  const token = req.headers['x-auth'];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, config.tokenSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    User.findById(decoded.userId).populate('companies').exec((err, user) => {
      if (err || !user) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  });
}
