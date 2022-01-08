const express = require('express')
const gameController = require('../controller/game-controller')
const router = express.Router()

router.post('/games', gameController.createGame)
router.put('/games/:id', gameController.updateGame)
router.delete('/games/:id', gameController.deleteGame)
router.get('/games/:id', gameController.getGameById)
router.get('/games', gameController.getGames)

module.exports = router