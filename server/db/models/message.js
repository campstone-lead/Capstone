const Sequelize = require('sequelize')
const db = require('../db')
const Booker = require('./booker');
const Artist = require('./artist');
const Message = db.define('message', {
  message: {
    type: Sequelize.TEXT
  },
  ownerId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  },
  ownerName: {
    type: Sequelize.STRING
  },
  ownerImageURL: {
    type: Sequelize.STRING
  }

})
const preHooks = async jointTable => {
  try {
    const id = jointTable.ownerId;
    const status = jointTable.status;
    if (jointTable.changed('ownerId')) {
      if (status === 'artist') {
        let artist = await Artist.findByPk(id);
        jointTable.ownerName = artist.name;
        jointTable.ownerImageURL = artist.imageURL;
      }
      else {
        let booker = await Booker.findByPk(id);
        jointTable.ownerName = booker.firstName + ' ' + booker.lastName;
        jointTable.ownerImageURL = booker.imageURL;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
Message.beforeCreate(preHooks);
Message.beforeUpdate(preHooks);
Message.beforeBulkCreate(messages => {
  messages.forEach(preHooks);
});
module.exports = Message

