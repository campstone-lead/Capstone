const router = require('express').Router();
const queryString = require('query-string');
const { Op } = require('sequelize');
const { Venue } = require('../db/models');
module.exports = router;

router.get('/:query', async (req, res, next) => {
  try {
    let data = queryString.parse(req.params.query);
    let returnData = [];
    switch (data.main) {
      case 'Venues':
        if (data.genre && Array.isArray(data.genre))
          returnData = await Venue.findAll({
            where: { genres: { [Op.contains]: data.genre } },
          });
        if (typeof data.genre === 'string') {
          let genre = [];
          genre.push(data.genre);
          returnData = await Venue.findAll({
            where: { genres: { [Op.contains]: genre } },
          });
        }
        if (data.genre === undefined) returnData = await Venue.findAll();
        break;
      default:
        break;
    }
    // const data = await Venue.findAll()
    res.json(returnData);
  } catch (error) {
    next(error);
  }
});
