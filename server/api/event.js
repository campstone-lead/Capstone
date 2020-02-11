const router = require('express').Router()
const { Event, Venue, Booker, Artist, ArtistEvent } = require('../db/models')


module.exports = router

router.get("/", async (req, res, next) => {

  try {
    const data = await Event.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Event.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Venue
        }
      ]
    })
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

    const connection = await ArtistEvent.create(req.body)
    res.json(connection)
  } catch (error) {
    next(error)
  }
})

router.put("/connection/update", async (req, res, next) => {
  try {
    const eventId = req.body.eventId;
    const artistId = req.body.artistId;
    const status = req.body.status;
    const connection = await ArtistEvent.findOne({
      where: {
        artistId: artistId,
        eventId: eventId,
      }
    })
    if (!connection) {
      res.sendStatus(404)
    } else {
      await connection.update({ status: status })
      res.json(connection)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const event = await Event.create(req.body.event)
    const venue = await Venue.findByPk(req.body.currentVenue)
    event.setVenue(venue)
    //the below needs to be changed - this information shouldn't have to be reset in this way. We could put it in a hook maybe, but even then it would be a problem if someone updates the address, name, etc of the venue. The database can't do it's fancy normalizing if we leave it like this :( should update later. --Emma
    event.update({
      venueName: venue.name,
      location: venue.address,
      genres: venue.genres,
      bookerId: venue.bookerId
    })
    res.json(event)
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
      await event.update(req.body)
      res.json(event)
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
