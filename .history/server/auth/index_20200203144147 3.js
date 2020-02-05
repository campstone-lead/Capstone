const router = require('express').Router()
const Booker = require('../db/models/booker')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const booker = await Booker.findOne({where: {email: req.body.email}})
    if (!booker) {
      console.log('No such booker found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!booker.correctPassword(req.body.password)) {
      console.log('Incorrect password for booker:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(booker, err => {
        if (err) return next(err)
        else {
          return res.json(booker)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const booker = await Booker.create(req.body)
    req.login(booker, err => (err ? next(err) : res.json(booker)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Booker already exists')
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
  console.log(req.session.id,req.session)
  //  if(!req.session.userId)
  //   res.sendStatus(404)
  // else {
  //   try {
  //     const user = await Booker.findById(req.session.userId);
  //     if(user)
  //       res.json(user)
  //     else res.sendStatus(404)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  res.json({})
})

router.use('/google', require('./google'))
