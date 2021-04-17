'use strict'
const app = require('./bin/express');

app.listen(3001, ()=>{
    console.log(`Servidor iniciado com sucesso na porta 3001`);
});