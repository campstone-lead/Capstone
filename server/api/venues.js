const router = require('express').Router()
const fetch = require('node-fetch')
const { Venue } = require('../db/models')
const { Artist } = require('../db/models')
const { Recommendation } = require('../db/models')

const googleMapsApiKey = require('../../secrets')

// var googleMapsClient = require('@google/maps').createClient({
//   key: googleMapsApiKey
// });

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const data = await Venue.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

function makeLatLngList(rows) {
  let locations = rows.map((row) => row.latitude.toString().concat(",", row.longitude.toString()))
  return locations.join("|")
}

//is it RESTful to put this in here?? --Emma
router.get("/distance/:artistId", async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId)
    // const artist = await Artist.findByPk(req.user.id) //will it know if this is an artist or a booker? Talk to Liana --Emma
    const venues = await Venue.findAll()
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${artist.latitude},${artist.longitude}&destinations=${makeLatLngList(venues)}&mode=transit&key=${googleMapsApiKey}`);
    const data = await response.json()
    // let result = await artist.addVenue(venues[0])
    venues.forEach(async (venue, index) => {
      let [result, created] = await Recommendation.findOrCreate({
        where: {
          venueId: venue.id,
          artistId: artist.id,
        }
      })
      await result.update({ score: parseFloat(data.rows[0].elements[index].distance.text) })
    })

    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Venue.findByPk(req.params.id)
    if (!data) {
      res.sendStatus(404)
    } else {
      res.json(data)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const data = await Venue.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const venue = await Venue.findByPk(req.params.id)
    if (!venue) {
      res.sendStatus(404)
    } else {
      await venue.update(req.body)
      res.json(venue)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const venue = await Venue.findByPk(req.params.id)
    if (!venue) {
      res.sendStatus(404)
    } else {
      await venue.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
