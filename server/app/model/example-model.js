const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Example = new Schema(
    {
        name: { type: String, required: true },
        count: { type: Number, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('examples', Example)