const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('pages/team-ben', {
    name: 'Ben Clark',
    avatarUrl: 'https://i.imgur.com/SfVuCCR.png',
    bio: 'There\'s not too much to say about me. ' +
        'I like staying up late coding because there\'s not normally anything good on TV. '  +
        'One day, when I\'m rich and successful, I\'m going to move to somewhere with really good internet. ' +
        'It should not take 15 minutes to push master in the year 2018. ',
    trivia:  'I really hate the term "code monkey',

  });
});

module.exports = router;
