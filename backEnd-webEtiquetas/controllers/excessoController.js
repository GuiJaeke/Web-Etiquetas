const { Sequelize } = require('sequelize');
const sequelize = require('../bd/conn')
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const moment = require('moment')
const getSetor = require('../utils/getSetor')
module.exports = class excessoController {
    static async getAllLocs(req, res) {
        const word = req.params.word
        const locs = (await sequelize.query(`SELECT descr AS loc FROM TABLOCACAD WHERE descr LIKE '${word}%' ORDER BY descr ASC`))[0]
        res.json(locs)
    }
    static async printLocs(req, res) {
        const loc = req.params.loc
        const printer = getSetor(req.params.setor)
        const codigoLocacao = (await sequelize.query(`SELECT clasloc, substring(clasloc,5, 6) as complemento FROM TABLOCACAD WHERE descr = '${loc}'`))[0][0]
        console.log(codigoLocacao);
        if (!codigoLocacao) {
            return res.json(codigoLocacao)
        }

        const data = new Date()
        const dataFormatada = moment(data).format('DD/MM/yyyy HH:MM')
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);  // Rejeita a Promise se ocorrer um erro
                    } else {
                        resolve(stdout);  // Resolve a Promise com a saída padrão (stdout)
                    }
        
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }
        
        async function criaETQ(localFISICO, claslocacao, complemento, dataFormatada) {
            const conteudo = `
            $"CT~~CD,~CC^~CT~
            ^XA
            ~TA000
            ~JSN
            ^LT0
            ^MNW
            ^MTT
            ^PON
            ^PMN
            ^LH0,0
            ^JMA
            ^PR4,4
            ~SD15
            ^JUS
            ^LRN
            ^CI27
            ^PA0,1,1,0
            ^XZ
            ^XA
            ^MMT
            ^LS0
            ^FT182,1165^A0B,135,134^FB1165,1,35,C^FH\\^CI28^FDEXCESSO^FS^CI27
            ^FT446,1165^A0B,216,215^FB1165,1,55,C^FH\\^CI28^FD${localFISICO}^FS^CI27
            ^BY7,3,160^FT673,860^BCB,,Y,N
            ^FH\\^FD>;${claslocacao * 1}>6${complemento * 1}^FS
            ^FT758,320^A0B,45,38^FB320,1,12,C^FH\\^CI28^FD${dataFormatada}^FS^CI27
            ^PQ1,0,1,Y
            ^XZ
            "
            `;
        
            await fs.promises.writeFile('ETIQUETA_EXCESSO.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);
        
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_EXCESSO.prn');
        
            // Agora utilizando o await no exec
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
        
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(loc, codigoLocacao, dataFormatada) {
            await criaETQ(loc, codigoLocacao.clasloc, codigoLocacao.complemento, dataFormatada);
        }
        gerarETQ(loc, codigoLocacao, dataFormatada)
        res.json("Impressão realizada")
        
    }
}