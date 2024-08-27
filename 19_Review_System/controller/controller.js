const Review = require('../model/review');

exports.addReview = async (req, res) => {
    try {
        const { name, pros, cons, rating } = req.body;
        const newReview = await Review.create({ name, pros, cons, rating });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getreviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { name: req.params.name } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
