const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const mongoose = require('mongoose');

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

const Card = require('../models/card');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'You reached the GET cards!'
    })
})

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

router.get('/cardTest/:id', async (req, res, next) => {
    try {
        const data = await Card.findOne({codeName: req.params.id});
        if (data) {
            console.log(data);
            const img = new Buffer(data.cardImage.data, 'base64');

            // res.writeHead(200, {
            //     'Content-Type': 'image/png',
            //     'Content-Length': img.length
            // });
            res.end(img);
        }
    } catch (e) {
        console.log(e);
        send.status(500).send(e);
    }
})

router.patch('/:cardID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).json({
        message: 'Updated the card'
    })
})

router.delete('/:cardID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).send({
        message: 'You deleted a card'
    })
})



module.exports = router;