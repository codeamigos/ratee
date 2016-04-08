import express from 'express';

import Feedback from '../models/Feedback';


const router = express.Router();

router.get('/api/feedback', (req, res, next) => {
  if (!req.query.quiz) {
    return res.sendStatus(400);
  }

  Feedback.find({ quiz: req.params.quiz }, (err, feedbacks) => {
    if (err) {
      return next(err);
    }

    res.json(feedbacks);
  });
});

router.post('/api/feedback', (req, res, next) => {
  Feedback.create(req.body, (err, feedback) => {
    if (err) {
      return next(err);
    }

    if (!feedback) {
      return res.sendStatus(500);
    }

    res.json(feedback);
  });
});

export default router;
