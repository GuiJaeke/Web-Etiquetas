const express = require('express')
const app = express()
const conn = require('./bd/conn')
const volumeRoutes = require('./routes/volumeRoutes')
const uniqueRoutes = require('./routes/uniqueRoutes')
const excessoRoutes = require('./routes/excessoRoutes')
const locacaoRoutes = require('./routes/locacaoRoutes')
const cors = require('cors')
const env = require('dotenv')

//603412

app.use(cors());

app.use(cors({
    origin: process.env.ORIGIN
})
)

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use('/volume', volumeRoutes)
app.use('/unique', uniqueRoutes)
app.use('/loc', excessoRoutes)
app.use('/locacao', locacaoRoutes)

conn
    .sync()
    .then(() => {
    app.listen(8088)
}).catch((err) => {
    
    console.log(err)
    })