const { findOne } = require('../model/example-model')
const Example = require('../model/example-model')

const errorResponseMessage = "Oops. Something went wrong."


createExample = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, error: errorResponseMessage })
    }
    let exampleToCreate = new Example(req.body)

    let createdExample = await exampleToCreate.save()
    res.status(201).json({ success: true, data: createdExample })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

updateExample = async (req, res) => {
  try {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a example to update',
        })
    }

    let exampleWithUpdates = req.body
    let updatedExample = await Example.findOneAndUpdate({ _id: req.params.id }, exampleWithUpdates, { new: true })

    res.status(200).json({ success: true, data: updatedExample })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

deleteExample = async (req, res) => {
  try {
      let deletedExample = await Example.findOneAndDelete({ _id: req.params.id })

      if (!deletedExample) {
        return res.status(404).json({ success: false, error: `Example not found` })
      }

      res.status(200).json({ success: true, data: deletedExample })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

getExampleById = async (req, res) => {
  try {
    let example = await Example.findOne({ _id: req.params.id })

    if (!example) {
      return res.status(404).json({ success: false, error: "Example not found" })
    }

    res.status(200).json({ success: true, data: example })

  } catch(err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

getExamples = async (req, res) => {
  try {
    let examples = await Example.find({})
    res.status(200).json({ success: true, data: examples })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: errorResponseMessage })
  }
}

module.exports = {
    createExample,
    updateExample,
    deleteExample,
    getExamples,
    getExampleById,
}