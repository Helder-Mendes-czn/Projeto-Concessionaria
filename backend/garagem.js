import autenticarToken from "../frontend/src/middleware/autenticarToken.js";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from '../mySql2.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.get("/garagem", async (req, res) => {
    try {
        const [resultado] = await pool.execute("SELECT * FROM garagem")
        res.json(resultado);
    } catch (error) {
        console.log("error: \n", error);
    }
});

app.get("/garagem/usuario/:id", async (req, res) => {
    try {
        let {id} = req.params;
        const [anuncios] = await pool.execute("SELECT a.id AS id_anuncio,m.id AS id_moto, a.preco, a.localizacao, m.ano, m.ano_fabricacao, m.ano_modelo, m.marca, m.modelo, m.quilometragem FROM garagem g JOIN anuncio a ON g.id_anuncio = a.id JOIN moto m ON m.id = a.id_moto WHERE g.id_usuario = ?", [id])

        const resultadoComImagens = [];

        for (const anuncio of anuncios){
            const [imagens] = await pool.execute("SELECT imagem FROM moto_imagens WHERE id_moto = ?", [anuncio.id_moto])
            resultadoComImagens.push({
                anuncio,
                imagens: imagens.map(i => i.imagem)
            });
        }

        res.status(200).json(resultadoComImagens)
    } catch (error) {
        console.log("error: \n", error);
    }
});

app.post("/garagem/favoritar", autenticarToken, async (req, res) => {
    try {
        const idUsuario = req.usuario.id;
        const { idAnuncio } = req.body;
        let [resultado] = await pool.execute("SELECT * FROM garagem WHERE id_anuncio = ?", [idAnuncio]);

        if (resultado.length > 0) {
            await pool.execute("DELETE FROM garagem WHERE id_anuncio = ?", [idAnuncio]);
            res.status(200).json({ mensagem: "desfavoritada com sucesso" })
        } else {
            await pool.execute("INSERT INTO garagem(id_usuario, id_anuncio) VALUES (?, ?)",[idUsuario, idAnuncio]);
            res.json({ mensagem: "Favoritado com sucesso" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao favoritar" });
    }
});

app.listen(8004, () => { console.log("servidor rodando 8004") });