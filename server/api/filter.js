const router = require('express').Router();
const queryString = require('query-string');
const { Op } = require('sequelize');
const { Venue, Event, Artist } = require('../db/models');
module.exports = router;

async function switchMainFilter(data) {
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
    case 'Artists':
      if (data.genre && Array.isArray(data.genre))
        returnData = await Artist.findAll({
          where: { genres: { [Op.contains]: data.genre } },
        });
      if (typeof data.genre === 'string') {
        let genre = [];
        genre.push(data.genre);
        returnData = await Artist.findAll({
          where: { genres: { [Op.contains]: genre } },
        });
      }
      if (data.genre === undefined) returnData = await Artist.findAll();
      break;
    case 'Events':
      if (data.genre && Array.isArray(data.genre))
        returnData = await Event.findAll({
          where: { genres: { [Op.contains]: data.genre } },
        });
      if (typeof data.genre === 'string') {
        let genre = [];
        genre.push(data.genre);
        returnData = await Event.findAll({
          where: { genres: { [Op.contains]: genre } },
        });
      }
      if (data.genre === undefined) returnData = await Event.findAll();
      break;
    default:
      break;
  }
  return returnData;
}

async function switchGenreFilter(data) {
  let returnData = [];
  if (data.genre && Array.isArray(data.genre)) {
    returnData = [
      ...returnData,
      ...(await Artist.findAll({
        where: { genres: { [Op.contains]: data.genre } },
      })),
    ];
    returnData = [
      ...returnData,
      ...(await Venue.findAll({
        where: { genres: { [Op.contains]: data.genre } },
      })),
    ];
    returnData = [
      ...returnData,
      ...(await Event.findAll({
        where: { genres: { [Op.contains]: data.genre } },
      })),
    ];
  }
  if (typeof data.genre === 'string') {
    let genre = [];
    genre.push(data.genre);
    returnData = [
      ...returnData,
      ...(await Artist.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
    returnData = [
      ...returnData,
      ...(await Event.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
    returnData = [
      ...returnData,
      ...(await Venue.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
  }
  return returnData;
}

async function findByWord(data) {
  let returnData = [];
  returnData = [
    ...returnData,
    ...(await Artist.findAll({
      where: { firstName: { [Op.like]: '%' + data.word + '%' } },
    })),
  ];
  return returnData;
}

router.get('/:query', async (req, res, next) => {
  try {
    let data = queryString.parse(req.params.query);
    let returnData = [];
    if (data.main) returnData = await switchMainFilter(data);
    else {
      if (data.genre) returnData = await switchGenreFilter(data);
      else if (data.word) returnData = await findByWord(data);
    }
    // const data = await Venue.findAll()
    res.json(returnData);
  } catch (error) {
    next(error);
  }
});
