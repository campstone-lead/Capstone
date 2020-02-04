const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
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
    artistName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    genres: {
        type: Sequelize.ARRAY(Sequelize.ENUM('rock', 'jazz', 'electronic', 'pop', 'hipHop', 'indie', 'country', 'metal', 'house', 'techno')),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    zipCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    instagramUrl: {
        type: Sequelize.STRING,
    },
    spotifyUrl: {
        type: Sequelize.STRING,
    },
    facebookUrl: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.ENUM('solo', 'dj', 'band'),
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type:Sequelize.STRING
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

module.exports = Artist

/**
 * instanceMethods
 */
Artist.prototype.correctPassword = function(candidatePwd) {
    return Artist.encryptPassword(candidatePwd, this.salt()) === this.password()
  }

  /**
   * classMethods
   */

  Artist.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }

  Artist.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  /**
   * hooks
   */
  const setSaltAndPassword = artist => {
    if (artist.changed('password')) {
      artist.salt = Artist.generateSalt()
      artist.password =Artist.encryptPassword(artist.password(), artist.salt())
    }
  }

  Artist.beforeCreate(setSaltAndPassword)
  Artist.beforeUpdate(setSaltAndPassword)
  Artist.beforeBulkCreate(artists => {
    artists.forEach(setSaltAndPassword)
  })

