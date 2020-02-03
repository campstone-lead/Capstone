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
    // validate: {
    //   notEmpty: true
    // }
  },
  imageURL: {
    type: Sequelize.STRING,
    validate:{
      isUrl:true
    },
    defaultValue:'https://www.mycustomer.com/sites/all/themes/pp/img/default-user.png'
  },
  capacity:{
    type:Sequelize.INTEGER,
    allowNull:false,
    validate:{
      notEmpty:true,
      min:1
    }
  }
})

module.exports=Venue;
