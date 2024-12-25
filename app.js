const express = require('express')
const bodyParser = require('body-parser')
const os = require('os');
const mongoose = require('./db');

const app = express();
console.log(os.platform())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

/* app.get('*', (req, res) => { 
    res.status(200).send({message: 'Welcome to app'})
})  */
const prefix = '/galery/api'

//rutas
app.use(prefix + '/usuarios', require('./routes/usuario'))
app.use(prefix + '/fotografias', require('./routes/fotografia'))

module.exports=app