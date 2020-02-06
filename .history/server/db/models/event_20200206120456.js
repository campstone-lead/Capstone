const Sequelize = require('sequelize')
const db = require('../db')
const { Venue } = require('./index')
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
  }
})

module.exports = Event;

/**
 * hooks
 */
