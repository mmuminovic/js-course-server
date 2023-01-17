const express = require('express')

const router = express.Router()

const quotesController = require('../controllers/quote')

router.get('/get-quote/:quoteId', quotesController.getQuote)
router.get('/get-all-quotes', quotesController.getAllQuotes)
router.get('/get-random-quote', quotesController.getRandomQuote)
router.post('/add-quote', quotesController.addQuote)
router.patch('/like/:quoteId', quotesController.likeQuote)
router.patch('/edit/:quoteId', quotesController.editQuote)
router.delete('/delete/:quoteId', quotesController.deleteQuote)

module.exports = router
