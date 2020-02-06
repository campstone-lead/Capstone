const Sequelize = require('sequelize')
const db = require('../db')

const fetch = require('node-fetch')
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
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg'
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

function encodeLocation(addressString) {
  const encodings = {
    " ": "+",
    "\"": "%22",
    ",": "%2C",
    "<": "%3C",
    ">": "%3E",
    "#": "%23",
    "%": "%25",
    "|": "%7C",
    "&": "%26",
    "?": "%3F"
  }
  return addressString.split("").map((char) => {
    if (encodings[char]) {
      return encodings[char]
    } else {
      return char
    }
  }).join("")
}

const preHooks = async venue => {
  //findLatLng
  if (venue.changed('address') && !venue.changed('longitude') && !venue.changed('latitude')) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeLocation(venue.address)}&key=${googleMapsApiKey}`)
      const data = await response.json()
      venue.latitude = data.results[0].geometry.location.lat
      venue.longitude = data.results[0].geometry.location.lng
    } catch (error) {
      console.log(error)
    }
  }
}

Venue.beforeCreate(preHooks)
Venue.beforeUpdate(preHooks)
Venue.beforeBulkCreate(venues => {
  venues.forEach(preHooks)
})

function makeLatLngList(rows) {
  let locations = rows.map((row) => row.latitude.toString().concat(",", row.longitude.toString()))
  return locations.join("|")
}

const generateRecs = async venue => {
  if (venue.changed('address')) {
    try {
      const artists = await db.models.artist.findAll()
      const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${venue.latitude},${venue.longitude}&destinations=${makeLatLngList(artists)}&key=${googleMapsApiKey}`);
      const data = await response.json()

      for (let index = 0; index < artists.length; index++) {
        let artist = artists[index]
        try {
          let [result, created] = await db.models.recommendation.findOrCreate({
            where: {
              venueId: venue.id,
              artistId: artist.id,
            }
          })
          try {
            await result.update({ score: Number(((data.rows[0].elements[index].distance.value) / 1609).toFixed(3)) })
            // await result.update({ score: parseFloat(data.rows[0].elements[index].distance.text) })
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
