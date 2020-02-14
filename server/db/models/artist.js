const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const fetch = require('node-fetch');
// const googleMapsApiKey = require('../../../secrets');
require('../../../secrets');

const Artist = db.define('artist', {
  tableName: {
    type: Sequelize.STRING,
    defaultValue: 'Artist',
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genres: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM(
        'rock',
        'jazz',
        'electronic',
        'pop',
        'hipHop',
        'indie',
        'country',
        'metal',
        'house',
        'techno'
      )
    ),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bio: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipCode: {
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
  instagramUrl: {
    type: Sequelize.STRING,
  },
  spotifyUrl: {
    type: Sequelize.STRING,
  },
  facebookUrl: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.ENUM('solo', 'dj', 'band'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'artist',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = Artist;

/**
 * instanceMethods
 */
Artist.prototype.correctPassword = function (candidatePwd) {
  return Artist.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */

Artist.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

Artist.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const preHooks = async artist => {
  //setSaltAndPassword
  if (artist.changed('password')) {
    artist.salt = Artist.generateSalt();
    artist.password = Artist.encryptPassword(artist.password(), artist.salt());
  }
  //findLatLng
  if (artist.changed('zipCode')) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${artist.zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      artist.latitude = data.results[0].geometry.location.lat;
      artist.longitude = data.results[0].geometry.location.lng;
    } catch (error) {
      console.log(error);
    }
  }
};

Artist.beforeCreate(preHooks);
Artist.beforeUpdate(preHooks);
Artist.beforeBulkCreate(artists => {
  artists.forEach(preHooks);
});
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
function makeLatLngList(rows) {
  let locations = rows.map(row =>
    row.latitude.toString().concat(',', row.longitude.toString())
  );
  return locations.join('|');
}

const generateRecs = async artist => {
  if (artist.changed('zipCode')) {
    try {
      const venues = await db.models.venue.findAll();
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
        artist.latitude
        },${artist.longitude}&destinations=${makeLatLngList(
          venues
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      for (let index = 0; index < venues.length; index++) {
        let venue = venues[index];
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


          try {
            await result.update({
              distance: currentDistance,
              score: score
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

Artist.afterCreate(generateRecs);
Artist.afterUpdate(generateRecs);
Artist.afterBulkCreate(artists => {
  artists.forEach(generateRecs);
});
