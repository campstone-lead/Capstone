const router = require('express').Router()
const { Message, Artist, Booker } = require('../db/models')


module.exports = router

router.get("/", async (req, res, next) => {

  try {
    const data = await Message.findAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})


router.post("/", async (req, res, next) => {
  try {
    const data = await Message.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const booker = await Message.findByPk(req.params.id)
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
