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
  imageURL: {
    type: Sequelize.STRING,
    validate:{
      isUrl:true
    },
    defaultValue:'https://img.favpng.com/20/11/12/computer-icons-user-profile-png-favpng-0UAKKCpRRsMj5NaiELzw1pV7L.jpg'
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
  status:{
    type:Sequelize.STRING,
    defaultValue:'booker'
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
const setSaltAndPassword = booker => {
  if (booker.changed('password')) {
    booker.salt = Booker.generateSalt()
    booker.password = Booker.encryptPassword(booker.password(), booker.salt())
  }
}

Booker.beforeCreate(setSaltAndPassword)
Booker.beforeUpdate(setSaltAndPassword)
Booker.beforeBulkCreate(bookers => {
  bookers.forEach(setSaltAndPassword)
})
