const express = require("express");
const router = express.Router();
const imageDB = require('../db/imageDB');
const {find} = require("lodash")

router.get('/', (request, response) => {
    imageDB.imageCategories()
        .then(results => {
            response.render('pages/search-image', {
                searchString: '',
                targetCategory: {},
                categories: results,
                images: []
            });
        }).catch(error => {
            console.log(error);
            response.status(404)
        })
});

router.post('/cat-search', (request, response) => {
    imageDB.imageSearch(
        Number(request.body.imageCategory), request.body.searchString)
        .then(results => {
            const categories = results[0]
            const images = results[1]
            const {imageCategory, searchString} = request.body
            const targetCategory = find(results[0], (category) => {
                return category.id == imageCategory
            });

            response.render(
                'pages/search-image', {
                    searchString: searchString,
                    targetCategory: targetCategory,
                    categories: categories,
                    images: images
                });
        })
        .catch(error => {
            console.log(error);
            response.redirect('/search');
        });

});

router.get('/:query', (request, response) => {
    imageDB.highResImage(request.params.query)
        .then(results => {
            response.render('pages/image', {image: results});
        }).catch(err => {
            console.log(err);
            response.redirect('/');
        })
});


module.exports = router;