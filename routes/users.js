const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('pages/users', {
    title: 'Fawbyr user\'s Page'
  });
});

module.exports = router;
