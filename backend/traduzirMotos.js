import pool from "../mySql2.js";
import translate from "google-translate-api-x";

const campos = [
  "tipo", "cilindrada", "motor", "potencia", "torque",
  "taxa_compressao", "diametro_curso", "sistema_combustivel",
  "comando_combustivel", "ignicao", "lubrificacao", "refrigeracao",
  "caixa_marchas", "transmissao", "embreagem", "quadro",
  "suspensao_dianteira", "curso_roda_dianteira", "suspensao_traseira",
  "curso_roda_traseira", "pneu_dianteiro", "pneu_traseiro",
  "freios_dianteiros", "freios_traseiros", "peso_total",
  "altura_assento", "altura_total", "comprimento_total", "largura_total",
  "distancia_solo", "entre_eixos", "capacidade_combustivel", "partida"
];
const idioma = "pt";
const limiteTraducoes = 5; 

async function getValoresDistintos(campo) {
  const [rows] = await pool.query(
    `SELECT DISTINCT ${campo} AS valor FROM moto WHERE ${campo} IS NOT NULL AND ${campo} != ''`
  );
  return rows.map(r => r.valor);
}

async function verificarExistente(campo, valorOriginal) {
  const [rows] = await pool.query(
    `SELECT id FROM traducao_moto WHERE campo = ? AND valor_original = ? AND idioma = ? LIMIT 1`,
    [campo, valorOriginal, idioma]
  );
  return rows.length > 0;
}

async function salvarEmLote(traducoes) {
  if (traducoes.length === 0) return;
  const valores = traducoes.map(t => [t.campo, t.original, idioma, t.traduzido]);
  await pool.query(
    `INSERT INTO traducao_moto (campo, valor_original, idioma, valor_traduzido)
     VALUES ?`,
    [valores]
  );
}

async function traduzirTexto(texto) {
  if (!texto || typeof texto !== "string") return texto;
  try {
    const res = await translate(texto, { to: idioma });
    return res.text;
  } catch (err) {
    console.error("❌ Erro ao traduzir:", texto, "-", err.message);
    return texto;
  }
}

async function processarCampo(campo) {
  console.log(`\n🔍 Traduzindo campo: ${campo}`);
  const valores = await getValoresDistintos(campo);
  console.log(`→ ${valores.length} valores únicos encontrados.`);

  for (let i = 0; i < valores.length; i += limiteTraducoes) {
    const lote = valores.slice(i, i + limiteTraducoes);
    const resultados = await Promise.all(
      lote.map(async val => {
        if (!val) return null;
        const jaExiste = await verificarExistente(campo, val);
        if (jaExiste) {
          console.log(`✅ Já traduzido: ${campo} = "${val}"`);
          return null;
        }
        console.log(`📁 Traduzindo "${val}"...`);
        const traduzido = await traduzirTexto(val);
        return { campo, original: val, traduzido };
      })
    );

    const novos = resultados.filter(r => r !== null);
    if (novos.length > 0) {
      await salvarEmLote(novos);
      console.log(`💾 ${novos.length} traduções salvas no banco.`);
    }
  }
}

async function main() {
  console.log("🚀 Iniciando tradução automática...\n");
  for (const campo of campos) {
    await processarCampo(campo);
  }
  console.log("\n✅ Tradução finalizada com sucesso!");
  await pool.end();
}

main().catch(err => {
  console.error("💥 Erro fatal:", err);
  pool.end();
});
