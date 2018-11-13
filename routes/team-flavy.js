const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('pages/team-flavy', {
        name: 'Flavy Tonfack',
        avatarUrl: '../images/flavy.jpg',
        bio:
        'Hello There, I am Flavy! Native French speaker, I defined myself as a creative person who loves to build things with design and code. ' +
        "When I am not in front of a computer screen, I am probably watching movie, shopping or cooking. " +
        "Aww, I love taking pictures!.",
        linkedin: "https://www.linkedin.com/in/flavytonfack/"
    });
});

module.exports = router;