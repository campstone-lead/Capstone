const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const cors = require('cors')

var multer = require('multer')
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.email))

passport.deserializeUser(async (email, done) => {
  try {
    let user = await db.models.booker.findOne({ where: { email: email } })
    if (user == null) {
      user = await db.models.artist.findOne({ where: { email: email } })
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())
  const config = {
    // origin: 'http://localhost:8100',
    origin: 'https://harmonious-capstone.herokuapp.com/',
    credentials: true,
  };
  app.use(cors(config));
  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))
  //multer
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage }).single('file')

  app.post('/upload', (req, res, next) => {

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      console.log(req.file)
      return res.status(200).send(req.file)

    })

  });

  const entryPath = (process.env.NODE_ENV === 'development' ? 'public' : 'build')

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', entryPath)))
  // app.use(express.static(path.join(__dirname, '..', 'public')))
  //FOR DEPLOYMENT
  // app.use(express.static(path.join(__dirname, '..', 'build')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', entryPath, '/index.html'))
    // res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    //FOR DEPLOYMENT
    // res.sendFile(path.join(__dirname, '..', 'build/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  // io.origins('http://localhost:8080')

  require('./socket')(io)

}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
