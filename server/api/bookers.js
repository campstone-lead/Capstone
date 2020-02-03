const router = require('express').Router()
const {Booker} = require('../db/models')


module.exports = router

router.get("/", async(req,res,next)=>{
  console.log('here')
  try {
    const data = await Booker.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async(req,res,next)=>{
  try {
    const data = await Booker.findByPk(req.params.id)
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
    const data = await Booker.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async(req,res,next)=>{
  try {
    const booker = await Booker.findByPk(req.params.id)
    if (!booker) {
      res.sendStatus(404)
    } else {
      await booker.update(req.body)
      res.json(booker)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async(req,res,next)=>{
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
