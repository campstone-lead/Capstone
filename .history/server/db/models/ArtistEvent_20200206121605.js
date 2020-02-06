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
      console.log('here', id)
    }
    // const venue = await Venue.findOne({ where: { id: id } })

    // const booker = await Booker.findByPk(venue.bookerId)
    // if (venue !== null && booker !== null) {
    // jointTable.venueId = venue.id;
    //   jointTable.bookerId = booker.id;
    // }
  } catch (err) {
    console.log(err)
  }
}
ArtistEvent.beforeCreate(preHooks)
ArtistEvent.beforeUpdate(preHooks)
ArtistEvent.beforeBulkCreate(jointTable => {
  jointTable.forEach(preHooks)
})
