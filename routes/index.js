const express = require('express');
const router = express.Router();
const imageDB = require('../db/imageDB');

/* GET home page. */
router.get('/', (req, res, next) => {
  imageDB.imageCategories()
    .then(results => {
      res.render('pages/index', {
        title: 'Fawbyr Project',
        description: 'Browse and upload custom images (coming soon).',
        tagline: 'Project for CSC648 - Summer',
        categories: results,
      });
    })
    .catch(error =>{
      console.log(error);
      response.status(404);
  })
});

module.exports = router;
