const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response
    .render('pages/register', {
      title: 'Register for an account'
    })
    .catch(error => {
      console.log(error);
      response.status(404);
    });
});

module.exports = router;
