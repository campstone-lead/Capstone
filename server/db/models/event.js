const Sequelize = require('sequelize');
const db = require('../db');
const Venue = require('./venue');
const Booker = require('./booker');
const Event = db.define('event', {
  tableName: {
    type: Sequelize.STRING,
    defaultValue: 'Event',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
  },
  location: {
    type: Sequelize.STRING,
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  venueName: {
    type: Sequelize.STRING,
  },
  bookerId: {
    type: Sequelize.INTEGER,
  },
  bookerName: {
    type: Sequelize.STRING,
  },
});
const preHooks = async jointTable => {
  try {
    const id = jointTable.venueId;
    if (jointTable.changed('venueId')) {
      let venue = await Venue.findByPk(id);
      let booker = await Booker.findByPk(venue.bookerId);
      jointTable.location = venue.address;
      jointTable.imageURL = venue.imageURL;
      jointTable.genres = venue.genres;
      jointTable.venueName = venue.name;
      jointTable.bookerId = venue.bookerId;
      jointTable.bookerName = booker.firstName + ' ' + booker.lastName;
    }
  } catch (err) {
    console.log(err);
  }
};
Event.beforeCreate(preHooks);
Event.beforeUpdate(preHooks);
Event.beforeBulkCreate(events => {
  events.forEach(preHooks);
});

module.exports = Event;

/**
 * hooks
 */
