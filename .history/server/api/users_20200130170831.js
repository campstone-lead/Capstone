const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({})
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {id: userId}
    })
    const cart = await Order.create({
      where: {userId: userId, status: 'pending'},
      defaults: {
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        address: user.dataValues.address,
        paymentInformation: user.dataValues.paymentInformation,
        email: user.dataValues.email,
        userId: userId
      }
    })
    cart.status = 'pending'
    await cart.save()
    if (user) res.json(user)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if (user === null) {
      res.sendStatus(404)
    }
    if (req.body.oldPassword !== undefined) {
      if (user.correctPassword(req.body.oldPassword))
        await user.update(req.body)
    } else await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// Get user order history
router.get('/:userId/orderhistory', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'fulfilled'
      },
      include: [Product]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//get single order history
router.get('/orderhistory/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'fulfilled',
        id: req.params.orderId
      },
      include: [Product]
    })

    if (order !== null) {
      res.json(order)
    }
  } catch (error) {
    next(error)
  }
})

// add an order to order history
// link for guest checkout /guest/checkout
// userId for guest in orders table equals NULL
router.post('/:userId/checkout', async (req, res, next) => {
  try {
    const userId = req.params.userId
    let data = await Order.create(req.body)
    if (typeof userId === Number) data.userId = userId
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await User.destroy({
      where: {
        id: userId
      }
    })
    res.sendStatus(204).end()
  } catch (err) {
    next(err)
  }
})
