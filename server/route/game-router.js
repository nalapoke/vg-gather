const express = require('express')
const gameController = require('../controller/game-controller')
const router = express.Router()

router.get('/games/search', gameController.searchGames)

module.exports = router