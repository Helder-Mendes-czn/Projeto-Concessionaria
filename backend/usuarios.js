const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../mySql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/usuarios/cadastrar', async (req, res) => {
    try {
        const { nome, usuario, senha, confirmaSenha, tipo } = req.body;

        const [existeUsuario] = await pool.execute(
            `SELECT * FROM usuario WHERE LOWER(usuario) = ?`,
            [usuario.toLowerCase()]
        );

        if (existeUsuario.length > 0) {
            return res.status(400).json({ mensagem: "Usuário já existente" });
        }

        if (senha.length < 8 || senha.length > 20) {
            return res.status(400).json({ mensagem: "A senha deve conter entre 8 e 20 caracteres" });
        }

        if (senha !== confirmaSenha) {
            return res.status(400).json({ mensagem: "As senhas não coincidem" });
        }

        const sql = 'INSERT INTO usuario(nome, usuario, senha, tipo) VALUES (?, ?, ?, ?)';
        await pool.execute(sql, [nome, usuario.toLowerCase(), senha, tipo]);

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
});

app.post('/usuarios/login', async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const [existeUsuario] = await pool.execute(`SELECT * FROM usuario WHERE LOWER(usuario) = "${usuario.toLowerCase()}"`);
        if (existeUsuario.length > 0) {
            if (existeUsuario[0].senha === senha) {
                res.json({ mensagem: "Login feito com sucesso" })
            } else {
                res.json({ mensagem: "Senha incorreta" })
            }
        } else {
            res.json({ mensagem: "Usuário não encontrado" })
        }
    } catch (error) {
        console.error('erro: ', error)
    }
});

app.delete('/usuarios/deletar', async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const [existeUsuario] = await pool.execute(`SELECT * FROM usuario WHERE LOWER(usuario) = "${usuario.toLowerCase()}"`);
        if (existeUsuario.length > 0) {
            const sql = `DELETE FROM usuario WHERE LOWER(usuario) = "${usuario.toLowerCase()}"`;
            await pool.execute(sql);
            res.json({ mensagem: "Usuario deletado com sucesso" })
        } else {
            res.json({ mensagem: "Usuario nao encontrado" })
        }
    } catch (error) {
        console.error('erro: ', error);
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        const [resultado] = await pool.execute('SELECT * FROM usuario');
        res.json(resultado);
    } catch (error) {
        console.error('erro: ', error);
    }
})

app.listen(3000, () => { console.log('servidor rodando na porta 3000') });