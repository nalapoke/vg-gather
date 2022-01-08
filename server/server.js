const express = require("express")
require("dotenv").config({ path: "./config.env" })
const bodyParser = require('body-parser')
const cors = require("cors")
const db = require("./db/conn")
const gameRouter = require('./route/game-router')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', gameRouter)
 
app.listen(port, () => console.log(`Server running on port ${port}`))
