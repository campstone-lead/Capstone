const router = require('express').Router();
const queryString = require('query-string');
const { Op } = require('sequelize');
const { Venue, Event, Artist } = require('../db/models');
module.exports = router;

// when my query stringifies and there is only one chosen genre
// it will parse a string instead of array
const returnArray = data => {
  let genre = [];
  if (typeof data === 'string') {
    genre.push(data);
  } else if (data && Array.isArray(data)) {
    genre = [...data];
  }
  return genre;
};

async function helperFunc(model, data, genre) {
  let helperFuncVal = [];
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
  if (data.genre === undefined)
    if (data.word)
      helperFuncVal = await model.findAll({
        where: { name: { [Op.iLike]: `${data.word}%` } },
      });
    else helperFuncVal = await model.findAll();
  return helperFuncVal;
}

//a function when request is been sent with all three paramentrs
//such as mainFilter(main), genres(genre), inputedWord(word)
async function switchMainFilter(data) {
  let genre = returnArray(data.genre);
  let returnData = [];
  switch (data.main) {
    case 'Venues':
      returnData = await helperFunc(Venue, data, genre);
      break;
    case 'Artists':
      returnData = await helperFunc(Artist, data, genre);
      break;
    case 'Events':
      returnData = await helperFunc(Event, data, genre);
      break;
    default:
      break;
  }
  return returnData;
}

//a function when request is been sent with two paramentrs such
//as genres(genre), inputedWord(word)
async function switchGenreFilter(data) {
  async function func(genre) {
    let allGenres = [];
    allGenres = [...(await helperFunc(Artist, data, genre))];
    allGenres = [...allGenres, ...(await helperFunc(Event, data, genre))];
    allGenres = [...allGenres, ...(await helperFunc(Venue, data, genre))];
    return allGenres;
  }
  let genre = returnArray(data.genre);
  return await func(genre);
}

//a function when request is been sent with only one inputedWord
//(word) paramentr
async function findByWord(data) {
  let returnData = [];
  async function func(model) {
    return await model.findAll({
      where: { name: { [Op.iLike]: `${data.word}%` } },
    });
  }
  returnData = [...(await func(Event))];
  returnData = [...returnData, ...(await func(Artist))];
  returnData = [...returnData, ...(await func(Venue))];
  return returnData;
}

router.get('/:query', async (req, res, next) => {
  try {
    let data = queryString.parse(req.params.query);
    let returnData = [];
    if (data.main !== undefined) returnData = await switchMainFilter(data);
    else {
      if (data.genre !== undefined) returnData = await switchGenreFilter(data);
      else if (data.word.length > 0) returnData = await findByWord(data);
    }
    res.json(returnData);
  } catch (error) {
    next(error);
  }
});
