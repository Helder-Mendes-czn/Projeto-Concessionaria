import autenticarToken from "../frontend/src/middleware/autenticarToken.js";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from '../mySql2.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/garagem", async (req, res) => {
    try {
        const [resultado] = await pool.execute("SELECT * FROM garagem")
        res.json(resultado);
    } catch (error) {
        console.log("error: \n",error)
    }
});

app.post("/garagem/favoritar", autenticarToken, async (req, res) => {
    try {
        const idUsuario = req.usuario.id; 
        const { idAnuncio } = req.body;

        await pool.execute(
            "INSERT INTO garagem(id_usuario, id_anuncio) VALUES (?, ?)", 
            [idUsuario, idAnuncio]
        );

        res.json({ mensagem: "Favoritado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao favoritar" });
    }
});

app.listen(8004, () => {console.log("servidor rodando 8004")});