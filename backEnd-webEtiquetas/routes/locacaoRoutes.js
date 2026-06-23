const express = require('express')
const router = express.Router()
const locacaoController = require('../controllers/locacaoController')

router.get('/:codigo', locacaoController.FindItem)
router.get('/print/:codigo/:filial/:setor', locacaoController.printETQ)
router.get('/printOrleon/:codigo/:locacao/:setor', locacaoController.printOrleonETQ)

module.exports = router