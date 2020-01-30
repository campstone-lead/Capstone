const Sequelize = require('sequelize')
const db = require('./server/db')
const {
User
} = require('./server/db/models')

const users = [
  {
    firstName: 'Liana',
    status: 'admin',
    lastName: 'Chan',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'liana.andreea97@yahoo.com',
    password: '123',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  },
]
const seed = () =>
  Promise.all(users.map(user => User.create(user)));
//   )
// )

// .then(() =>
//   // Promise.all(orders.map(order => Order.create(order))).then(() =>
//     Promise.all(productOrder.map(po => ProductOrder.create(po)))
//   )
// )
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
