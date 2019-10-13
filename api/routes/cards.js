const express = require('express');
const router = express.Router();

//Loads card model
const Card = require('../models/card');


//Setups multer for card image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.codeName + '.jpg');
    }
})
const upload = multer({
    storage: storage
})


//Uploads new card
router.post('/', upload.single('cardImage'), async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const card = new Card({
        name: req.body.name,
        series: req.body.series,
        number: req.body.number,
        rarity: req.body.rarity,
        codeName: req.body.codeName,
        variant: req.body.variant,
        imagePath: req.file.path
    })
    try {
        await card.save();
        res.status(201).send(card);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

//Returns card with specific cardID
router.get('/:cardID', async (req, res, next) => {
    try {
        const card = await Card.findOne({codeName: req.params.cardID});
        if (card) {
            return res.status(200).send(card);
        }
        res.status(404).send('Could not locate card')
    } catch (e) {
        console.log(e);
        send.status(500).send(e);
    }
})

//Route placeholder to update card
router.patch('/:cardID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).json({
        message: 'Selected card has been updated'
    })
})

//Route placeholder to delete card
router.delete('/:cardID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).send({
        message: 'Selected card has been deleted'
    })
})



module.exports = router;