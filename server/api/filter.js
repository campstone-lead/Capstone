const router = require('express').Router();
const queryString = require('query-string');
const { Op } = require('sequelize');
const { Venue, Event, Artist } = require('../db/models');
module.exports = router;

async function switchMainFilter(data) {
  async function helperFunc(model, data) {
    let helperFuncVal = [];
    if (data.genre && Array.isArray(data.genre))
      if (data.word)
        helperFuncVal = await model.findAll({
          where: {
            genres: { [Op.contains]: data.genre },
            name: { [Op.iLike]: `${data.word}%` },
          },
        });
      else
        helperFuncVal = await model.findAll({
          where: { genres: { [Op.contains]: data.genre } },
        });
    if (typeof data.genre === 'string') {
      let genre = [];
      genre.push(data.genre);
      if (data.word)
        helperFuncVal = await model.findAll({
          where: {
            genres: { [Op.contains]: genre },
            name: { [Op.iLike]: `${data.word}%` },
          },
        });
      else
        helperFuncVal = await model.findAll({
          where: { genres: { [Op.contains]: genre } },
        });
    }
    if (data.genre === undefined)
      if (data.word)
        helperFuncVal = await model.findAll({
          where: { name: { [Op.iLike]: `${data.word}%` } },
        });
      else helperFuncVal = await model.findAll();
    return helperFuncVal;
  }
  let returnData = [];
  switch (data.main) {
    case 'Venues':
      returnData = helperFunc(Venue, data);
      break;
    case 'Artists':
      returnData = helperFunc(Artist, data);
      //   if (data.genre && Array.isArray(data.genre))
      //     if (data.word)
      //       returnData = await Artist.findAll({
      //         where: {
      //           genres: { [Op.contains]: data.genre },
      //           [Op.or]: [
      //             { firstName: { [Op.iLike]: `${data.word}%` } },
      //             { lastName: { [Op.iLike]: `${data.word}%` } },
      //           ],
      //         },
      //       });
      //     else
      //       returnData = await Artist.findAll({
      //         where: {
      //           genres: { [Op.contains]: data.genre },
      //         },
      //       });
      //   if (typeof data.genre === 'string') {
      //     let genre = [];
      //     genre.push(data.genre);
      //     if (data.word)
      //       returnData = await Artist.findAll({
      //         where: {
      //           genres: { [Op.contains]: genre },
      //           [Op.or]: [
      //             { firstName: { [Op.iLike]: `${data.word}%` } },
      //             { lastName: { [Op.iLike]: `${data.word}%` } },
      //           ],
      //         },
      //       });
      //     else
      //       returnData = await Artist.findAll({
      //         where: {
      //           genres: { [Op.contains]: genre },
      //         },
      //       });
      //   }
      //   if (data.genre === undefined) returnData = await Artist.findAll();
      break;
    case 'Events':
      returnData = helperFunc(Event, data);
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
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `${data.word}%` } },
          { lastName: { [Op.iLike]: `${data.word}%` } },
        ],
      },
    })),
  ];
  returnData = [
    ...returnData,
    ...(await Venue.findAll({
      where: { name: { [Op.iLike]: `${data.word}%` } },
    })),
  ];
  returnData = [
    ...returnData,
    ...(await Event.findAll({
      where: { name: { [Op.iLike]: `${data.word}%` } },
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
