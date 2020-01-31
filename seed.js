const Sequelize = require('sequelize')
const db = require('./server/db')
const {
User, Artist
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

const artists = [
  {
    firstName: 'Ariana',
    lastName: 'Grande',
    artistName: 'Ariana Grande',
    genres: ['hip-hop', 'pop'],
    imageUrl: 'https://media1.s-nbcnews.com/j/newscms/2020_02/3182036/200111-ariana-grande-al-1627_18cb8bafa6f2b2c44d492e0c3eb428aa.fit-760w.jpg',
    zipCode: '11040',
    instagramUrl: 'https://www.instagram.com/arianagrande/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR',
    facebookUrl: 'https://www.facebook.com/arianagrande/',
    type: 'solo',
    phone: '111-222-2344',
    email: 'agrande@email.com',
    password: '123'
  }
]


const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() => 
  Promise.all(artists.map(artist => {return Artist.create({
    firstName: artist.firstName,
    lastName: artist.lastName,
    artistName: artist.artistName,
    genres: artist.genres,
    imageUrl: artist.imageUrl,
    zipCode: artist.zipCode,
    instagramUrl: artist.instagramUrl,
    spotifyUrl: artist.spotifyUrl,
    facebookUrl: artist.facebookUrl,
    type: artist.type,
    phone: artist.phone,
    email: artist.email,
    password: artist.password})})));

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
