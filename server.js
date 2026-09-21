const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.post('/api/login', (req, res) => {
    const { tipo, login, senha } = req.body;

    if (tipo === 'profissional') {
        const usuariosValidos = ['lucas daniel', 'gabriel tavares'];

        if (usuariosValidos.includes(login.toLowerCase()) && senha === '321123') {
            return res.json({ sucesso: true, redirecionar: '/html/gestao.html' });
        }
        return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos." });
    }

    if (tipo === 'responsavel' && senha) {
        return res.json({ sucesso: true, redirecionar: '/html/gestao.html' });
    }

    res.status(401).json({ sucesso: false, mensagem: "Acesso negado." });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
