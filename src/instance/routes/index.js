import express from 'express';


const router = express.Router();

router.get('/admin', (req, res) => {
  res.send(`
    Admin stuff
  `);
});

router.get('*', (req, res) => {
  res.send(`
    hello, world!
  `);
});

export default router;
