const express = require('express');
const path = require('path');
const Review = require('../models/reviews');
const db  = require('../util/databse');

const router = express.Router();

router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/rating', (req, res) => {
    const name = req.body.name;
    const pro = req.body.pro;
    const con = req.body.con;
    const rating = req.body.rating;
    const review = new Review(null, name, pro, con, rating);
    review.save().then(result =>{
        res.send('Data Submitted');
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/search', (req, res) => {
    const companyName = req.query.name;
    Promise.all([Review.findByName(companyName), Review.getRating(companyName)])
    .then(result => {
        if(result.length === 0){
            return res.status(404).json({ message: 'No reviews found for this company' });
        }
        const reviews = result[0][0];
        const rating = result[1][0][0].Rating;


        res.json({
            company: companyName,
            averageRating: rating,
            reviews: reviews
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    });
});



module.exports = router;
