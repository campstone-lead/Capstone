const Sequelize = require('sequelize')
const db = require('./server/db')
const {
Booker,Venue
} = require('./server/db/models')



const bookers = [
  {
    firstName: 'Liana',
    lastName: 'Chan',
    email: 'liana.andreea97@yahoo.com',
    password: '123',
    genres:['pop','hip-hop'],
    phone:'(929)-308-8477',
  }
]
// latitude: '40.705086',
//     longitude: '-74.009151',
//     address: 'Hanover Square floor 25, New York, NY 10004'
const seed = () =>
  Promise.all(bookers.map(booker => Booker.create(booker)));

const main = () => {
  console.log('Syncing db...')
  db
    .sync({force: true})
    .then(() => {
      console.log('Seeding databse...')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}
main()
