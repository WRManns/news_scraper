const router = require('express').Router();
const { SavedNews } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newSearch = await SavedNews.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSearch);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const searchData = await SavedNews.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!searchData) {
      res.status(404).json({ message: 'No search found with this id!' });
      return;
    }

    res.status(200).json(searchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
