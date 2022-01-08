const mongoose = require('mongoose')
const dbConnString = process.env.ATLAS_URI

mongoose
    .connect(dbConnString, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db