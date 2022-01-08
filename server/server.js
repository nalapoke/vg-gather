const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const db = require("./db/db")
const exampleRouter = require('./route/example-router')


const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

db.connect().on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', exampleRouter)
 
app.listen(port, () => console.log(`Server running on port ${port}`))
