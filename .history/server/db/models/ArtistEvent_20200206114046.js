const Sequelize = require('sequelize')
const db = require('../db')

const ArtistEvent = db.define('ArtistEvent', {
  status: {
    type: Sequelize.ENUM('pending', 'booked', 'none'),
    validate: {
      notEmpty: true
    },
    defaultValue: 'none'
  },
  venueId: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  bookerId: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ArtistEvent
