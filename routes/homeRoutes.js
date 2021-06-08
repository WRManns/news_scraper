const router = require('express').Router();
const { SavedNews, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const searchData = await SavedNews.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const saved_articles = searchData.map((saved_article) => saved_article);
    console.log(searchData)
    console.log(req.session.logged_in)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      saved_articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/:id', async (req, res) => {
  try {
    const searchData = await SavedNews.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    const saved_article = searchData.get({ plain: true });

    res.render('search', {
      ...saved_article,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/search', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: SavedNews }],
    });

    const user = userData.get({ plain: true });

    res.render('search', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;