const Sequelize = require('sequelize');
const db = require('./server/db');
const {
  Artist,
  Booker,
  Venue,
  User,
  ArtistEvent,
  Event,
} = require('./server/db/models');

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
  {
    firstName: 'Emma',
    lastName: 'Hartman',
    email: 'emma@email.com',
    password: '123',
    phone: '(123)-456-7777',
  },
  {
    firstName: 'Alina',
    lastName: 'Davletshina',
    email: 'alina@email.com',
    password: '123',
    phone: '(123)-456-7777',
  },
];

const artists = [
  {
    firstName: 'Ariana',
    lastName: 'Grande',
    name: 'Ariana Grande',
    genres: ['hipHop', 'pop'],
    bio:
      "Ariana was born on June 26, 1993 in Boca Raton, Florida. Ariana's music career began in 2011 with the soundtrack Music from Victorious. In 2013, she released her first studio album Yours Truly, which entered atop the US Billboard 200. The album's lead single, The Way, opened in the top 10 of the Billboard Hot 100, with critics comparing her wide vocal range to that of Mariah Carey.",
    imageURL:
      'https://media1.s-nbcnews.com/j/newscms/2020_02/3182036/200111-ariana-grande-al-1627_18cb8bafa6f2b2c44d492e0c3eb428aa.fit-760w.jpg',
    zipCode: '11375',
    instagramUrl: 'https://www.instagram.com/arianagrande/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR',
    facebookUrl: 'https://www.facebook.com/arianagrande/',
    type: 'solo',
    phone: '111-222-2344',
    email: 'agrande@email.com',
    password: '123',
  },
  {
    firstName: 'Justin',
    lastName: 'Vernon',
    name: 'Bon Iver',
    genres: ['indie', 'electronic'],
    bio:
      'Justin DeYarmond Edison Vernon (born April 30, 1981) is an American singer, songwriter, producer and multi-instrumentalist. He is best known as the primary songwriter and frontman of indie folk band Bon Iver. Vernon is also a member of the bands Volcano Choir, Big Red Machine, The Shouting Matches, and Gayngs.',
    imageURL:
      'https://mediad.publicbroadcasting.net/p/shared/npr/styles/x_large/nprshared/201906/729221164.jpg',
    zipCode: '10002',
    instagramUrl: 'https://www.instagram.com/boniver/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/4LEiUm1SRbFMgfqnQTwUbQ',
    facebookUrl: 'https://www.facebook.com/boniverwi/',
    type: 'solo',
    phone: '122-232-2354',
    email: 'boniver@email.com',
    password: '123',
  },

  {
    firstName: 'Claire',
    lastName: 'Boucher',
    name: 'Grimes',
    genres: ['electronic'],
    bio:
      'Claire Elise Boucher (born March 17, 1988), known professionally as Grimes, is a Canadian singer, songwriter, record producer and visual artist. Her music incorporates elements of varied styles and genres including dream pop, R&B, electronic music, and hip hop.',
    imageURL:
      'https://www.billboard.com/files/styles/article_main_image/public/media/02-grimes-2018-press-cr-eli-russell-linnetz-billboard-1548.jpg',
    zipCode: '11237',
    instagramUrl: 'https://www.instagram.com/grimes/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/053q0ukIDRgzwTr4vNSwab',
    facebookUrl: 'https://www.facebook.com/actuallygrimes/',
    type: 'solo',
    phone: '222-222-2222',
    email: 'grimes@email.com',
    password: '123',
  },

  {
    firstName: 'Mick',
    lastName: 'Jagger',
    name: 'The Rolling Stones',
    genres: ['rock'],
    bio:
      'Singer, songwriter, actor and producer Michael Phillip Jagger was born on July 26, 1943, in Dartford, England. As the lead singer of the Rolling Stones, Mick Jagger has become a rock legend known for his gritty, blues-influenced songs and charismatic stage presence.',
    imageURL:
      'https://i.scdn.co/image/4226d2bbee2c44866eb0db3c88da0f26d7d12d5d',
    zipCode: '10005',
    instagramUrl: 'https://www.instagram.com/therollingstones/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe',
    facebookUrl: 'https://www.facebook.com/therollingstones/',
    type: 'band',
    phone: '111-111-1111',
    email: 'therollingstones@email.com',
    password: '123',
  },
  {
    firstName: 'James',
    lastName: 'Murphy',
    name: 'LCD Soundsystem',
    genres: ['indie', 'rock', 'electronic'],
    bio:
      'James Jeremiah Murphy (born February 4, 1970) is an American musician, DJ, singer, songwriter, and record producer. His most well-known musical project is LCD Soundsystem, which first gained attention with its single "Losing My Edge" in 2002 before releasing its eponymous debut album in February 2005',
    imageURL:
      'https://s3.amazonaws.com/quietus_production/images/articles/19494/LCD_1451995213_crop_550x407.jpg',
    zipCode: '10128',
    instagramUrl: 'https://www.instagram.com/lcdsoundsystem/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/066X20Nz7iquqkkCW6Jxy6',
    facebookUrl: 'https://www.facebook.com/lcdsoundsystem/',
    type: 'band',
    phone: '333-333-3333',
    email: 'lcdsoundsystem@email.com',
    password: '123',
  },
  {
    firstName: 'Armand',
    lastName: 'Jakobsson',
    name: 'DJ Seinfeld',
    genres: ['house', 'electronic'],
    bio:
      'Armand Jakobsson is the artist known as DJ Seinfeld, Rimbaudian and Birds of Sweden. Under these aliases you’ll find sweeping emotive cuts, verdant dancefloor workouts and discerning dips into jungle and breaks.',
    imageURL:
      'https://www.electronicbeats.net/app/uploads/2019/05/dj-seinfeld.png',
    zipCode: '11378',
    instagramUrl: 'https://www.instagram.com/dj_seinfeld/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/37YzpfBeFju8QRZ3g0Ha1Q',
    facebookUrl: 'https://www.facebook.com/djseinfeld/',
    type: 'dj',
    phone: '444-444-3333',
    email: 'djseinfeld@email.com',
    password: '123',
  },

  {
    firstName: 'Amelie',
    lastName: 'Lens',
    name: 'Amelie Lens',
    genres: ['techno', 'electronic'],
    bio:
      'Amelie Lens (born 31 May 1990) is a Belgian electronic music DJ, record producer, and co-owner of the Lenske record label.',
    imageURL:
      'https://vibemylife.com/wp-content/uploads/2019/04/Amelie-Lens-festival-hero-2018.jpg',
    zipCode: '11102',
    instagramUrl: 'https://www.instagram.com/amelie_lens/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/5Ho1vKl1Uz8bJlk4vbmvmf',
    facebookUrl: 'https://www.facebook.com/amelielensmusic/',
    type: 'dj',
    phone: '555-333-3333',
    email: 'amelielens@email.com',
    password: '123',
  },
  {
    firstName: 'Aubrey',
    lastName: 'Graham',
    name: 'Drake',
    genres: ['hipHop'],
    bio:
      'Aubrey Drake Graham (born October 24, 1986) is a Canadian rapper, singer, songwriter, producer, actor, and businessman. Drake initially gained recognition as an actor on the teen drama television series Degrassi: The Next Generation in the 2000s',
    imageURL:
      'https://cdn.vox-cdn.com/thumbor/dAx11qWXIswLgC24XcRHSPDRaMU=/0x0:1080x1350/1200x800/filters:focal(314x139:486x311)/cdn.vox-cdn.com/uploads/chorus_image/image/65075970/z25ftqghbyb5zd10wmvd.0.jpg',
    zipCode: '11237',
    instagramUrl: 'https://www.instagram.com/champagnepapi/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4',
    facebookUrl: 'https://www.facebook.com/Drake/',
    type: 'solo',
    phone: '555-344-3433',
    email: 'drake@email.com',
    password: '123',
  },
  {
    firstName: 'Robyn',
    lastName: 'Fenty',
    name: 'Rihanna',
    genres: ['hipHop', 'pop'],
    bio:
      'Robyn Rihanna Fenty is a Barbadian singer, songwriter, and businesswoman, who has been recognized for embracing various musical styles and reinventing her image throughout her career.',
    imageURL: 'https://pbs.twimg.com/media/D_y_cTGU8AEHJAI.jpg',
    zipCode: '11211',
    instagramUrl: 'https://www.instagram.com/badgalriri/?hl=en',
    spotifyUrl: 'https://open.spotify.com/artist/5pKCCKE2ajJHZ9KAiaK11H',
    facebookUrl: 'https://www.facebook.com/rihanna/',
    type: 'solo',
    phone: '666-364-6633',
    email: 'rihanna@email.com',
    password: '123',
  },
];

const venues = [
  {
    name: 'Grace Hopper',
    genres: ['pop', 'hipHop'],
    address: 'Hanover Square floor 25, New York, NY 10004',
    description: 'Party time!',
    imageURL:
      'https://42floors.com/images/H7e12c12a6a7af0b60c0d4d4f0b342c8ab6ee5cecS780x520W0seB505153O/5497bbaa0dc21e8fcb877b00128d3e911d692c20',
    capacity: 100,
    bookerId: 2,
  },
  {
    name: 'The Bowery Ballroom',
    genres: ['pop', 'electronic', 'rock', 'metal', 'country', 'hipHop'],
    address: '6 Delancey St, New York, NY 10002',
    description: 'hip concert venue for hip people',
    imageURL:
      'https://mavenprodcontent.blob.core.windows.net/media/BoweryBallroom/Private%20Events/Bowery_Interiors_v.2-1.jpg',
    capacity: 500,
    bookerId: 1,
  },
  {
    name: 'Elsewhere',
    genres: ['indie', 'house', 'electronic', 'rock', 'hipHop'],
    address: '599 Johnson Ave #1, New York, NY 11237',
    description:
      'Best venue in all of Brooklyn. We love to feature diverse, underground acts',
    imageURL:
      'https://media-cdn.tripadvisor.com/media/photo-s/15/0e/f3/c3/elsewhere-courtyard.jpg',
    capacity: 1500,
    bookerId: 1,
  },
  {
    name: 'Basement NY',
    genres: ['techno'],
    address: '52-19 Flushing Ave, Queens, NY, 11378',
    description: 'Showcasing top techno talents from all around the world',
    imageURL:
      'https://www.discotech.me/wp-content/uploads/2019/11/basementny2-1030x686.jpg',
    capacity: 2000,
    bookerId: 1,
  },
  {
    name: 'Mood Ring',
    genres: ['house', 'electronic', 'techno'],
    address: '1260 Myrtle Ave, Brooklyn, NY 11221',
    description: 'dimly lit bar featuring Djs and astrology-inspired cocktails',
    imageURL: 'https://media.timeout.com/images/104089109/630/472/image.jpg',
    capacity: 100,
    bookerId: 1,
  },
  {
    name: 'The Mercury Lounge',
    genres: ['indie', 'rock', 'pop', 'hipHop'],
    address: '217 E Houston St, New York, NY 10002',
    description: 'cozy, intimate space for up and coming artists!',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/WSTM_Team_Dustizeff_0082.jpg',
    capacity: 300,
    bookerId: 2,
  },
  {
    name: 'Blue Note Jazz Club',
    genres: ['jazz'],
    address: '131 W 3rd St, New York, NY, 10012',
    description: 'legendary jazz musicians play here!',
    imageURL:
      'https://i.pinimg.com/originals/e7/c9/b9/e7c9b935700d409a2999a587b44e28d9.jpg',
    capacity: 300,
    bookerId: 2,
  },
  {
    name: 'Petes Candy Store',
    genres: ['rock', 'indie', 'country', 'metal'],
    address: '709 Lorimer St, Brooklyn, NY, 11211',
    description: 'An offbeat watering hole featuring lots of live bands',
    imageURL:
      'https://www.sachynmital.com/wp-content/uploads/2016/08/blog_theladles_05.jpg',
    capacity: 50,
    bookerId: 1,
  },
];

const artistEvent = [
  {
    artistId: 3,
    eventId: 2,
    status: 'booked',
    sender: 'booker',
  },
  {
    artistId: 4,
    eventId: 1,
    sender: 'booker',
  },
  {
    artistId: 6,
    eventId: 3,
    status: 'pending',
    sender: 'artist',
  },
];

const events = [
  {
    name: 'Friday Night Rock',
    description: 'Friday Night Rock is looking for two rock bands to play this Friday night. Come rock with us!',
    date: new Date('May 11, 2020 22:30:00 UTC'),
    venueId: 2,
  },
  {
    name: 'Boss Lady',
    description: 'In need of two techno artists or bands!!! ',
    venueId: 4,
    date: new Date('April 21, 2020 20:30:00 UTC'),
  },
  {
    name: 'Saturday Late Night Party',
    description: "Looking for at least two DJs.",
    date: new Date('May 03, 2020 22:30:00 UTC'),
    venueId: 5,
  },
];
const seed = () =>
  Promise.all(bookers.map(booker => Booker.create(booker))).then(() =>
    Promise.all(artists.map(artist => Artist.create(artist))).then(() =>
      Promise.all(venues.map(venue => Venue.create(venue))).then(() =>
        Promise.all(events.map(event => Event.create(event))).then(() =>
          Promise.all(
            artistEvent.map(artistEvent1 => ArtistEvent.create(artistEvent1))
          )
        )
      )
    )
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};
main();
