const Sequelize = require('sequelize')
const db = require('../db')

const fetch = require('node-fetch')
const Artist = require('./artist')
const Recommendation = require('./recommendation')
const googleMapsApiKey = require('../../../secrets')

const Venue = db.define('venue', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    // validate: {
    //   notEmpty: true
    // }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.mycustomer.com/sites/all/themes/pp/img/default-user.png'
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  }
})

module.exports = Venue;

/**
 * hooks
 */

function makeLatLngList(rows) {
  let locations = rows.map((row) => row.latitude.toString().concat(",", row.longitude.toString()))
  return locations.join("|")
}

const generateRecs = async venue => {
  if (venue.changed('address')) {
    try {
      const artists = await db.models.artist.findAll()
      const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${venue.latitude},${venue.longitude}&destinations=${makeLatLngList(artists)}&mode=transit&key=${googleMapsApiKey}`);
      const data = await response.json()

      for (let index = 0; index < artists.length; index++) {
        let artist = artists[0]
        try {
          let [result, created] = await db.models.recommendation.findOrCreate({
            where: {
              venueId: venue.id,
              artistId: artist.id,
            }
          })
          try {
            await result.update({ score: parseFloat(data.rows[0].elements[index].distance.text) })
          } catch (error) {
            console.log(error)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// create method to get lat/long if not given?
// create distance recommendation elements here

Venue.afterCreate(generateRecs)
Venue.afterUpdate(generateRecs)
Venue.afterBulkCreate(venues => {
  venues.forEach(generateRecs)
})
