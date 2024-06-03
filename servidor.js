// 01/03/24 - Letícia Malagutti
// servidor.js
// Arquivo para configurar o servidor express

const express = require('express');
const bodyParser = require('body-parser');
const rotasLivros = require('./rotas/livros');

const app = express();
const PORTA = 3000;

app.use(bodyParser.json());

app.use('/api/livros', rotasLivros);

app.listen(PORTA, () => {
    console.log(`Servidor está rodando na porta ${PORTA}`);
});
