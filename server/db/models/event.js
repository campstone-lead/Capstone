const Sequelize = require('sequelize');
const db = require('../db');
const Venue = require('./venue');
const Booker = require('./booker');
const Event = db.define('event', {
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
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
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
      if (jointTable.imageURL === null) { jointTable.imageURL = venue.imageURL; }
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
