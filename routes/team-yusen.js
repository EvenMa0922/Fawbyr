const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/team-yusen', {
        name: 'Yusen Ma',
        avatarUrl: '../images/yusen.jpg',
        bio: 'SFSU CS student',
        linkedinURL: ''
    });
});

module.exports = router;
