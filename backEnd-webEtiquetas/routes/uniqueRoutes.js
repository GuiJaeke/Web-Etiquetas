const express = require('express')
const router = express.Router()
const uniqueController = require('../controllers/uniqueController')

router.get('/fragil/:qtd/:setor', uniqueController.fragilETQ)
router.get('/seguranca/:qtd/:setor', uniqueController.segurancaETQ)
router.get('/garantia/:qtd/:setor', uniqueController.garantiaETQ)
router.get('/codbarras/:codigo/:qtd/:setor', uniqueController.codbarras)
router.get('/maxxbr/:codigo/:qtd/:setor', uniqueController.maxxbr)
router.get('/lado/:qtd/:setor', uniqueController.ladoETQ)
router.get('/correio/:qtd/:setor', uniqueController.correioETQ)
router.get('/consulta/:codigo/:filtro', uniqueController.consulta)
router.put('/consultaDescr', uniqueController.consultaDescr)
router.get('/conf', uniqueController.findConferentes)
router.get('/conf/:pedido/:pag/:conferente/:qtd/:setor', uniqueController.printConf)

module.exports = router