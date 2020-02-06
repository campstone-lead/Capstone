const Sequelize = require('sequelize')
const db = require('../db')
const Venue = require('./venue')
const Event = db.define('event', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg'
  },
  location: {
    type: Sequelize.STRING
  }
})
const preHooks = async jointTable => {
  try {
    const id = jointTable.venueId;
    if (jointTable.changed('venueId')) {
      let venue = await Venue.findByPk(id)
      jointTable.location = venue.address
      jointTable.imageURL = venue.imageURL
    }
  } catch (err) {
    console.log(err)
  }
}
Event.beforeCreate(preHooks)
Event.beforeUpdate(preHooks)
Event.beforeBulkCreate(events => {
  events.forEach(preHooks)
})

module.exports = Event;

/**
 * hooks
 */
