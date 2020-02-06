const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/bookers', require('./bookers'))
router.use('/artists', require('./artist'))
router.use('/venues', require('./venues'))
router.use('/events', require('./event'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
