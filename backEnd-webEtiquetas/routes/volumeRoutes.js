const express = require('express')
const router = express.Router()
const volumeController = require('../controllers/volumeController')

router.get('/:numped', volumeController.findPed)
router.get('/print/:qtdInicial/:qtdFinal/:qtdVolume/:numped/:unicaETQ/:intervalo/:setor', volumeController.ETQ)
router.get('/pneu/print/:qtdInicial/:qtdFinal/:qtdVolume/:numped/:unicaETQ/:intervalo/:setor', volumeController.pneuETQ)

module.exports = router