import express from 'express';

import auth from '../middlewares/auth';
import Quiz from '../models/Quiz';


const router = express.Router();

router.get('/api/quiz', (req, res) => {
  Quiz.findOne({ company: req.user.company.id }, (err, quiz) => {
    if (err) {
      throw err;
    }

    if (!quiz) {
      return res.sendStatus(404);
    }

    res.json(quiz);
  });
});

router.post('/api/quiz', auth, (req, res) => {
  Quiz.findOneAndUpdate(
    { company: req.user.company.id },
    req.body,
    { new: true },
    (err, quiz) => {
      if (err) {
        throw err;
      }

      if (!quiz) {
        return res.sendStatus(404);
      }

      res.json(quiz);
    }
  );
});

export default router;
