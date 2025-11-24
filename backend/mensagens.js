import autenticarToken from "../frontend/src/middleware/autenticarToken.js";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from '../mySql2.js';

// const express = require('express');
// const bodyParser = require('body-parser');
// const pool = require('../mySql2');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/mensagens", async (req, res) => {
    try {
        const [resultado] = await pool.execute("SELECT * from mensagem");
        res.json({ "mensagens": resultado });
    } catch (error) {
        console.error("erro: \n", error)
    }
});

app.post("/mensagens/enviar", autenticarToken, async (req, res) => {
    try {
        const { idAnuncio, textoMensagem } = req.body;
        let idDestinatario = await pool.execute("SELECT id_usuario FROM anuncio WHERE id = ?", [idAnuncio]);
        // let idRemetente = await pool.execute("SELECT id FROM usuario WHERE email = ?",[emailMensagem]);
        let idRemetente = req.usuario.id;

        idDestinatario = idDestinatario[0][0].id_usuario;
        // idRemetente = idRemetente[0][0].id;
        
        await pool.execute("INSERT INTO mensagem(id_remetente, id_destinatario, id_anuncio, conteudo) VALUES (?, ?, ?, ?)", [idRemetente, idDestinatario, idAnuncio, textoMensagem]);
        res.json({mensagem: "mensagem enviada com sucesso"});
    } catch (error) {
        console.error("erro: \n", error);
        res.json({mensagem: "Não foi possível enviar mensagem :("});
    }
})

app.listen(8003, () => { console.log("servidor rodando em 8003") });