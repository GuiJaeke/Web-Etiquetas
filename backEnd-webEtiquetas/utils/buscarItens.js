
const { Sequelize } = require('sequelize');

const sequelizeBditens = new Sequelize('bditens', 'root', '', {
  host: 'localhost',       // ou IP do servidor
  dialect: 'mysql',
});

async function buscarItens(codint, limit) {
    const item = (await sequelizeBditens.query(`SELECT PRODUTO.codinterno, PRODUTO.descricao as descr, PRODUTO.modelo, PRODUTO.codfabricante
        as codfor, produto.locfisica as tloc, produto.qnt as disponivel from PRODUTO PRODUTO
        WHERE PRODUTO.codinterno LIKE '${codint}%' or PRODUTO.codfabricante LIKE '${codint}%' ${limit}`))[0];
    if (item == undefined) {
        console.log(item)
    } else {
        console.log(item);
        
        return(item)
    }
}
async function buscarItensDescr(descr) {
    const item = (await sequelizeBditens.query(`SELECT PRODUTO.codinterno, PRODUTO.descricao as descr, PRODUTO.modelo, PRODUTO.codfabricante
        as codfor, produto.locfisica as tloc, produto.qnt as disponivel from PRODUTO PRODUTO
        WHERE PRODUTO.descricao LIKE '%${descr}%' LIMIT 10`))[0];
    if (item == undefined) {
        console.log(item)
    } else {
        console.log(item);
        
        return(item)
    }
}
async function buscarPedido(numped) {
    const pedido = (await sequelizeBditens.query(`SELECT * FROM PEDIDO WHERE numped = ${numped}`))[0][0];
    if (pedido == undefined) {
        console.log(pedido)
    } else {
        console.log(pedido);   
        return(pedido)
    }
}

module.exports = { buscarItens, buscarItensDescr, buscarPedido };