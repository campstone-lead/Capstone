const Sequelize = require('sequelize');
const db = require('../db');

const fetch = require('node-fetch');
// const googleMapsApiKey = require('../../../secrets');
if (process.env.NODE_ENV !== 'production') require('../../../secrets');

const Venue = db.define('venue', {
  tableName: {
    type: Sequelize.STRING,
    defaultValue: 'Venue',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
});

module.exports = Venue;

/**
 * hooks
 */

function encodeLocation(addressString) {
  const encodings = {
    ' ': '+',
    '"': '%22',
    ',': '%2C',
    '<': '%3C',
    '>': '%3E',
    '#': '%23',
    '%': '%25',
    '|': '%7C',
    '&': '%26',
    '?': '%3F',
  };
  return addressString
    .split('')
    .map(char => {
      if (encodings[char]) {
        return encodings[char];
      } else {
        return char;
      }
    })
    .join('');
}

const preHooks = async venue => {
  //findLatLng
  if (
    venue.changed('address') &&
    !venue.changed('longitude') &&
    !venue.changed('latitude')
  ) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeLocation(
          venue.address
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      venue.latitude = data.results[0].geometry.location.lat;
      venue.longitude = data.results[0].geometry.location.lng;
    } catch (error) {
      console.log(error);
    }
  }
};

Venue.beforeCreate(preHooks);
Venue.beforeUpdate(preHooks);
Venue.beforeBulkCreate(venues => {
  venues.forEach(preHooks);
});

function makeLatLngList(rows) {
  let locations = rows.map(row =>
    row.latitude.toString().concat(',', row.longitude.toString())
  );
  return locations.join('|');
}
const getMatchingGenres = (arr1, arr2) => {
  let less = arr1.length <= arr2.length ? arr1 : arr2;
  let greater = arr1.length > arr2.length ? arr1 : arr2;
  let i = 0
  let j = 0;
  let match = []
  while (i < less.length && j < greater.length) {
    if (less[i] === greater[j]) {
      match.push(less[i]);
      i++;
      j++;
    } else if (less[i] < greater[j]) {
      i++;
    } else j++;
  }
  return match;
}

const generateRecs = async venue => {
  if (venue.changed('address')) {
    try {
      const artists = await db.models.artist.findAll();
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
        venue.latitude
        },${venue.longitude}&destinations=${makeLatLngList(
          artists
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      for (let index = 0; index < artists.length; index++) {
        let artist = artists[index];
        try {
          let [result, created] = await db.models.recommendation.findOrCreate({
            where: {
              venueId: venue.id,
              artistId: artist.id,
            },
          });
          let currentDistance = Number(
            (data.rows[0].elements[index].distance.value / 1609).toFixed(3));
          let score = currentDistance;
          let currentArtistGenres = artist.genres.sort();
          let currentVenueGenres = venue.genres.sort();
          let matchingGenres = getMatchingGenres(currentArtistGenres, currentVenueGenres);
          let greater = currentVenueGenres.length > currentArtistGenres.length ? currentVenueGenres : currentArtistGenres;
          score = ((greater.length - matchingGenres.length) / 2) + currentDistance
          // console.log((greater.length - matchingGenres.length), (greater.length - matchingGenres.length) / 2, score)

          try {
            await result.update({
              distance: currentDistance,
              score: score.toFixed(3)
              ,
            });
            // await result.update({ score: parseFloat(data.rows[0].elements[index].distance.text) })
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// create method to get lat/long if not given?
// create distance recommendation elements here

Venue.afterCreate(generateRecs);
Venue.afterUpdate(generateRecs);
Venue.afterBulkCreate(venues => {
  venues.forEach(generateRecs);
});
