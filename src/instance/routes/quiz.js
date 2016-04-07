import express from 'express';

import auth from '../middlewares/auth';
import Company from '../models/Company';
import Quiz from '../models/Quiz';


const router = express.Router();

router.get('/api/quiz/:alias', (req, res, next) => {
  Company.findOne({ alias: req.params.alias }, (err, company) => {
    if (err) {
      return next(err);
    }

    if (!company) {
      return res.sendStatus(404);
    }

    Quiz.findOne({ company: company.id }, (err, quiz) => {
      if (err) {
        return next(err);
      }

      if (!quiz) {
        return res.sendStatus(404);
      }

      res.json(quiz);
    });
  });
});

router.post('/api/quiz/:id', auth, (req, res, next) => {
  Quiz.findOneAndUpdate(
    { _id: req.params.id, company: req.user.company.id },
    req.body,
    { new: true },
    (err, quiz) => {
      if (err) {
        return next(err);
      }

      if (!quiz) {
        return res.sendStatus(404);
      }

      res.json(quiz);
    }
  );
});

export default router;
