const mongoose = require('mongoose')
const dbConnString = process.env.MONGO_ATLAS_URI

connect = () => {
    mongoose
        .connect(dbConnString, { useNewUrlParser: true })
        .catch(e => {
            console.error('Connection error', e.message)
        })

    return mongoose.connection
}

module.exports = {
    connect
}