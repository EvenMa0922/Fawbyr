const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/team-razmik', {
        name: 'Razmik Hakobyan',
        avatarUrl: '../images/raz.jpg',
        bio: 'Hello World. I just spend hours smashing my face on the keyboard until something works.',
        linkedinURL: 'https://www.linkedin.com/in/razmik-hakobyan-93146813b/'
    });
});

module.exports = router;
