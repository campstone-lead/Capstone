const router = require('express').Router()
const { Booker, Venue, Event } = require('../db/models')


module.exports = router

router.get("/", async (req, res, next) => {

  try {
    const data = await Booker.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Booker.findByPk(req.params.id)
    if (!data) {
      res.sendStatus(404)
    } else {
      let venues = await Venue.findAll({ where: { bookerId: data.id } })
      res.json({ user: data, venues: venues })
    }
  } catch (error) {
    next(error)
  }
})
router.get("/:id/events", async (req, res, next) => {
  try {
    const data = await Event.findAll({ where: { bookerId: req.params.id } })

    res.json(data)

  } catch (error) {
    next(error)
  }
})
router.post("/", async (req, res, next) => {
  try {
    const data = await Booker.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/", async (req, res, next) => {
  try {
    if (req.user.status === "booker") {
      const booker = await Booker.findByPk(req.user.id)
      if (!booker) {
        res.sendStatus(404)
      } else {
        await booker.update(req.body)
        res.json(booker)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const booker = await Booker.findByPk(req.params.id)
    if (!booker) {
      res.sendStatus(404)
    } else {
      await booker.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
