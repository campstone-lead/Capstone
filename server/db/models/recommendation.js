const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Recommendation = db.define('recommendation', {
  score: {
    type: Sequelize.FLOAT
  },
  distance: {
    type: Sequelize.FLOAT
  }
})

module.exports = Recommendation

// /**
//  * instanceMethods
//  */
// Artist.prototype.correctPassword = function (candidatePwd) {
//   return Artist.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */

// Artist.generateSalt = function () {
//   return crypto.randomBytes(16).toString('base64')
// }
