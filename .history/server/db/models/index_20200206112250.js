const User = require('./user')
const Artist = require('./artist')


const Booker = require('./booker')
const Venue = require('./venue')
const Event = require('./event')
const Recommendation = require('./recommendation')
///ASSOCIATIONS HERE:

Venue.belongsTo(Booker, { allowNull: true })
Booker.hasMany(Venue)

Recommendation.belongsTo(Artist)
Artist.hasMany(Recommendation)

Recommendation.belongsTo(Venue)
Venue.hasMany(Recommendation)
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
  Recommendation
}
