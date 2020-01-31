const router = require('express').Router()
const {Venue} = require('../db/models')


module.exports = router

router.get("/", async(req,res,next)=>{
  try {
    const data = await Venue.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async(req,res,next)=>{
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

router.post("/", async(req,res,next)=>{
  try {
    const data = await Venue.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async(req,res,next)=>{
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

router.delete("/:id", async(req,res,next)=>{
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
