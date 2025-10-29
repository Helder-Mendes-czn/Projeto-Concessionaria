const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../mySql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/motos/buscar', async (req, res) => {
    try {
        const filtros = req.query;
        const valores = [];
        let sql = 'SELECT id,marca, modelo, ano FROM moto';

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

app.post('/motos/cadastrar', async (req, res) => {
    try {
        const valores = req.body;
        let sql = "INSERT INTO moto(marca, modelo, ano, tipo, cilindrada, motor, potencia, torque, taxa_compressao, diametro_curso, valvulas_por_cilindro, sistema_combustivel, comando_combustivel, ignicao, lubrificacao,refrigeracao, caixa_marchas, transmissao, embreagem, quadro, suspensao_dianteira, curso_roda_dianteira, suspensao_traseira, curso_roda_traseira, pneu_dianteiro, pneu_traseiro,freios_dianteiros, freios_traseiros, peso_total, altura_assento, altura_total, comprimento_total, largura_total, distancia_solo, entre_eixos, capacidade_combustivel, partida)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        console.log(valores.ano);

        if (valores.marca == undefined || valores.modelo == undefined || valores.ano == undefined || valores.tipo == undefined) {
            return res.json({ mensagem: "marca, tipo, modelo e ano são atributos obrigatórios por favor registre" })
        }

        await pool.execute(sql, [
            valores.marca,
            valores.modelo,
            valores.ano,
            valores.tipo,
            valores.cilindrada || null,
            valores.motor || null,
            valores.potencia || null,
            valores.torque || null,
            valores.taxa_compressao || null,
            valores.diametro_curso || null,
            valores.valvulas_por_cilindro || null,
            valores.sistema_combustivel || null,
            valores.comando_combustivel || null,
            valores.ignicao || null,
            valores.lubrificacao || null,
            valores.refrigeracao || null,
            valores.caixa_marchas || null,
            valores.transmissao || null,
            valores.embreagem || null,
            valores.quadro || null,
            valores.suspensao_dianteira || null,
            valores.curso_roda_dianteira || null,
            valores.suspensao_traseira || null,
            valores.curso_roda_traseira || null,
            valores.pneu_dianteiro || null,
            valores.pneu_traseiro || null,
            valores.freios_dianteiros || null,
            valores.freios_traseiros || null,
            valores.peso_total || null,
            valores.altura_assento || null,
            valores.altura_total || null,
            valores.comprimento_total || null,
            valores.largura_total || null,
            valores.distancia_solo || null,
            valores.entre_eixos || null,
            valores.capacidade_combustivel || null,
            valores.partida || null]);
        res.json({ mensagem: `${valores.marca} ${valores.modelo} inserida com sucesso` })
    } catch (error) {
        console.error("erro: ", error)
    }
})

app.put('/motos/editar/:id', async (req, res) => {
    const idMoto = req.params.id;
    const novosValores = req.body;

    if (Object.keys(novosValores).length === 0) {
        return res.status(400).json({ mensagem: "Nenhum dado para atualização fornecido." });
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
            return res.status(400).json({ mensagem: "Nenhum campo válido fornecido para atualização." });
        }

        const sql = `UPDATE moto SET ${camposParaAtualizar.join(', ')} WHERE id = ?`;
        valores.push(idMoto);
        const [resultado] = await pool.execute(sql, valores);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: `Moto com ID ${idMoto} não encontrada para atualização ou nenhum dado foi alterado.` });
        }
        res.json({ mensagem: `Moto com ID ${idMoto} atualizada com sucesso.`, linhasAfetadas: resultado.affectedRows });
        
    } catch (error) {
        console.error("ERRO ao editar moto: ", error);
        res.status(500).json({ mensagem: "Erro interno do servidor ao editar a moto." });
    }
});

app.delete('/motos/deletar', async (req, res) => {
    try {
        const idMoto = req.body.id;
        const [existeMoto] = await pool.execute("SELECT * FROM moto WHERE id = "+idMoto);
        
        if (existeMoto.length > 0 ){
            await pool.execute("DELETE FROM moto WHERE id = "+idMoto);
            res.json({mensagem: "moto deletada com sucesso"});
        } else {
            return res.json({mensagem: `moto não encontraa com id igual ${idMoto}`});
        }
    } catch (error) {
        console.error('erro: ',error);
    }
}); 

app.listen(8001, () => { console.log('server rodando na porta 8001') })