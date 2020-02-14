const router = require('express').Router();
const Artist = require('../db/models/artist');
const { Recommendation, ArtistEvent } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const data = await Artist.findByPk(req.params.id);
    if (!data) {
      res.sendStatus(404);
    } else {
      const artistStatus = await ArtistEvent.findAll({
        where: { artistId: req.params.id },
      });
      res.json({ artist: data, status: artistStatus });
    }
  } catch (error) {
    next(error);
  }
});
router.get('/distance/:venueId', async (req, res, next) => {
  try {
    const recList = await Artist.findAll({
      include: [
        {
          model: Recommendation,
          where: { venueId: req.params.venueId },
        },
      ],
      order: [[Recommendation, 'score', 'ASC']],
    });
    res.json(recList);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201);
    res.send(artist);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user.status === 'artist') {
      const artist = await Artist.findByPk(req.user.id);
      artist.update(req.body);
    }
  } catch (error) {
    next(error);
  }
});
