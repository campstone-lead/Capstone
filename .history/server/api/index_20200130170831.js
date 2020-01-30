const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/users', require('./cart'))
router.use('/products', require('./products'))
router.use('/products/filter', require('./filter'))
router.use('/recipies', require('./recipe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
