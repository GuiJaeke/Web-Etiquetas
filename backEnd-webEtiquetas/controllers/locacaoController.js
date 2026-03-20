const { Sequelize } = require('sequelize');
const sequelize = require('../bd/conn')
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const moment = require('moment')
const getSetor = require('../utils/getSetor')

module.exports = class locacaoController {
    static async FindItem(req, res) {
        const { codigo, filial } = req.params
        const Item = (await sequelize.query(`SELECT 
        PRD.codinterno,
        PRD.descr as Produto,
        PRD.modelo,
        SUBSTRING(FORN.NOME,1,32) as NOME,
        TABL.descr,
        '0'+ TABL.clasloc as clasloc,  
        CPL.CODPROFABRICANTE   
        FROM PRODUTOCAD PRD,TABLOCACAD TABL,PRODUTOLOCALFILIAL PRDL,FORNECEDOR_R FORN,COMPLEMENTOPRODUTO CPL
        WHERE
        PRD.codinterno = '${codigo}' AND 
        PRD.codpro=PRDL.CODPRO AND 
        PRDL.CLASLOC=TABL.clasloc AND 
        PRD.codfor=FORN.OID AND 
        PRDL.FILIAL= '60' AND
        PRD.codpro=CPL.CODPRO`))[0][0]

        res.json(Item)
    }
    static async printETQ(req, res) {
        const { codigo, filial } = req.params
        const printer = getSetor(req.params.setor)

        const Item = (await sequelize.query(`SELECT 
        PRD.codinterno,
        PRD.descr as Produto,
        PRD.modelo,
        SUBSTRING(FORN.NOME,1,32) as NOME,
        TABL.descr,
        '0'+ TABL.clasloc as clasloc,  
        CPL.CODPROFABRICANTE   
        FROM PRODUTOCAD PRD,TABLOCACAD TABL,PRODUTOLOCALFILIAL PRDL,FORNECEDOR_R FORN,COMPLEMENTOPRODUTO CPL
        WHERE
        PRD.codinterno = '${codigo}' AND 
        PRD.codpro=PRDL.CODPRO AND 
        PRDL.CLASLOC=TABL.clasloc AND 
        PRD.codfor=FORN.OID AND 
        PRDL.FILIAL= '60' AND
        PRD.codpro=CPL.CODPRO`))[0][0]
        console.log(Item);
        if (!Item) {
            return res.json(Item)
        }

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

        async function criaETQ(codigo, produto, modelo, fornecedor, local, clasloc, fabricante) {
            const conteudo = `
            $"CT~~CD,~CC^~CT~
            ^XA
            ~TA000
            ~JSN
            ^LT0
            ^MNW
            ^MTD
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
            ^PW831
            ^LL1239
            ^LS0
            ^FT126,1149^A0B,28,28^FH\\^CI28^FD CÓDIGO ^FS^CI27
            ^FT306,1191^A0B,28,28^FH\\^CI28^FD PRODUTO ^FS^CI27
            ^FT417,1193^A0B,28,30^FH\\^CI28^FD MODELO ^FS^CI27
            ^FT544,1191^A0B,28,28^FH\\^CI28^FD FORNECEDOR ^FS^CI27
            ^FT715,1193^A0B,28,28^FH\\^CI28^FD LOCAL FÍSICO ^FS^CI27
            ^FT311,1065^A0B,45,46^FH\\^CI28^FD${produto}^FS^CI27
            ^FT436,1067^A0B,73,74^FH\\^CI28^FD${modelo}^FS^CI27
            ^FT553,1019^A0B,45,46^FH\\^CI28^FD${fornecedor}^FS^CI27
            ^FT207,987^A0B,203,203^FH\\^CI28^FD${codigo}^FS^CI27
            ^BY4,3,168^FT200,296^BCB,,Y,N
            ^FH\\^FD>;${codigo}^FS
            ^FT753,1017^A0B,135,142^FH\\^CI28^FD${local}^FS^CI27
            ^BY4,3,168^FT755,300^BCB,,Y,N
            ^FH\\^FD>;${clasloc}^FS
            ^FT417,604^A0B,28,30^FH\\^CI28^FDCÓD. FABR.^FS^CI27
            ^FT438,436^A0B,73,74^FH\\^CI28^FD${fabricante}^FS^CI27
            ^PQ1,0,1,Y
            ^XZ"
            `;

            await fs.promises.writeFile('ETIQUETA_LOCACAO.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_LOCACAO.prn');

            // Agora utilizando o await no exec
            const comando = `copy ${caminhoDoArquivo} ${printer}`;

            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(item) {
            await criaETQ(item.codinterno, item.Produto, item.modelo, item.NOME, item.descr, item.clasloc, item.CODPROFABRICANTE);
        }
        gerarETQ(Item)
        res.json("Impressão realizada")

    }
    static async printOrleonETQ(req, res) {
        const { codigo, locacao } = req.params
        const maskLocacao = `${locacao.slice(0,1).toUpperCase()}-${locacao.slice(1,3)}-${locacao.slice(3,5)}`
        console.log(maskLocacao);
        
        const printer = getSetor(req.params.setor)

        const Item = (await sequelize.query(`SELECT 
        PRD.codinterno,
        PRD.descr as Produto,
        PRD.modelo,
        SUBSTRING(FORN.NOME,1,32) as NOME,
        TABL.descr,
        '0'+ TABL.clasloc as clasloc,  
        CPL.CODPROFABRICANTE   
        FROM PRODUTOCAD PRD,TABLOCACAD TABL,PRODUTOLOCALFILIAL PRDL,FORNECEDOR_R FORN,COMPLEMENTOPRODUTO CPL
        WHERE
        PRD.codinterno = '${codigo}' AND 
        PRD.codpro=PRDL.CODPRO AND 
        PRDL.CLASLOC=TABL.clasloc AND 
        PRD.codfor=FORN.OID AND 
        PRDL.FILIAL= '60' AND
        PRD.codpro=CPL.CODPRO`))[0][0]
        console.log(Item);
        if (!Item) {
            return res.json(Item)
        }

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

        async function criaETQ(codigo, produto, modelo, fornecedor, local) {
            const conteudo = `
            CT~~CD,~CC^~CT~
            ^XA
            ~TA000
            ~JSN
            ^LT0
            ^MNW
            ^MTD
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
            ^PW831
            ^LL1239
            ^LS0
            ^FT151,1148^A0B,45,79^FH\\^CI28^FDCODIGO:^FS^CI27
            ^BY4,3,59^FT195,351^BCB,,Y,N
            ^FH\\^FD>;7183>66^FS
            ^FT227,857^A0B,149,150^FH\\^CI28^FD${codigo}^FS^CI27
            ^FT343,1148^A0B,42,38^FH\\^CI28^FDPRODUTO: ${produto}^FS^CI27
            ^FT677,1148^A0B,34,41^FH\\^CI28^FDLOCAL FISICO:^FS^CI27
            ^BY5,3,57^FT706,351^BCB,,Y,N
            ^FH\\^FD>;${local}^FS
            ^FT419,1148^A0B,35,38^FH\\^CI28^FDMODELO: ${modelo}^FS^CI27
            ^FT496,1148^A0B,41,38^FH\\^CI28^FDFORNECEDOR: ${fornecedor}^FS^CI27
            ^FT718,893^A0B,127,109^FH\\^CI28^FD${local}^FS^CI27
            ^PQ1,0,1,Y
            ^XZ
            `;

            await fs.promises.writeFile('ETIQUETA_LOCACAOORLEON.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_LOCACAOORLEON.prn');

            // Agora utilizando o await no exec
            const comando = `copy ${caminhoDoArquivo} ${printer}`;

            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(item) {
            await criaETQ(item.codinterno, item.Produto, item.modelo, item.NOME, maskLocacao);
        }
        console.log(printer)
        gerarETQ(Item)
        res.json("Impressão realizada")

    }
}