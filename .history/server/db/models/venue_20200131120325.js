const Sequelize = require('sequelize')
const db = require('../db')

const Venue=db.define('venue',{

  name:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  latitude:{
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  longitude:{
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  description:{
    type: Sequelize.TEXT
  }

})

module.exports=Venue;
