const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const rotasFuncionarios = require('./controller/funcionarios-controller')

const db = require('./infra/sqlite-db')

app.use(bodyParser.json())

rotasFuncionarios(app, db)

module.exports = app