const router = require('express').Router()
const { Event, Venue, Booker, Artist, ArtistEvent } = require('../db/models')


module.exports = router

router.get("/", async (req, res, next) => {
  console.log(req.session)
  try {
    const data = await Event.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Event.findByPk(req.params.id)
    if (!data) {
      res.sendStatus(404)
    } else {
      const artistsIds = await ArtistEvent.findAll(
        { where: { eventId: data.id } })
      res.json({ artists: artistsIds, event: data })
    }
  } catch (error) {
    next(error)
  }
})

router.post("/connection", async (req, res, next) => {
  try {
    const data = await ArtistEvent.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/connection/:id", async (req, res, next) => {
  try {
    const connection = await ArtistEvent.findByPk(req.params.id)
    if (!Event) {
      res.sendStatus(404)
    } else {
      await connection.update(req.body)
      res.json(connection)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const data = await Event.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    if (!Event) {
      res.sendStatus(404)
    } else {
      const updatedEvent = await event.update(req.body)
      res.json(updatedEvent)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    if (!event) {
      res.sendStatus(404)
    } else {
      await event.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
