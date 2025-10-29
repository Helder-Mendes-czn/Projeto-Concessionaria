const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('../mySql2');
const apiKey = 'j3T0PAWdMgeUS/rPua/suA==brhyBNIt4oepj7Ef';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/motos/inserir', async (req, res) => {
    try {
        const marcas = [
            "Amazon Motors", "Aprilia", "Atman", "Bajaj", "Bimota", "Bmw", "Buell", "Bull", "Cagiva", "Can-am",
            "Cfmoto", "Dafra", "Ducati", "Fun Motors", "Fym", "Garinni", "Gas Gas", "Gloov", "Guzzi", "Goo",
            "Haojue", "Harley-davidson", "Hisun", "Honda", "Husqvarna", "Indian", "Jincheng", "Kasinski",
            "Kawasaki", "Kingger Racing", "Ktm", "Kymco", "Lambretta", "Leva", "Linzhi", "Lml", "Malaguti",
            "Mobyou", "Moto Chefe", "Moto Guzzi", "Moto Morini", "Motorino", "Ms Eletric", "Muuv", "Mv Agusta",
            "Mxf", "Niu", "Peugeot", "Piaggio", "Polaris", "Riguete", "Royal Enfield", "Sachs", "Sherco",
            "Shineray", "Sundown", "Super Soco", "Suzuki", "Triumph", "Ventane", "Vespa", "Voltz", "Watts",
            "Wayy", "Yadea", "Yamaha", "Zontes"
        ];

        let totalInseridas = 0;

        for (const marca of marcas) {
            try {
                const url = `https://api.api-ninjas.com/v1/motorcycles?make=${marca}`;
                const resposta = await fetch(url, { headers: { "X-API-KEY": apiKey } });
                const motos = await resposta.json();

                for (const m of motos) {
                    const sql = `INSERT INTO moto (
              marca, modelo, ano, tipo, cilindrada, motor, potencia, torque, taxa_compressao, diametro_curso,
              valvulas_por_cilindro, sistema_combustivel, comando_combustivel, ignicao, lubrificacao,refrigeracao, caixa_marchas, transmissao, embreagem, quadro, suspensao_dianteira,
              curso_roda_dianteira, suspensao_traseira, curso_roda_traseira, pneu_dianteiro, pneu_traseiro,freios_dianteiros, freios_traseiros, peso_total, altura_assento, altura_total, comprimento_total,
              largura_total, distancia_solo, entre_eixos, capacidade_combustivel, partida)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

                    const valores = [
                        m.make || null, m.model || null, m.year || null, m.type || null, m.displacement || null,
                        m.engine || null, m.power || null, m.torque || null, m.compression || null, m.bore_stroke || null,
                        m.valves_per_cylinder || null, m.fuel_system || null, m.fuel_control || null, m.ignition || null,
                        m.lubrication || null, m.cooling || null, m.gearbox || null, m.transmission || null,
                        m.clutch || null, m.frame || null, m.front_suspension || null, m.front_wheel_travel || null,
                        m.rear_suspension || null, m.rear_wheel_travel || null, m.front_tire || null, m.rear_tire || null,
                        m.front_brakes || null, m.rear_brakes || null, m.total_weight || null, m.seat_height || null,
                        m.total_height || null, m.total_length || null, m.total_width || null, m.ground_clearance || null,
                        m.wheelbase || null, m.fuel_capacity || null, m.starter || null
                    ];

                    try {
                        await pool.execute(sql, valores);
                        totalInseridas++;
                    } catch (erro) {
                        console.error(`❌ Erro ao inserir moto de ${marca}:`, erro.message);
                    }
                }

                console.log(`✅ Inseridas ${motos.length} motos da marca ${marca}`);
            } catch (erro) {
                console.error(`⚠️ Erro ao buscar/inserir motos da marca ${marca}:`, erro.message);
            }
        }

        res.json({ mensagem: `Inserção concluída! Total de motos inseridas: ${totalInseridas}` });
    } catch (erro) {
        console.error("Erro geral:", erro);
        res.status(500).json({ erro: "Falha ao inserir motos" });
    }
});



app.get('/motos/lista', async (req, res) => {
    try {
        const [resultado] = await pool.execute("SELECT * FROM moto");
        res.json(resultado);
    } catch (error) {
        console.error('erro: ', error)
    }
})

app.get('/motos/buscar', async (req, res) => {
    try {
        const filtros = req.query;
        const valores = [];
        let sql = 'SELECT * FROM moto';

        if (Object.keys(filtros).length > 0) {
            const condicoes = Object.entries(filtros).map(([chave, valor]) => {
                valores.push(`%${valor}%`);
                return `${chave} LIKE ?`;
            });
            sql += " WHERE " + condicoes.join(" AND ");
        }

        const [resultado] = await pool.execute(sql, valores);
        res.json(resultado);
    } catch (error) {
        console.error("Erro ao buscar motos: ", error);
        res.status(500).json({ erro: "Erro ao buscar motos filtradas" });
    }
})



app.listen(8000, () => { console.log('servidor rodando na porta 8000') });

