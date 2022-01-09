const express = require('express')
const gameController = require('../controller/game-controller')
const router = express.Router()

router.post('/games/search', gameController.searchGames)
router.get('/games/:id', gameController.getGameById)

module.exports = router