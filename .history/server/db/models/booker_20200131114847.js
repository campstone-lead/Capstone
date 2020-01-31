const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Booker = db.define('booker', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING,
    validate:{
      notEmpty:true,
      isUrl:true
    }
  },
  phone:{
    type:Sequelize.STRING,
    allowNull:false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = Booker

/**
 * instanceMethods
 */
Booker.prototype.correctPassword = function(candidatePwd) {
  return Booker.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */

Booker.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Booker.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = Booker => {
  if (Booker.changed('password')) {
    Booker.salt = Booker.generateSalt()
    Booker.password = Booker.encryptPassword(Booker.password(), Booker.salt())
  }
}

Booker.beforeCreate(setSaltAndPassword)
Booker.beforeUpdate(setSaltAndPassword)
Booker.beforeBulkCreate(Bookers => {
  Bookers.forEach(setSaltAndPassword)
})
