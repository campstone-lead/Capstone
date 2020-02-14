const User = require('./user')
const Artist = require('./artist')
const ArtistEvent = require('./ArtistEvent')


const Booker = require('./booker')
const Venue = require('./venue')
const Event = require('./event')
const Recommendation = require('./recommendation')
const Message = require('./message')
///ASSOCIATIONS HERE:

Venue.belongsTo(Booker)//, { allowNull: true })
Booker.hasMany(Venue)

Recommendation.belongsTo(Artist)
Artist.hasMany(Recommendation)

Recommendation.belongsTo(Venue)
Venue.hasMany(Recommendation)

Event.belongsTo(Venue);
Venue.hasMany(Event);

Event.belongsToMany(Artist, { through: ArtistEvent });
Artist.belongsToMany(Event, { through: ArtistEvent })
// Venue.belongsToMany(Artist, { through: Recommendation })
// Artist.belongsToMany(Venue, { through: Recommendation })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Artist,
  Booker,
  Venue,
  Event,
  Recommendation,
  ArtistEvent,
  Message
}
