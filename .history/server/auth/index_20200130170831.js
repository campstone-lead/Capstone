const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router
const Nylas = require('nylas')
Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET
})

const nylas = Nylas.with(process.env.ACCESS_TOKEN)
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => {
        if (err) return next(err)
        else {
          // req.session.userId = user.id
          return res.json(user)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const {firstName, lastName, email} = req.body
    const companyEmail = 'mushroomgrocery@gmail.com'
    const draft = nylas.drafts.build({
      subject: `Thanks for joining Mushroom app!`,
      to: [{name: firstName, email: companyEmail}],
      body: `Congrats on be a member of the Mushroom family ${firstName} ${lastName}!\n
      We cannot wait for you to test our app :)!\n
      `
    })

    try {
      await draft.send()
    } catch (err) {
      console.log('nylas error: ' + err)
    }
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res, next) => {
  // if(!req.session.userId)
  //   res.sendStatus(404)
  // else {
  //   try {
  //     const user = await User.findById(req.session.userId);
  //     if(user)
  //       res.json(user)
  //     else res.sendStatus(404)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  res.json(req.user)
})

router.use('/google', require('./google'))
