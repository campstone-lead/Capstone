/* global describe beforeEach it */

const { expect } = require('chai')

const db = require('../db')
const app = require('../index')
const { Booker, Artist, Venue, Event, Recommendation, ArtistEvent, Message } = require('../db/models')
const agent = require('supertest')(app)




describe('API routes', () => {
  beforeEach(async () => {
    db.sync({ force: true })
  })

  describe('Booker Routes', () => {
    const bookers = [
      {
        firstName: 'Liana',
        lastName: 'Chan',
        email: 'liana.andreea97@yahoo.com',
        password: '123',
        phone: '(929)-308-8477',
      },
      {
        firstName: 'Ariana',
        lastName: 'Hwang',
        email: 'ariana@email.com',
        password: '123',
        phone: '(111)-323-9021',
      },
    ];

    const lianaVenues = [
      {
        name: 'The Bowery Ballroom',
        genres: ['indie', 'electronic', 'rock', 'metal', 'country', 'hipHop', 'pop'],
        address: '6 Delancey St, New York, NY 10002',
        description: 'hip concert venue for hip people',
        imageURL:
          'https://mavenprodcontent.blob.core.windows.net/media/BoweryBallroom/Private%20Events/Bowery_Interiors_v.2-1.jpg',
        capacity: 500,
      },
      {
        name: 'Petes Candy Store',
        genres: ['rock', 'indie', 'country', 'metal'],
        address: '709 Lorimer St, Brooklyn, NY, 11211',
        description: 'An offbeat watering hole featuring lots of live bands',
        imageURL:
          'https://www.sachynmital.com/wp-content/uploads/2016/08/blog_theladles_05.jpg',
        capacity: 50,
      },
    ]

    const arianaVenues = [

      {
        name: 'The Mercury Lounge',
        genres: ['indie', 'rock', 'pop', 'hipHop'],
        address: '217 E Houston St, New York, NY 10002',
        description: 'cozy, intimate space for up and coming artists!',
        imageURL:
          'https://upload.wikimedia.org/wikipedia/commons/3/38/WSTM_Team_Dustizeff_0082.jpg',
        capacity: 300,
      }
    ];

    const events = [
      {
        name: 'Friday Night Rock',
        description: 'Friday Night Rock needs two rock bands.',
        date: new Date('May 11, 2020 22:30:00 UTC'),
        // venueId: 1,
        // bowery ball
      },
      {
        name: 'Boss Lady',
        description: 'In need of a indie rock band!!! ',
        date: new Date('April 21, 2020 20:30:00 UTC'),
        // venueId: 2,
        // petes candy
      },
      {
        name: 'Saturday Late Night Party',
        description: "Looking for at least two DJs.",
        date: new Date('May 03, 2020 22:30:00 UTC'),
        // venueId: 3,
        // mercury
      },
    ]

    const venueIdsForEvents = [1, 2, 3]
    beforeEach(async () => {
      // await Booker.bulkCreate(bookers)
      let createdBookers = []
      let newBooker;
      for (let i = 0; i < bookers.length; i++) {
        newBooker = await Booker.create(bookers[i])
        createdBookers.push(newBooker)
      }
      let createdVenues = []
      let newVenue;
      for (let i = 0; i < lianaVenues.length; i++) {
        newVenue = await Venue.create(lianaVenues[i])
        await newVenue.setBooker(createdBookers[0]) //liana
        createdVenues.push(newVenue)
      }
      for (let i = 0; i < arianaVenues.length; i++) {
        newVenue = await Venue.create(arianaVenues[i])
        await newVenue.setBooker(createdBookers[1]) //ariana
        createdVenues.push(newVenue)
      }
      // let createdEvents = []
      // let newEvent;
      // for (let i = 0; i < events.length; i++) {
      //   newEvent = await Event.create(events[i])
      //   await newEvent.update({ venueId: createdVenues[venueIdsForEvents[i] - 1].id })
      //   createdEvents.push(newEvent)
      // }
    })

    it('GET /api/bookers', async () => {
      const res = await agent.get('/api/bookers/').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].firstName).to.be.equal('Liana')
    })
    it('GET /api/bookers/:id', async () => {
      const res = await agent.get('/api/bookers/2').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.user.lastName).to.be.equal('Hwang')
    })
    xit('GET /api/bookers/:id/events', async () => {
      const res = await agent.get('/api/bookers/2/events').expect(200)
      expect(res.body).to.have.length(1)
      expect(res.body[0].name).to.be.equal('Saturday Late Night Party')
    })
    xit('POST /api/bookers/', async () => {
      const newBooker = {
        firstName: 'Emma',
        lastName: 'Hartman',
        email: 'emma@email.com',
        password: '123',
        phone: '(123)-456-7777',
      }
      const res = await agent.post('/api/bookers/').send(newBooker).expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal('emma@email.com')
    })
  })

  xdescribe('User Routes', () => {
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
      {
        firstName: 'Celia',
        lastName: 'Macrae',
        status: 'user',
        address: '309 E 52nd St., New York, NY 10022',
        email: 'celiamacrae@gmail.com',
        password: '123',
        imageURL:
          'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
      }
    ]

    beforeEach(async () => {
      await User.bulkCreate(users)
    })

    it('GET /api/users', async () => {
      const res = await agent.get('/api/users/').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].firstName).to.be.equal('Liana')
    })
    it('GET /api/users/:id', async () => {
      const res = await agent.get('/api/users/2').expect(200)

      expect(res.body.firstName).to.be.equal('Celia')
    })
    it('DELETE /api/users/:id', async () => {
      await agent.delete('/api/users/1').expect(204)
      const allProducts = await agent.get('/api/users')
      expect(allProducts.body).to.have.length(1)
    })
  })

  xdescribe('Recepies routes', () => {
    const recipies = [
      {
        id: 1,
        name: 'Onion and mushrooms omelette',
        description:
          'Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten, then set aside.',
        imageURL:
          'https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg'
      }
    ]

    beforeEach(async () => {
      await Recipe.bulkCreate(recipies)
    })

    it('GET /api/recipies', async () => {
      const res = await agent.get('/api/recipies').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Onion and mushrooms omelette')
    })
  })
})
