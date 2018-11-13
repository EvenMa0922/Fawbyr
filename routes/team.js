const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('pages/team', {
    title: 'Fawbyr Team Page',
    teamMembers: [
      { firstName: "Andy", lastName: "Lai" },
      { firstName: "Ben", lastName: "Clark" },
      { firstName: "Flavy", lastName: "Tonfack" },
      { firstName: "Razmik", lastName: "Hakobyan" },
      { firstName: "Wenjun", lastName: "Shu" },
      { firstName: "Yusen", lastName: "Ma" },
    ]
  });
});

module.exports = router;
