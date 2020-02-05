const router = require('express').Router()
const Booker = require('../db/models/booker')
module.exports = router
const db = require('../db')
router.post('/login', async (req, res, next) => {
  try {
    const user = await Booker.findOne({where: {email: req.body.email}})
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
    const user = await Booker.create(req.body)
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
  console.log(req.session)
  const resp=await db.models.Session.findAll();
  resp.forEach((el)=>{
    console.log(JSON.parse(el.dataValues.data.passport))
  })

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
