const app = require('./app')
const port = 3260

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})