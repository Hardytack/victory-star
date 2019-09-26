const express = require('express');
const router = express.Router();

const Cards = require('../models/card')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'You reached the GET sets!'
    })
})

router.get('/imageTest', (req, res) => {
    
})

router.post('/', (req, res, next) => {
    const set = {
        name: req.body.name,
        code: req.body.code
    }
    res.status(200).json({
        message: 'You reached the POST sets!',
        created: set
    })
})

router.get('/:setID', async (req, res) => {
    try {
        const code = req.params.setID.split('+').join(' ');
        const cards =  await Cards.find({series: code});
        if (!cards == []) {
            const newCards = cards.map((card) => {
                return card.name
            })
            return res.send(newCards);
        }
        console.log(cards)
        res.send('Could not find any cards')
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

router.patch('/:setID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).json({
        message: 'Updated the set'
    })
})

router.delete('/:setID', (req, res, next) => {
    const id = req.params.cardID;
    res.status(200).send({
        message: 'You deleted a set'
    })
})



module.exports = router;