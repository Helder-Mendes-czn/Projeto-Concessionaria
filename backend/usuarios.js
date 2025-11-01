import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../mySql2.js';

dotenv.config();

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

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const sql = 'INSERT INTO usuario(nome, usuario, senha, tipo) VALUES (?, ?, ?, ?)';
        await pool.execute(sql, [nome, usuario.toLowerCase(), senhaCriptografada, tipo]);

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao fazer login:");
        console.error(error);
        res.status(500).json({ mensagem: error.message });
    }
});

app.post('/usuarios/login', async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const [usuarios] = await pool.execute(`SELECT * FROM usuario WHERE LOWER(usuario) = ?`, [usuario.toLowerCase()]);

        if (usuarios.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const usuarioEncontrado = usuarios[0];
        const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
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

app.listen(4000, () => { console.log('servidor rodando na porta 4000') });