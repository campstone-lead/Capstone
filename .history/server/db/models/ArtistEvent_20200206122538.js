const Sequelize = require('sequelize')
const db = require('../db')
const Booker = require('./booker')
const Venue = require('./venue')
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
  },
  bookerId: {
    type: Sequelize.INTEGER,
  }
})

module.exports = ArtistEvent

const preHooks = async jointTable => {
  try {
    const id = jointTable.eventId;
    if (jointTable.changed('eventId')) {
      let venue = await Venue.findByPk(id)
      const booker = await Booker.findByPk(venue.bookerId)
      jointTable.bookerId = booker.id;
      jointTable.venueId = venue.id;
    }
  } catch (err) {
    console.log(err)
  }
}
ArtistEvent.beforeCreate(preHooks)
ArtistEvent.beforeCreate(preHooks)
ArtistEvent.beforeCreate(jointTable => {
  jointTable.forEach(preHooks)
})
