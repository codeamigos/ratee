import express from 'express';


const router = express.Router();

router.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Ratee админ</title>
        <meta name="viewport" content="width=device-width, minimum-scale=0.9, maximum-scale=0.9" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/public/admin.js"></script>
      </body>
    </html>
  `);
});

router.get('*', (req, res) => {
  res.send(`
    hello, world!
  `);
});

export default router;
