const Sequelize = require('sequelize')
const db = require('../db')

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
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
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

