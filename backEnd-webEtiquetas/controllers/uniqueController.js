const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const sequelize = require('../bd/conn');
const getSetor = require('../utils/getSetor');
const {buscarItens} = require('../utils/buscarItens');
const {buscarItensDescr} = require('../utils/buscarItens');

module.exports = class uniqueController {
    static async fragilETQ(req, res) {
        const qtd = req.params.qtd
        const printer = getSetor(req.params.setor)
        
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }
        async function criaETQ() {
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_fragil.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }
        async function gerarETQ(qtd) {

            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ();
            }
        }
        gerarETQ(qtd)
        res.json("Impressão realizada")
    }
    static async segurancaETQ(req, res) {
        const qtd = req.params.qtd
        const printer = getSetor(req.params.setor)
        
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }

        async function criaETQ() {
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_SEGURANCA.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(qtd) {

            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ();
            }
        }

        gerarETQ(qtd)



        res.json("Impressão realizada")
    }
    static async garantiaETQ(req, res) {
        const qtd = req.params.qtd
        const printer = getSetor(req.params.setor)
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }

        async function criaETQ(contador) {
            function padLeft(value, length) {
                return value.toString().padStart(length, '0');
            }
            const numpad = padLeft(contador, 6)
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
            CT~~CD,~CC^~CT~
            ^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ
            ^XA
            ^MMT
            ^PW823
            ^LL0264
            ^LS0
            ^FT556,38^A0N,23,24^FH\\^FDSELO GARANTIA MAXX^FS
            ^FT119,38^A0N,23,24^FH\\^FDSELO GARANTIA MAXX^FS
            ^FT34,183^A0N,124,122^FH\\^FD${numpad}^FS
            ^FT456,183^A0N,124,122^FH\\^FD${numpad}^FS
            ^PQ1,0,1,Y^XZ
            `;

            await fs.promises.writeFile('ETIQUETA_GARANTIA.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_GARANTIA.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(qtd) {

            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ(contador);
            }
        }

        gerarETQ(qtd)



        res.json("Impressão realizada")
    }
    static async ladoETQ(req, res) {
        const qtd = req.params.qtd
        const printer = getSetor(req.params.setor)
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }
        async function criaETQ() {
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_LADOPARACIMA.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }
        async function gerarETQ(qtd) {

            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ();
            }
        }
        gerarETQ(qtd)
        res.json("Impressão realizada")
    }
    static async correioETQ(req, res) {
        const qtd = req.params.qtd
        const printer = getSetor(req.params.setor)
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }
        async function criaETQ() {
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_REMETENTE.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }
        async function gerarETQ(qtd) {

            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ();
            }
        }
        gerarETQ(qtd)
        res.json("Impressão realizada")
    }
    static async consulta(req, res) {
        const { codigo, filtro } = req.params
        let limit = 'limit 10'
        
        if (codigo.length == 6) {
            limit = 'limit 1'
        }
        if (codigo.length == 0) {
            return res.json(undefined)
        }
        if(filtro == 'true') {
            const produto = await buscarItens(codigo, limit)
            return res.json(produto)
        } else {
            const produto = await buscarItens(codigo, limit)
            return res.json(produto)
        }
        
    }
    static async consultaDescr(req, res) {
        const {descr} = req.body       
        if (descr.length == 0) {
            return res.json(undefined)
        }
        const produtos = await buscarItensDescr(descr)
        return res.json(produtos)

    }
    static async codbarras(req, res) {
        const { codigo, qtd } = req.params
        const printer = getSetor(req.params.setor)
        const item = (await sequelize.query(`SELECT DESCR FROM PRODUTOCAD WHERE CODINTERNO='${codigo}'`))[0][0]
        if(!item) {
            return res.json(item)
        }
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }

        async function criaETQ(descr) {

            const conteudo = `
            $"CT~~CD,~CC^~CT~
            ^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ
            ^XA
            ^MMT
            ^PW823
            ^LL0264
            ^LS0
            ^BY4,3,160^FT79,201^BCN,,Y,N
            ^FD>;${codigo}^FS
            ^BY4,3,160^FT515,199^BCN,,Y,N
            ^FD>;${codigo}^FS
            ^FT467,32^A0N,17,16^FH\\^FD${descr}^FS
            ^FT30,32^A0N,17,16^FH\\^FD${descr}^FS
            ^PQ1,0,1,Y^XZ"
            `;

            await fs.promises.writeFile('ETIQUETA_CODBARRAS.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_CODBARRAS.prn');
            const comando = `copy ${caminhoDoArquivo} ${printer}`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(qtd) {
            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ(item.DESCR);
            }
        }

        gerarETQ(qtd)
        res.json("Impressão realizada")
    }
    static async maxxbr(req, res) {
        const { codigo, qtd } = req.params
        const printer = getSetor(req.params.setor)
        const item = (await sequelize.query(`SELECT DESCR FROM PRODUTOCAD WHERE CODINTERNO='${codigo}'`))[0][0]
        if(!item) {
            return res.json(item)
        }

        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }

        async function criaETQ(descr) {

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
            ^PR3,3
            ~SD25
            ^JUS
            ^LRN
            ^CI27
            ^PA0,1,1,0
            ^XZ
            ^XA
            ^MMT
            ^PW799
            ^LL575
            ^LS0
            ^BY3,3,120^FT101,465^BCN,,Y,N
            ^FH\\^FD>;${codigo}^FS
            ^FT0,325^A0N,14,15^FB406,1,4,C^FH\\^CI28^FD${descr}^FS^CI27
            ^BY3,3,120^FT525,465^BCN,,Y,N
            ^FH\\^FD>;${codigo}^FS
            ^FT455,325^A0N,14,15^FB344,1,4,C^FH\\^CI28^FD${descr}^FS^CI27
            ^PQ1,0,1,Y
            ^XZ"
            `;

            await fs.promises.writeFile('ETIQUETA_CODMAXX.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_CODMAXX.prn');
            const comando = `copy ${caminhoDoArquivo} \\\\192.168.3.183\\verdinha`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(qtd) {
            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ(item.DESCR);
            }
        }

        gerarETQ(qtd)
        res.json("Impressão realizada")
    }
    static async findConferentes(req, res) {
        const conferentes = (await sequelize.query('SELECT CONFERENTE FROM TMNT_CONFERENTE ORDER BY CONFERENTE'))[0]
        res.json(conferentes)
    }
    static async printConf(req, res) {
        const { pedido, pag, conferente, qtd } = req.params
        const printer = getSetor(req.params.setor)
        function execPromise(command) {
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(stdout);
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                    }
                });
            });
        }
        async function criaETQ(contador) {
            const conteudo = `
            $"CT~~CD,~CC^~CT~
            CT~~CD,~CC^~CT~
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
            ^PW831  
            ^LL406
            ^LS0
            ^FT245,91^A0N,89,89^FH\\^CI28^FD${conferente}^FS^CI27
            ^FT141,282^A0N,191,190^FH\\^CI28^FD${pedido}^FS^CI27
            ^FT42,378^A0N,88,89^FH\\^CI28^FD${contador}/${qtd}^FS^CI27
            ^FT493,378^A0N,88,89^FH\\^CI28^FDPág. ${pag}^FS^CI27
            ^PQ1,0,1,Y
            ^XZ"
            `
            await fs.promises.writeFile('ETIQUETA_VOLUMECONFER.prn', conteudo);
            console.log(`Arquivo da etiqueta gerado com sucesso!`);
            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_VOLUMECONFER.prn');
            const comando = `copy ${caminhoDoArquivo} \\\\192.168.3.178\\barras`;
            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(qtd) {
            for (let contador = 1; contador <= qtd; contador++) {
                await criaETQ(contador);
            }
        }

        gerarETQ(qtd)
        res.json("impressão realizada")
    }
}