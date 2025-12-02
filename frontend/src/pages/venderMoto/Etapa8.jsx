import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";
import { pegarUsuarioLogado } from "../../helper/auth.js";

export default function Etapa8() {
    const usuario = pegarUsuarioLogado();
    const { formulario, resetarFormulario, controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 7;
    const navigate = useNavigate();

    const cadastrarMoto = async () => {
        const formData = new FormData();

        if (formulario.imagens && formulario.imagens.length > 0) {
            formulario.imagens.forEach(img => {
                formData.append("imagens", img);
            });
        }

        Object.entries(formulario).forEach(([key, value]) => {
            if (key !== "imagens" || key !== "idUsuario") {
                formData.append(key, value ?? "");
            }
        });

        formData.set("idUsuario", usuario.id)

        try {
            const token = localStorage.getItem("token");

            const resMotoAndImagens = await fetch("http://localhost:1331/motos/cadastrar", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData,
            });

            const resultadoMotoAndImagens = await resMotoAndImagens.json();

            let anuncioMoto = {
                id_usuario: usuario.id,
                id_moto: resultadoMotoAndImagens.idMoto,
                preco: formulario.preco,
                localizacao: formulario.localizacao,
                descricao: formulario.descricao
            }

            const resAnuncio = await fetch("http://localhost:1334/anuncios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(anuncioMoto),
            });
            const resultadoAnuncioMoto = await resAnuncio.json();
            resetarFormulario();
            navigate('/home')
            alert(resultadoAnuncioMoto.mensagem);
        } catch (error) {
            console.error("erro: \n\t", error);
        }
    };

    return (
        <>
            <div className="cadastroMoto-botoes">
                <button className="voltar" onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa - 1}`)}>
                    Voltar
                </button>
                <button className="btnCadastroMoto" onClick={() => cadastrarMoto()}>Cadastrar moto e anúncia-la</button>
            </div>
            <div className="cadastroMoto-container">
                <div className="cadastroMoto-steps">
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Destaque seu anúncio</h4>
                </div>
                <div>
                    <div>
                        <h2>Preencha os dados do véiculo</h2>
                        <label htmlFor="refrigeracao">Refrigeração</label>
                        <select name="refrigeracao">
                            <option value="" disabled hidden>Refrigeração</option>
                            <option value="Air">Ar</option>
                            <option value="Liquid">Liquída</option>
                            <option value="Oil & air">Ar e óleo</option>
                        </select>
                        <label htmlFor="suspensaoDianteira">Suspensão Dianteira</label>
                        <input type="text" name="suspensaoDianteira" value={formulario.suspensaoDianteira} onChange={controlaEstado} />
                        <label htmlFor="suspensaoTraseira">Suspensão Traseira</label>
                        <input type="text" name="suspensaoTraseira" value={formulario.suspensaoTraseira} onChange={controlaEstado} />
                        <label htmlFor="taxaCompressao">Taxa compressão</label>
                        <input type="text" name="taxaCompressao" value={formulario.taxaCompressao} onChange={controlaEstado} />
                        <label htmlFor="torque">Torque</label>
                        <input type="text" name="torque" value={formulario.torque} onChange={controlaEstado} />
                        <label htmlFor="transmissao">Transmissão</label>
                        <input type="text" name="transmissao" value={formulario.transmissao} onChange={controlaEstado} />
                        <label htmlFor="valvulasPorCilindro">Valvúlas por Cilindro</label>
                        <input type="text" name="valvulasPorCilindro" value={formulario.valvulasPorCilindro} onChange={controlaEstado} />
                    </div>
                </div>
            </div>
        </>
    )
}