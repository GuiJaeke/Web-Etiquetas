const express = require('express')
const router = express.Router()
const excessoController = require('../controllers/excessoController')

router.get('/:word', excessoController.getAllLocs)
router.get('/print/:loc/:setor', excessoController.printLocs)

module.exports = router