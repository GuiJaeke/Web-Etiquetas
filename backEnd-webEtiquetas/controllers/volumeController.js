const { Sequelize } = require('sequelize');
const sequelize = require('../bd/conn')
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const moment = require('moment')
const getSetor = require('../utils/getSetor')

module.exports = class volumeController {
    static async findPed(req, res) {
        const numped = req.params.numped
        const pedido = (await sequelize.query(
            `SELECT TOP 1 PED.numped,
            CLIR.NOME,
            PED.endercli AS RUA,
            PED.NumClie AS NUMERO, 
            PED.cepcli AS CEP, 
            PED.bairrcli AS BAIRRO, 
            PED.CIDADCLI AS  CIDADE, 
            PED.estcli AS SIGLA, 
            CASE WHEN (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV 
            WHERE  CARV.NumPed=PED.numped )IS NULL  THEN 0  ELSE (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV 
            WHERE  CARV.NumPed=PED.numped )END  AS QTD, (SELECT TABT.NOME FROM TABTRANFAT TABT 
            WHERE  TABT.codtran=PED.codtran) AS TRANSPORTADORA 
            FROM PEDICLICAD PED, CLIENTE_R CLIR,  
            ENDERECO_R ENDR,  CIDADE_R CIDR, 
            PROVINCIA_R PRVR  
            WHERE  PED.codclie=CLIR.OID  
            AND PED.codclie=ENDR.RITEM  
            AND ENDR.RCIDADE=CIDR.OID  
            AND PRVR.OID=CIDR.RPROVINCIA  
            AND PED.numped=${numped}`
        ))[0][0]
        res.json(pedido)
    }
    static async ETQ(req, res) {
        const numped = req.params.numped
        const pedido = (await sequelize.query(
            `SELECT TOP 1 PED.numped, CLIR.NOME, PED.endercli AS RUA,
            PED.NumClie AS NUMERO, PED.cepcli AS CEP, PED.bairrcli AS BAIRRO,
            PED.CIDADCLI AS  CIDADE, PED.estcli AS SIGLA,
            CASE WHEN (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV WHERE  CARV.NumPed=PED.numped )IS NULL  THEN 0
            ELSE (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV WHERE  CARV.NumPed=PED.numped )END  AS QTD,
            (SELECT TABT.NOME FROM TABTRANFAT TABT WHERE  TABT.codtran=PED.codtran) AS TRANSPORTADORA FROM PEDICLICAD PED,
            CLIENTE_R CLIR,  ENDERECO_R ENDR,  CIDADE_R CIDR, PROVINCIA_R PRVR  
            WHERE  PED.codclie=CLIR.OID
            AND PED.codclie=ENDR.RITEM  
            AND ENDR.RCIDADE=CIDR.OID  
            AND PRVR.OID=CIDR.RPROVINCIA  
            AND PED.numped=${numped}`
        ))[0][0]
        const qtdInicial = parseInt(req.params.qtdInicial)
        const qtdFinal = parseInt(req.params.qtdFinal)
        const qtdVolume = parseInt(req.params.qtdVolume)
        const unicaETQ = req.params.unicaETQ
        const printer = getSetor(req.params.setor)

        const data = new Date()
        const dataFormatada = moment(data).format('DD/MM/yyyy')
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

        async function criaETQ(NomeInfoVolume, PedidoVolume, TranspInfoVolume, contador, QtdVolumeFinal, EstadoInfoVolume, NomeCidadeVolume, DataVolume) {

            NomeInfoVolume = NomeInfoVolume.substring(0, 30)

            const conteudo = `
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
            ^LL1205
            ^LS0 
            ^FT147,1122^A0B,60,61^FH\\^CI28^FD${NomeInfoVolume}^FS^CI27
            ^FT388,1129^A0B,250,357^FH\\^CI28^FD${PedidoVolume}^FS^CI27
            ^FT504,1122^A0B,63,63^FH\\^CI28^FD${TranspInfoVolume}^FS^CI27
            ^FT782,939^A0B,95,94^FH\\^CI28^FDVolume^FS^CI27
            ^FT782,588^A0B,95,94^FH\\^CI28^FD${contador}/${QtdVolumeFinal}^FS^CI27
            ^FT590,1122^A0B,70,71^FH\\^CI28^FD${EstadoInfoVolume}^FS^CI27
            ^FT590,1028^A0B,70,71^FH\\^CI28^FD-^FS^CI27
            ^FT590,949^A0B,70,71^FH\\^CI28^FD${NomeCidadeVolume}^FS^CI27
            ^FT533,19^A0I,64,63^FH\\^CI28^FD${DataVolume}^FS^CI27
            ^PQ1,,,Y
            ^XZ
            `;

            await fs.promises.writeFile('ETIQUETA_VOLUME.prn', conteudo);
            console.log(`Arquivo da etiqueta ${contador} gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_VOLUME.prn');

            // Agora utilizando o await no exec
            const comando = `copy ${caminhoDoArquivo} ${printer}`;

            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(pedido, qtdFinal, qtdVolume, dataFormatada, unicaETQ) {
            if (unicaETQ == 'true') {
                if (qtdInicial <= qtdVolume) {

                    console.log(pedido)
                    await criaETQ(pedido.NOME, pedido.numped, pedido.TRANSPORTADORA, qtdInicial, qtdVolume, pedido.SIGLA, pedido.CIDADE, dataFormatada);
                    return res.json(null)
                } else {
                    return res.json('Não foi possível imprimir')
                }

            }
            if (qtdInicial <= qtdVolume && qtdFinal <= qtdVolume) {
                for (let contador = qtdInicial; contador <= qtdFinal; contador++) {
                    await criaETQ(pedido.NOME, pedido.numped, pedido.TRANSPORTADORA, contador, qtdVolume, pedido.SIGLA, pedido.CIDADE, dataFormatada);
                }
                return res.json(null)
            } else {
                return res.json('Não foi possível imprimir')
            }
        }
        console.log(numped);
        console.log(qtdInicial)
        console.log(qtdFinal)
        console.log(qtdVolume)
        console.log('Etiqueta de volume');
        gerarETQ(pedido, qtdFinal, qtdVolume, dataFormatada, unicaETQ)
    }
    static async pneuETQ(req, res) {
        const numped = req.params.numped
        const pedido = (await sequelize.query(
            `SELECT TOP 1 PED.numped, CLIR.NOME, PED.endercli AS RUA,    PED.NumClie AS NUMERO, PED.cepcli AS CEP, PED.bairrcli AS BAIRRO, PED.CIDADCLI AS  CIDADE, PED.estcli AS SIGLA, CASE WHEN (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV WHERE  CARV.NumPed=PED.numped )IS NULL  THEN 0  ELSE (SELECT CARV.QTDEVOLUME FROM CARVOLUPEDIDO CARV WHERE  CARV.NumPed=PED.numped )END  AS QTD, (SELECT TABT.NOME FROM TABTRANFAT TABT WHERE  TABT.codtran=PED.codtran) AS TRANSPORTADORA FROM PEDICLICAD PED, CLIENTE_R CLIR,  ENDERECO_R ENDR,  CIDADE_R CIDR, PROVINCIA_R PRVR  WHERE  PED.codclie=CLIR.OID  AND PED.codclie=ENDR.RITEM  AND ENDR.RCIDADE=CIDR.OID  AND PRVR.OID=CIDR.RPROVINCIA  AND PED.numped=${numped}`
        ))[0][0]
        const qtdInicial = parseInt(req.params.qtdInicial)
        const qtdFinal = parseInt(req.params.qtdFinal)
        const qtdVolume = parseInt(req.params.qtdVolume)
        const unicaETQ = req.params.unicaETQ
        const printer = getSetor(req.params.setor)

        const data = new Date()
        const dataFormatada = moment(data).format('DD/MM/yyyy')
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

        async function criaETQ(NomeInfoVolume, PedidoVolume, TranspInfoVolume, contador, QtdVolumeFinal, EstadoInfoVolume, NomeCidadeVolume, DataVolume) {

            NomeInfoVolume = NomeInfoVolume.substring(0, 30)

            const conteudo = `
            $"CT~~CD,~CC^~CT~
            ^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ
            ^XA
            ^MMT
            ^PW623
            ^LL1463
            ^LS0
            ^FO0,0^GFA,15360,15360,00080,:Z64:
eJztl0Fr3EYUx59W6SqEIhl6qA/Gcptbc4iPGzBSv0E+Qnzr1cGXLZjstAQcivG5h1ByKqWFnnuqZRqcS0n6DTo44A05tAopVDbqTP9vJG8cS1pr7S2203lmvSPNzI83M+/95y2RNWvWrFmzZs3aMQuVntZfbnh6amZ5/wPevJqaXYr1Wt4F41n9s7xz5Fn9+895km5Ok5dg1HvT4z0q6rCtKfHysq5z2vLGa9rBqFDswMOz699fR0pP78zrVV9pfSBGwGtn5JkBd7T+bUQcnIV3uHefaP1yoWyPi8QTeEe3Dn59euI5j+e9oLfsB62/OyESx/PomCFF0vEeNuufVkoc5yECf1TqEX//PLH+qSrNmFekc30kNvMOGnCwa1v6paiPxEZe3oxj+5A3t2ZeE2+Md6V9rPX3N9ry0hNxbHfa+pe1wlFNNtv6z/LeOV5j/cchNVLDoq3fPL9D9d82Ph7LDC4KiW+Xx7n6l6IrizEPzfXWPAG5d/HFl62IweObztNUdMnA8BS15SmCB465QTwtQvBYwYKc72B8pGd4eU2p0MzLqJBBLQLwWGCDDK81PtI1PPPYkgefqFDpgfDAkzws45EUaOkYXtrIq+gY+UqSZghFolPyopQCpajDXTkpdEct9S9nJ2iQcGcsHPC4GYMH/1zuYv9kzUE28xKs1HQKLNzl5kDitUIISYqZlzC+Jc87yhukrjmZhIsC4n0IJ+NlWBQwmK4oEHQzdfULhwEux1AsOXQ0yptqzdHMw/q4Q3iCAvAyh8PbMWWBJJf944xpy3MwOuJ4SMDz3uYFkhz2rz0PeatKngTPLXm8h/jnIXgKXrUMrNc/BLLh3VNKdgR10o7KCKE3izeo/cBbI0jdArXUv5Qn0DznpwmVFeNfTj28wXjw5jikV6oJ3Ia3QIuGl4EXs0bIq/Q+Z3d/Al7/DW+GZkreGobSMi1foSuc3f1qAtfzZBeuCL/k9fggwUuxqYHCKhd8MlGdT8CbcZJD3nzJgwwgI3gnPJMtjqrLrFoeJpQ86Yr4kIeg9BSOnYKEea6uJlw9LwHPTYIynpHBhgcAtBBpYyKQ26KScPX6l/gIOumzvomuQL6a+BNdIOGfIB/KrYSvhNdO/xIsyIOTLHfwTxb+If15yZBFD9N4sUkl4Zp4kBBkWmD0BTpa8FjpVSkvfNateaLkFfoXZiVvjo8VasinAt5cTQI380Lplnof/0GsfwpJwZhBBs8EcfZR5QZu4IW4u6S5hMALtfGvAAxooIx6Zwjs9rxsxOP6QDAvM7wYQWRuq4xloZLA9Ty+agepw/e5w/VBwrzUOBQCwTcypYYX1/Eq+kdRTvc4XSF2SkQQQcXuMMCHBMrAPCY1Uxv8gyzplDW/rF88+CcdBgRcvyCOnKR4bLNexJhieeICIeb9y5mXmEu4y6UNKI4wj2152ikKIr6FQq2CEc+DfzkmfCFYZCo35lnr0z+nzDtul4Nnf/9a3jR4/xw2/j7y5vcTeQ2/f3d7cvFqt+evbnSTNJrP/E6+KHvdjlhe8te/nPz373B2Z21t59bTuxurD1c3w1c7cT4zDKO7Tz/bH67fn3y9w6/lUub3fPC+WYlu7++5+f3hZtQXy7f0B8kpeLM7S/1D/+a8V0/i/DH7t/18f+g8HEzM2+3tLWV7vc3rG9cfvN7wss0b+ePdKPro2e5P3zqbk/sn+3Ktv9MLvQ1v+/WD52no5r+mg9h7Juf8z0+x3jG21dRxSl48nmf1z/LOkdegf6exS7Fey7tgPKt/lneOvIuuf9asWbNmzZo1a5fM/gV9Yl5v:3850
^FO0,1152^GFA,21888,21888,00076,:Z64:
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:9435
+XMNfCfS3OEdtKkWtIywkcv99uf18rjnHpmqv9g5NoznV1zpUt9RwgYK0K8SWfT1BIClMh1jCyfmjRyhIUVW/mAtEywwhwGXteIKRYq2PKmKX+68BQVCUxHzu5xGOmo3ZPzYsvKdVZZ5111llnnXXWWWedddbZC+0/00a5YA==:9435
            ^FT335,1175^A0N,51,50^FH\\^FD${DataVolume}^FS
            ^FT335,203^A0R,203,312^FH\\^FD${PedidoVolume}^FS
            ^FT67,170^A0R,62,62^FH\\^FDVOLUME^FS
            ^FT41,403^A0R,135,237^FB760,1,0,C^FH\\^FD${contador}/${QtdVolumeFinal}^FS
            ^FT522,238^A0R,39,57^FB847,1,0,C^FH\\^FD${NomeInfoVolume}^FS
            ^FT267,202^A0R,56,55^FH\\^FD${TranspInfoVolume}^FS
            ^FT185,220^A0R,62,62^FH\\^FD${EstadoInfoVolume}^FS
            ^FT185,348^A0R,62,62^FH\\^FD${NomeCidadeVolume}^FS
            ^FT185,290^A0R,62,62^FH\\^FD-^FS
            ^PQ1,0,1,Y^XZ"
            `;

            await fs.promises.writeFile('ETIQUETA_PNEU.prn', conteudo);
            console.log(`Arquivo da etiqueta ${contador} gerado com sucesso!`);

            const pastaAnterior = path.join(__dirname, '..');
            const caminhoDoArquivo = path.join(pastaAnterior, 'ETIQUETA_PNEU.prn');

            // Agora utilizando o await no exec
            const comando = `copy ${caminhoDoArquivo} ${printer}`;

            try {
                const resultado = await execPromise(comando);  // Usando exec com await
                console.log('Arquivo enviado para a impressora com sucesso:', resultado);
            } catch (err) {
                console.error('Erro ao executar o comando:', err);
            }
        }

        async function gerarETQ(pedido, qtdFinal, qtdVolume, dataFormatada, unicaETQ) {
            if (unicaETQ == 'true') {
                if (qtdInicial <= qtdVolume) {
                    await criaETQ(pedido.NOME, pedido.numped, pedido.TRANSPORTADORA, qtdInicial, qtdVolume, pedido.SIGLA, pedido.CIDADE, dataFormatada);
                    return res.json(null)
                } else {
                    return res.json('Não foi possível imprimir')
                }
            }
            if (qtdInicial <= qtdVolume && qtdFinal <= qtdVolume) {
                for (let contador = qtdInicial; contador <= qtdFinal; contador++) {
                    await criaETQ(pedido.NOME, pedido.numped, pedido.TRANSPORTADORA, contador, qtdVolume, pedido.SIGLA, pedido.CIDADE, dataFormatada);
                }
                return res.json(null)
            } else {
                return res.json('Não foi possível imprimir')
            }

        }
        console.log(numped);
        console.log(qtdInicial)
        console.log(qtdFinal)
        console.log(qtdVolume)
        console.log('Etiqueta de pneu');
        gerarETQ(pedido, qtdFinal, qtdVolume, dataFormatada, unicaETQ)
    }

}