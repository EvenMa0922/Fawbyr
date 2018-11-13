const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/team-wenjun', {
        name: 'Wenjun Zhu',
        avatarUrl: '../images/wj.jpeg',
        bio: 'SFSU student',
        linkedinURL: 'https://www.linkedin.com/in/wenjun-zhu-132824157/'
    });
});

module.exports = router;