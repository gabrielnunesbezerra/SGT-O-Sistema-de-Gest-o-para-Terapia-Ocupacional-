const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
    const { tipo, login, senha } = req.body;
    
    if (tipo === 'profissional') {
        const usuariosValidos = ['lucas daniel', 'gabriel tavares'];
        
        // Verifica se o usuário digitado está na lista e se a senha confere
        if (usuariosValidos.includes(login.toLowerCase()) && senha === '321123') {
            return res.json({ sucesso: true, redirecionar: '/gestao.html' });
        }
        return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos." });
    }

    if (tipo === 'responsavel' && senha) {
        return res.json({ sucesso: true, redirecionar: '/gestao.html' });
    }

    res.status(401).json({ sucesso: false, mensagem: "Acesso negado." });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
