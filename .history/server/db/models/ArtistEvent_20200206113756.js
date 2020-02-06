const Sequelize = require('sequelize')
const db = require('../db')

const ArtistEvent = db.define('ArtistEvent', {
  status: {
    type: Sequelize.STRING
  },
  venueId: {
    type: Sequelize.INTEGER
  },
  bookerId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ArtistEvent
