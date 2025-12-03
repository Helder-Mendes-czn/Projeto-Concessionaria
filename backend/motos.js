import upload from './uploads/multerConfig.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './mySql2.js';
import autenticarToken from './middleware/autenticarToken.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

function fixValue(v) {
    return (v === "" || v === undefined || v === "undefined") ? null : v;
}

app.get('/motos/buscar', async (req, res) => {
    try {
        const filtros = req.query;
        const valores = [];
        let sql = 'SELECT * FROM moto WHERE id =1201';

        if (Object.keys(filtros).length > 0) {
            const condicoes = Object.entries(filtros).map(([chave, valor]) => {
                valores.push(`%${valor}%`);
                return `${chave} LIKE ?`;
            })
            sql += " WHERE " + condicoes.join(" AND ")
        }

        const [resultado] = await pool.execute(sql, valores);
        res.json(resultado);
    } catch (error) {
        console.error("ERRO: ", error);
    }
})

app.post('/motos/cadastrar', autenticarToken, upload.array("imagens", 10), async (req, res) => {
    try {
        if (req.usuario.tipo !== "Usuário Vendedor") {
            return res.status(403).json({ mensagem: "Apenas usuários vendedores podem cadastrar motos" });
        }   

        console.log("REQ BODY: \n", req.body);

        const valores = req.body;
        const imagens = req.files.map(file => file.filename);
        let sql = "INSERT INTO moto(id_usuario, marca, modelo, ano_modelo, ano_fabricacao, estilo, cilindrada, motor, potencia, torque, taxa_compressao, diametro_curso, valvulas_por_cilindro, alimentacao, comando_combustivel, ignicao, lubrificacao,refrigeracao, caixa_marchas, transmissao, embreagem, quadro, suspensao_dianteira, curso_roda_dianteira, suspensao_traseira, curso_roda_traseira, pneu_dianteiro, pneu_traseiro,freios,freios_dianteiros, freios_traseiros, peso_total, altura_assento, altura_total, comprimento_total, largura_total, distancia_solo, entre_eixos, capacidade_combustivel, partida, quilometragem, cor_principal, cor_secundaria)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

        if (valores.marca == undefined || valores.modelo == undefined || (valores.anoModelo == undefined && valores.anoFabricacao == undefined && valores.ano == undefined) || valores.estilo == undefined) {
            return res.json({ mensagem: "marca, estilo, modelo e ano são atributos obrigatórios por favor registre" })
        }

        let [resultado] = await pool.execute(sql, [
            valores.idUsuario || null,
            valores.marca || null,
            valores.modelo || null,
            valores.anoModelo || null,
            valores.anoFabricacao || null,
            valores.estilo,
            valores.cilindrada || null,
            valores.motor || null,
            valores.potencia || null,
            valores.torque || null,
            valores.taxaCompressao || null,
            valores.diametroCurso || null,
            valores.valvulasPorCilindro || null,
            valores.alimentacao || null,
            valores.comandoCombustivel || null,
            valores.ignicao || null,
            valores.lubrificacao || null,
            valores.refrigeracao || null,
            valores.caixaMarchas || null,
            valores.transmissao || null,
            valores.embreagem || null,
            valores.quadro || null,
            valores.suspensaoDianteira || null,
            valores.cursoRodaDianteira || null,
            valores.suspensaoTraseira || null,
            valores.cursoRodaTraseira || null,
            valores.pneuDianteiro || null,
            valores.pneuTraseiro || null,
            valores.freios || null,
            valores.freiosDianteiros || null,
            valores.freiosTraseiros || null,
            valores.pesoTotal || null,
            valores.alturaAssento || null,
            valores.alturaTotal || null,
            valores.comprimentoTotal || null,
            valores.larguraTotal || null,
            valores.distanciaSolo || null,
            valores.entreEixos || null,
            valores.capacidadeCombustivel || null,
            valores.partida || null,
            valores.quilometragem || null,
            valores.corPrincipal || null,
            valores.corSecundaria || null]);

        const idMoto = resultado.insertId

        for (let img of imagens) {
            await pool.execute("INSERT INTO moto_imagens (id_moto, imagem) VALUES(?, ?)", [idMoto, img]);
        }

        res.json({ mensagem: `${valores.marca} ${valores.modelo} inserida com sucesso`, idMoto })
    } catch (error) {
        console.error("erro: ", error);
    }
})

app.put('/motos/editar/:id', autenticarToken, upload.array("novasImagens", 10), async (req, res) => {
    if (req.usuario.tipo !== "Usuário Vendedor") {
        return res.status(403).json({ mensagem: "Apenas usuários vendedores podem editar motos." });
    }

    const idMoto = req.params.id;
    const v = req.body;
    const novasImagens = req.files.map(file => file.filename) || [];

    try {
        const sql = `UPDATE moto SET marca = ?,  modelo = ?,  ano = ?,  ano_modelo = ?,  ano_fabricacao = ?,  estilo = ?,  cilindrada = ?,  motor = ?,  potencia = ?,  torque = ?,  taxa_compressao = ?,  diametro_curso = ?,  valvulas_por_cilindro = ?,  alimentacao = ?,  comando_combustivel = ?,  ignicao = ?,  lubrificacao = ?,  refrigeracao = ?,  caixa_marchas = ?,  transmissao = ?,  embreagem = ?,  quadro = ?,  suspensao_dianteira = ?,  curso_roda_dianteira = ?,  suspensao_traseira = ?,  curso_roda_traseira = ?,  pneu_dianteiro = ?,  pneu_traseiro = ?, freios = ?, freios_dianteiros = ?,  freios_traseiros = ?,  peso_total = ?,  altura_assento = ?,  altura_total = ?,  comprimento_total = ?,  largura_total = ?,  distancia_solo = ?,  entre_eixos = ?,  capacidade_combustivel = ?,  partida = ?,  quilometragem = ?,  cor_principal = ?, cor_secundaria = ? WHERE id = ?`;
        const params = [fixValue(v.marca), fixValue(v.modelo), fixValue(v.ano), fixValue(v.anoModelo), fixValue(v.anoFabricacao), fixValue(v.estilo), fixValue(v.cilindrada), fixValue(v.motor), fixValue(v.potencia), fixValue(v.torque), fixValue(v.taxaCompressao), fixValue(v.diametroCurso), fixValue(v.valvulasPorCilindro), fixValue(v.alimentacao), fixValue(v.comandoCombustivel), fixValue(v.ignicao), fixValue(v.lubrificacao), fixValue(v.refrigeracao), fixValue(v.caixaMarchas), fixValue(v.transmissao), fixValue(v.embreagem), fixValue(v.quadro), fixValue(v.suspensaoDianteira), fixValue(v.cursoRodaDianteira), fixValue(v.suspensaoTraseira), fixValue(v.cursoRodaTraseira), fixValue(v.pneuDianteiro), fixValue(v.pneuTraseiro), fixValue(v.freios),fixValue(v.freiosDianteiros), fixValue(v.freiosTraseiros), fixValue(v.pesoTotal), fixValue(v.alturaAssento), fixValue(v.alturaTotal), fixValue(v.comprimentoTotal), fixValue(v.larguraTotal), fixValue(v.distanciaSolo), fixValue(v.entreEixos), fixValue(v.capacidadeCombustivel), fixValue(v.partida), fixValue(v.quilometragem), fixValue(v.corPrincipal), fixValue(v.corSecundaria), idMoto];
        await pool.execute(sql, params);

        if (novasImagens.length > 0) {
            await pool.execute("DELETE FROM moto_imagens WHERE id_moto = ?", [idMoto]);

            for (let img of novasImagens) {
                await pool.execute(
                    "INSERT INTO moto_imagens (id_moto, imagem) VALUES (?, ?)",
                    [idMoto, img]
                );
            }
        }

        res.json({ mensagem: "Moto atualizada com sucesso!", idMoto });
    } catch (error) {
        console.error("ERRO ao editar moto: ", error);
        res.status(500).json({ mensagem: "Erro interno do servidor ao editar a moto.", error });
    }
});

app.delete('/motos/deletar', async (req, res) => {
    try {
        const idMoto = req.body.id;
        const [existeMoto] = await pool.execute("SELECT * FROM moto WHERE id = " + idMoto);

        if (existeMoto.length > 0) {
            await pool.execute("DELETE FROM moto WHERE id = " + idMoto);
            res.json({ mensagem: "moto deletada com sucesso" });
        } else {
            return res.json({ mensagem: `moto não encontraa com id igual ${idMoto}` });
        }
    } catch (error) {
        console.error('erro: ', error);
    }
});

app.listen(1331, () => { console.log('server rodando na porta 1331') })