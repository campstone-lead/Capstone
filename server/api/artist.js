const router = require('express').Router()
const Artist = require('../db/models/artist')

module.exports = router

router.get("/", async (req,res,next)=>{
    try{
    const artists = await Artist.findAll();
    res.json(artists)

    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res, next) => {
    try{
        console.log('HERE')
        const artist = await Artist.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            artistName: req.body.artistName,
            genres: req.body.genres,
            bio: req.body.bio,
            imageUrl: req.body.imageUrl,
            zipCode: req.body.zipCode,
            instagramUrl: req.body.instagramUrl,
            spotifyUrl: req.body.spotifyUrl,
            facebookUrl: req.body.facebookUrl,
            type: req.body.type,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        })
        res.sendStatus(201)

    }catch(error){
        console.log('HERE AFTER')
        next(error)
    }
})
