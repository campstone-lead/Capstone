const Sequelize = require('sequelize')
const db = require('../db')
const { Venue, Booker } = require('./index')
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
      let venue = {}
      venue = await Venue.findAll()
      console.log('here', id, venue)
    }


    // const booker = await Booker.findByPk(venue.bookerId)
    // if (venue !== null && booker !== null) {
    // jointTable.venueId = venue.id;
    //   jointTable.bookerId = booker.id;
    // }
  } catch (err) {
    console.log(err)
  }
}
ArtistEvent.afterCreate(preHooks)
ArtistEvent.afterUpdate(preHooks)
ArtistEvent.afterBulkCreate(jointTable => {
  jointTable.forEach(preHooks)
})
