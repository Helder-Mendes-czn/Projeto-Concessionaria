const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../mySql2');
const cors = require('cors');
const { default: autenticarToken } = require('../frontend/src/middleware/autenticarToken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/anuncios/buscar', async (req, res) => {
    try {
        const filtros = req.query;
        const valores = []
        let sql = `SELECT a.id AS id_anuncio, a.preco, a.localizacao, a.descricao, a.data_publicacao, a.status,m.id AS id_moto,m.marca,m.modelo,m.ano,m.estilo,m.cilindrada,m.motor,m.potencia,m.torque,m.taxa_compressao,m.diametro_curso,m.valvulas_por_cilindro,m.alimentacao,m.comando_combustivel,m.ignicao,m.lubrificacao,m.refrigeracao,m.caixa_marchas,m.transmissao,m.embreagem,m.quadro,m.suspensao_dianteira,m.curso_roda_dianteira,m.suspensao_traseira,m.curso_roda_traseira,m.pneu_dianteiro,m.pneu_traseiro,m.freios_dianteiros,m.freios_traseiros,m.peso_total,m.imagem_principal,m.altura_assento,m.altura_total,m.comprimento_total,m.largura_total,m.distancia_solo,m.entre_eixos,m.capacidade_combustivel,m.partida, CASE WHEN m.freios_dianteiros LIKE '%disc%' THEN 'disc' ELSE 'brake' END AS freio_dianteiro_categoria, CASE WHEN m.freios_traseiros LIKE '%disc%' THEN 'disc' ELSE 'brake' END AS freio_traseiro_categoria FROM anuncio a JOIN moto m ON a.id_moto = m.id JOIN usuario u ON a.id_usuario = u.id WHERE a.status = 'ativo'`;

        const condicoes = [];

        if (filtros.localizacao) {
            condicoes.push("a.localizacao LIKE ?");
            valores.push(`%${filtros.localizacao}%`);
        }
        if (filtros.marca) {
            condicoes.push("m.marca LIKE ?");
            valores.push(`%${filtros.marca}%`);
        }

        if (filtros.ano) {
            condicoes.push("m.ano = ?");
            valores.push(filtros.ano);
        }

        if (filtros.ano_min) {
            condicoes.push("m.ano >= ?");
            valores.push(filtros.ano_min);
        }
        if (filtros.ano_max) {
            condicoes.push("m.ano <= ?");
            valores.push(filtros.ano_max);
        }

        if (filtros.preco_min) {
            condicoes.push("a.preco >= ?");
            valores.push(filtros.preco_min);
        }
        if (filtros.preco_max) {
            condicoes.push("a.preco <= ?");
            valores.push(filtros.preco_max);
        }

        if (filtros.cilindrada_min) {
            condicoes.push("CAST(m.cilindrada AS DECIMAL(10,1)) >= ?");
            valores.push(filtros.cilindrada_min);
        }
        if (filtros.cilindrada_max) {
            condicoes.push("CAST(m.cilindrada AS DECIMAL(10,1)) <= ?");
            valores.push(filtros.cilindrada_max);
        }

        const camposArray = ["refrigeracao", "partida", "motor", "caixa_marchas", "freios", "alimentacao", "estilo"];

        camposArray.forEach((campo) => {
            if (filtros[campo]) {
                const lista = Array.isArray(filtros[campo]) ? filtros[campo] : [filtros[campo]];
                if (campo === "motor") {
                    const condicoesInternas = lista.map(() => `m.${campo} = ?`).join(" OR ");
                    condicoes.push(`(${condicoesInternas})`);
                    lista.forEach((valor) => valores.push(valor));
                }
                if (campo === "freios") {
                    const freiosLista = Array.isArray(filtros.freios) ? filtros.freios : filtros.freios ? [filtros.freios] : [];
                    if (freiosLista.length > 0) {
                        const condicoesFreios = [];
                        freiosLista.forEach(opcao => {
                            const [dianteiro, traseiro] = opcao.split(" / ");

                            condicoesFreios.push("((CASE WHEN m.freios_dianteiros LIKE '%disc%' THEN 'disc' ELSE 'brake' END) = ?" + " AND " + "(CASE WHEN m.freios_traseiros LIKE '%disc%' THEN 'disc' ELSE 'brake' END) = ?)");
                            valores.push(dianteiro);
                            valores.push(traseiro);
                        });
                        condicoes.push("(" + condicoesFreios.join(" OR ") + ")");
                    }

                }
                else {
                    const condicoesInternas = lista.map(() => `m.${campo} LIKE ?`).join(" OR ");
                    condicoes.push(`(${condicoesInternas})`);
                    lista.forEach((valor) => valores.push(`%${valor}%`));
                }
            }
        });

        if (condicoes.length > 0) {
            sql += " AND " + condicoes.join(" AND ");
        }

        sql += " ORDER BY a.data_publicacao DESC";

        const [resultado] = await pool.execute(sql, valores);
        res.json(resultado);
    } catch (error) {
        console.error("erro: ", error)
    }
});

app.get("/anuncios/buscarPorId/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT a.id AS id_anuncio, a.preco, a.localizacao, a.descricao, a.data_publicacao, a.status,m.id AS id_moto,m.marca,m.modelo,m.ano,m.estilo,m.cilindrada,m.motor,m.potencia,m.torque,m.taxa_compressao,m.diametro_curso,m.valvulas_por_cilindro,m.alimentacao,m.comando_combustivel,m.ignicao,m.lubrificacao,m.refrigeracao,m.caixa_marchas,m.transmissao,m.embreagem,m.quadro,m.suspensao_dianteira,m.curso_roda_dianteira,m.suspensao_traseira,m.curso_roda_traseira,m.pneu_dianteiro,m.pneu_traseiro,m.freios_dianteiros,m.freios_traseiros,m.peso_total,m.imagem_principal,m.altura_assento,m.altura_total,m.comprimento_total,m.largura_total,m.distancia_solo,m.entre_eixos,m.capacidade_combustivel,m.partida, u.nome as nome_usuario, u.email as email_usuario, u.telefone as telefone_usuario, u.tipo as tipo_usuario FROM anuncio a JOIN moto m ON a.id_moto = m.id JOIN usuario u ON a.id_usuario = u.id WHERE a.status = 'ativo' AND a.id = ?`;

        const [resultado] = await pool.execute(sql, [id]);
        res.status(200).json(resultado);

    } catch (error) {
        console.error("erro: \n", error);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
})

app.post('/anuncios/cadastrar', autenticarToken, async (req, res) => {
    try {
        if (req.usuario.tipo !== "Usuário Vendedor") {
            return res.status(403).json({ mensagem: "Apenas usuários vendedores podem cadastrar motos" });
        }

        const { id_usuario, id_moto, preco, localizacao, descricao } = req.body;

        if (!id_usuario || !id_moto || !preco || !localizacao || !descricao) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }

        const sql = "INSERT INTO anuncio (id_usuario, id_moto, preco, localizacao, descricao) VALUES (?, ?, ?, ?, ?)";

        await pool.execute(sql, [id_usuario, id_moto, preco, localizacao, descricao]);

        res.json({ mensagem: "Anúncio feito com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar anúncio:", error);
        res.status(500).json({ mensagem: "Erro interno no servidor", erro: error.message });
    }
});

app.put('/anuncios/editar/:id', async (req, res) => {
    const idAnuncio = req.params.id;
    const novosValores = req.body;

    if (Object.keys(novosValores).length === 0) {
        return res.json({ mensagem: "Nenhum dado para atualização fornecido" });
    }

    try {
        const camposParaAtualizar = [];
        const valores = [];

        for (const [chave, valor] of Object.entries(novosValores)) {
            if (chave === 'id') continue;

            camposParaAtualizar.push(`${chave} = ?`);
            valores.push(valor);
        }

        if (camposParaAtualizar.length === 0) {
            return res.json({ mensagem: "Nenhum campo fornecido para atualizacao" })
        }

        const sql = `UPDATE anuncio SET ${camposParaAtualizar.join(', ')} WHERE id = ?`;
        valores.push(idAnuncio);
        const [resultado] = await pool.execute(sql, valores);

        if (resultado.affectedRows === 0) {
            return res.json({ mensagem: `Anuncio com id ${idAnuncio} não encontradoo para atualizacao` });
        }

        res.json({ mensagem: "Anúncio atualizad com sucesso" });

    } catch (error) {
        console.error("erro: \n", error)
    }
})

app.delete('/anuncios/deletar/:id', async (req, res) => {
    try {
        const idAnuncio = req.params.id;
        const [existeAnuncio] = await pool.execute("SELECT * FROM anuncio WHERE id = " + idAnuncio);

        if (existeAnuncio.length > 0) {
            await pool.execute("DELETE FROM anuncio WHERE id = " + idAnuncio);
            return res.json({ mensagem: "anuncio excluido com sucesso" });
        } else {
            return res.json({ mensagem: "anuncio não encontrado" });
        }
    } catch (error) {
        console.error("erro: ", error);
    }
})

app.listen(8002, () => { console.log("servidor rodando em 8002") })