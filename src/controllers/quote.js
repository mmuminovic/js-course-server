const mongoose = require('mongoose')
const Quote = require('../models/quote')
const { shuffle } = require('../utils/shuffle')

exports.getAllQuotes = (req, res, next) => {
    Quote.find().then((quotes) => {
        res.json(quotes)
    })
}

exports.getQuote = (req, res, next) => {
    const quoteId = req.params.quoteId
    Quote.findOne({ _id: quoteId }).then((quote) => {
        res.json({
            quoteText: quote.quoteText,
            quoteAuthor: quote.quoteAuthor,
            quoteSource: quote.quoteSource,
            likes: quote.likes,
        })
    })
}

exports.getRandomQuote = (req, res, next) => {
    Quote.find().then((quotes) => {
        let shuffledQuotes = shuffle(quotes)
        let quote = {
            quoteId: shuffledQuotes[0]._id,
            quoteText: shuffledQuotes[0].quoteText,
            quoteAuthor: shuffledQuotes[0].quoteAuthor,
            quoteSource: shuffledQuotes[0].quoteSource,
            likes: shuffledQuotes[0].likes,
        }
        res.json(quote)
    })
}

exports.addQuote = (req, res, next) => {
    const newQuote = new Quote({
        _id: mongoose.Types.ObjectId(),
        quoteText: req.body.quoteText,
        quoteAuthor: req.body.quoteAuthor,
        quoteSource: req.body.quoteSource,
    })

    newQuote.save().then((result) => {
        res.json(result)
    })
}

exports.likeQuote = (req, res, next) => {
    const quoteId = req.params.quoteId

    Quote.findOne({ _id: quoteId })
        .then((quote) => {
            quote.likes = quote.likes + 1
            return quote.save()
        })
        .then((data) => {
            res.json(data)
        })
}

exports.editQuote = (req, res, next) => {
    const quoteId = req.params.quoteId
    const newData = req.body
    Quote.updateOne({ _id: quoteId }, newData).then((result) =>
        res.json(result)
    )
}

exports.deleteQuote = (req, res, next) => {
    const quoteId = req.params.quoteId
    Quote.deleteOne({ _id: quoteId }).then((result) => res.json(result))
}
