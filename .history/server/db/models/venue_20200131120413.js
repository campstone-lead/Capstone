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
  },
  genres:{
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      notEmpty: true,
      len:[2,20]
    }
  }

})

module.exports=Venue;
