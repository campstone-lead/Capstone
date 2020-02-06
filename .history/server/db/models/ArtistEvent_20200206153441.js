const Sequelize = require('sequelize')
const db = require('../db')
const Booker = require('./booker')
const Venue = require('./venue')
const Event = require('./event')
const ArtistEvent = db.define('ArtistEvent', {
  status: {
    type: Sequelize.ENUM('pending', 'declined', 'booked'),
    validate: {
      notEmpty: true
    },
    defaultValue: 'pending'
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
      let event = await Event.findByPk(id)
      let venue = await Event.findByPk(event.venueId)
      const booker = await Booker.findByPk(venue.bookerId)
      jointTable.bookerId = booker.id;
      jointTable.venueId = venue.id;
    }
  } catch (err) {
    console.log(err)
  }
}
ArtistEvent.beforeCreate(preHooks)
ArtistEvent.beforeUpdate(preHooks)
ArtistEvent.beforeBulkCreate(jointTable => {
  jointTable.forEach(preHooks)
})
