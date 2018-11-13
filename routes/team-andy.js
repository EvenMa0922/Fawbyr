const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('pages/team-andy', {
    name: 'Andy Lai',
    avatarUrl: 'https://i.imgur.com/g8HFbnw.jpg',
    bio:
      'Andy is currently entering his Senior year of his undergraduate. ' +
      "He hates when code doesn't do what he wants it to do. " +
      'Andy hopes to one day adopt a dog when he has his own place. ' +
      "On his free time, Andy loves to train his powerlifting skills at his friend's gym.",
    linkedin: "https://www.linkedin.com/in/anlai2/",
    website: "https://www.andy-lai.com"
  });
});

module.exports = router;
