const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response
    .render('pages/login', {
      title: 'Login to your account'
    })
    .catch(error => {
      console.log(error);
      response.status(404);
    });
});

module.exports = router;
