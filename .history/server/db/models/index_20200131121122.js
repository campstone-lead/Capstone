const User = require('./user')
const Booker =require('./booker')
const Venue =require('./venue')
///ASSOCIATIONS HERE:

Venue.belongsTo(Booker, {allowNull: true})
Booker.hasMany(Venue)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Booker,
  Venue
}
