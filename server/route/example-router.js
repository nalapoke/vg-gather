const express = require('express')
const exampleController = require('../controller/example-controller')
const router = express.Router()

router.post('/examples', exampleController.createExample)
router.put('/examples/:id', exampleController.updateExample)
router.delete('/examples/:id', exampleController.deleteExample)
router.get('/examples/:id', exampleController.getExampleById)
router.get('/examples', exampleController.getExamples)

module.exports = router