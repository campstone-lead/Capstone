const Sequelize = require('sequelize')
const db = require('./server/db')
const {
Artist,
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

const venues = [
  {
    name: 'Grace Hopper',
    genres:['pop','hip-hop','rock','R&B'],
    latitude: '40.705086',
    longitude: '-74.009151',
    address: 'Hanover Square floor 25, New York, NY 10004',
    description:"Party time!",
    capacity:100,
    bookerId:1
  }
]


const seed = () =>
  Promise.all(bookers.map(booker => Booker.create(booker))).then(() =>
  Promise.all(venues.map(venue => Venue.create(venue))).then(() =>
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
    password: artist.password})}))))



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
