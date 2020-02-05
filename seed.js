const Sequelize = require('sequelize')
const db = require('./server/db')
const { Artist, Booker, Venue, User } = require('./server/db/models')



const bookers = [
  {
    firstName: 'Liana',
    lastName: 'Chan',
    email: 'liana.andreea97@yahoo.com',
    password: '123',
    genres: ['pop', 'hip-hop'],
    phone: '(929)-308-8477',
  }
]

const artists = [
  {
    firstName: 'Ariana',
    lastName: 'Grande',
    artistName: 'Ariana Grande',
    genres: ['hipHop', 'pop'],
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

// const venues = [
//   {
//     name: 'Grace Hopper',
//     genres: ['pop', 'hip-hop', 'rock', 'R&B'],
//     // latitude: '40.705086',
//     // longitude: '-74.009151',
//     address: 'Hanover Square floor 25, New York, NY 10004',
//     description: "Party time!",
//     capacity: 100,
//     bookerId: 1
//   }
// ]

const venues = [
  {
    name: 'Grace Hopper',
    genres: ['pop', 'hipHop'],
    // latitude: '40.705086',
    // longitude: '-74.009151',
    address: 'Hanover Square floor 25, New York, NY 10004',
    description: "Party time!",
    capacity: 100,
    bookerId: 1
  },
  {
    name: 'The Bowery Ballroom',
    genres: ['pop', 'electronic', 'rock', 'metal', 'country', 'hipHop'],
    // latitude: '40.7204065',
    // longitude: '-73.995547',
    address: '6 Delancey St, New York, NY 10002',
    description: "hip concert venue for hip people",
    capacity: 500,
    bookerId: 1
  },
  {
    name: 'Elsewhere',
    genres: ['indie', 'house', 'electronic', 'rock', 'hipHop'],
    // latitude: '40.709566',
    // longitude: '-73.9231158',
    address: '599 Johnson Ave #1, New York, NY 11237',
    description: "Best venue in all of Brooklyn. We love to feature diverse, underground acts",
    capacity: 1500,
    bookerId: 1
  },
  {
    name: 'Basement NY',
    genres: ['techno'],
    // latitude: '40.716140',
    // longitude: '-73.914207',
    address: '52-19 Flushing Ave, Queens, NY, 11378',
    description: "Showcasing top techno talents from all around the world",
    capacity: 2000,
    bookerId: 1
  },
  {
    name: 'Mood Ring',
    genres: ['house', 'electronic', 'techno'],
    // latitude: '40.6977778',
    // longitude: '-73.9291331',
    address: '1260 Myrtle Ave, Brooklyn, NY 11221',
    description: "dimly lit bar featuring Djs and astrology-inspired cocktails",
    capacity: 100,
    bookerId: 1
  },
  {
    name: 'The Mercury Lounge',
    genres: ['indie', 'rock', 'pop', 'hipHop'],
    // latitude: '40.722184',
    // longitude: '-73.986767',
    address: '217 E Houston St, New York, NY 10002',
    description: "cozy, intimate space for up and coming artists!",
    capacity: 300,
    bookerId: 1
  },
  {
    name: 'Blue Note Jazz Club',
    genres: ['jazz'],
    // latitude: '40.7309083',
    // longitude: '-74.0028444',
    address: '131 W 3rd St, New York, NY, 10012',
    description: "legendary jazz musicians play here!",
    capacity: 300,
    bookerId: 1
  },
  {
    name: 'Petes Candy Store',
    genres: ['rock', 'indie', 'country', 'metal'],
    // latitude: '40.718099',
    // longitude: '-73.9523817',
    address: '709 Lorimer St, Brooklyn, NY, 11211',
    description: "An offbeat watering hole featuring lots of live bands",
    capacity: 50,
    bookerId: 1
  },
]

const user = [
  {
    firstName: 'guest',
    status: 'user',
    lastName: 'guest',
    address: '',
    email: 'guest@yahoo.com',
    password: '123',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  }
]
const seed = () =>
  Promise.all(bookers.map(booker => Booker.create(booker))).then(() =>
    Promise.all(artists.map(artist => Artist.create(artist))).then(() =>
      Promise.all(venues.map(venue => Venue.create(venue))).then(() =>
        Promise.all(user.map(venue => User.create(venue)))
      )))


// const seed = () =>
//   Promise.all(bookers.map(booker => Booker.create(booker))).then(() =>
//     Promise.all(venues.map(venue => Venue.create(venue))).then(() =>
//       Promise.all(artists.map(artist => {
//         return Artist.create({
//           firstName: artist.firstName,
//           lastName: artist.lastName,
//           artistName: artist.artistName,
//           genres: artist.genres,
//           imageUrl: artist.imageUrl,
//           zipCode: artist.zipCode,
//           instagramUrl: artist.instagramUrl,
//           spotifyUrl: artist.spotifyUrl,
//           facebookUrl: artist.facebookUrl,
//           type: artist.type,
//           phone: artist.phone,
//           email: artist.email,
//           password: artist.password
//         })
//       })).then(() =>
//         Promise.all(user.map(venue => User.create(venue))))))


const main = () => {
  console.log('Syncing db...')
  db
    .sync({ force: true })
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
