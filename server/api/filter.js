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
  async function helperFunc(genre) {
    let allGenres = [];
    allGenres = [
      ...allGenres,
      ...(await Artist.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
    allGenres = [
      ...allGenres,
      ...(await Event.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
    allGenres = [
      ...allGenres,
      ...(await Venue.findAll({
        where: { genres: { [Op.contains]: genre } },
      })),
    ];
    return allGenres;
  }
  if (data.genre && Array.isArray(data.genre)) {
    returnData = helperFunc(data.genre);
  }
  if (typeof data.genre === 'string') {
    let genre = [];
    genre.push(data.genre);
    returnData = helperFunc(genre);
  }
  return returnData;
}

async function findByWord(data) {
  let returnData = [];
  returnData = [
    ...returnData,
    ...(await Artist.findAll({
      where: { firstName: { [Op.like]: `${data.word}%` } },
    })),
  ];
  return returnData;
}

router.get('/:query', async (req, res, next) => {
  try {
    let data = queryString.parse(req.params.query);

    console.log('HERE', data);
    let returnData = [];
    if (data.main !== undefined) returnData = await switchMainFilter(data);
    else {
      if (data.genre !== undefined) returnData = await switchGenreFilter(data);
      else if (data.word !== undefined) returnData = await findByWord(data);
    }
    // const data = await Venue.findAll()
    res.json(returnData);
  } catch (error) {
    next(error);
  }
});
