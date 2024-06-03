// 01/03/24 - Letícia Malagutti
// rotas/livros.js
// Arquivo para definir as rotas da API

const express = require('express');
const fs = require('fs');
const router = express.Router();
const caminhoArquivoLivros = './livros.json';

// Função auxiliar para ler os dados dos livros
const lerLivrosDoArquivo = () => {
    const dados = fs.readFileSync(caminhoArquivoLivros);
    return JSON.parse(dados);
};

// Função auxiliar para escrever os dados dos livros
const escreverLivrosNoArquivo = (livros) => {
    fs.writeFileSync(caminhoArquivoLivros, JSON.stringify(livros, null, 2));
};

// Listar todos os livros
router.get('/', (req, res) => {
    const livros = lerLivrosDoArquivo();
    res.json(livros);
});

// Comprar um livro
router.post('/comprar', (req, res) => {
    const { nome } = req.body;
    const livros = lerLivrosDoArquivo();
    const indiceLivro = livros.findIndex(livro => livro.nome === nome);

    if (indiceLivro !== -1 && livros[indiceLivro].exemplaresDisponiveis > 0) {
        livros[indiceLivro].exemplaresDisponiveis -= 1;
        escreverLivrosNoArquivo(livros);
        res.json({ mensagem: 'Livro comprado com sucesso' });
    } else {
        res.status(400).json({ mensagem: 'Livro não disponível' });
    }
});

// Cadastrar um novo livro
router.post('/adicionar', (req, res) => {
    const { nome, autor, genero, exemplaresDisponiveis, imagemCapa } = req.body;
    const livros = lerLivrosDoArquivo();

    const novoLivro = {
        nome,
        autor,
        genero,
        exemplaresDisponiveis,
        imagemCapa
    };

    livros.push(novoLivro);
    escreverLivrosNoArquivo(livros);

    res.json({ mensagem: 'Livro adicionado com sucesso' });
});

module.exports = router;
