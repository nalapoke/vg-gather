const { findOne } = require('../model/game-model')
const Game = require('../model/game-model')

const errorResponseMessage = "Oops. Something went wrong."


createGame = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, error: errorResponseMessage })
    }
    let gameToCreate = new Game(req.body)

    let createdGame = await gameToCreate.save()
    res.status(201).json({ success: true, data: createdGame })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

updateGame = async (req, res) => {
  try {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a game to update',
        })
    }

    let gameWithUpdates = req.body
    let updatedGame = await Game.findOneAndUpdate({ _id: req.params.id }, gameWithUpdates, { new: true })

    res.status(200).json({ success: true, data: updatedGame })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

deleteGame = async (req, res) => {
  try {
      let deletedGame = await Game.findOneAndDelete({ _id: req.params.id })

      if (!deletedGame) {
        return res.status(404).json({ success: false, error: `Game not found` })
      }

      res.status(200).json({ success: true, data: deletedGame })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

getGameById = async (req, res) => {
  try {
    let game = await Game.findOne({ _id: req.params.id })

    if (!game) {
      return res.status(404).json({ success: false, error: "Game not found" })
    }

    res.status(200).json({ success: true, data: game })

  } catch(err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

getGames = async (req, res) => {
  try {
    let games = await Game.find({})
    res.status(200).json({ success: true, data: games })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

module.exports = {
    createGame,
    updateGame,
    deleteGame,
    getGames,
    getGameById,
}