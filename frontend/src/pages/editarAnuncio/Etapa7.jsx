import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";
import { useParams, useNavigate } from "react-router-dom";

export default function Etapa7({ usuario }) {
    const { formulario, controlaEstado } = useContext(EditarAnuncioContext);
    const {id,idAnuncio} = useParams();
    const navigate = useNavigate();

    const editarAnuncio = async () => {
        const formData = new FormData();

        if (formulario.imagens && formulario.imagens.length > 0) {
            formulario.imagens.forEach(img => {
                formData.append("novasImagens", img);
            });
        }

        Object.entries(formulario).forEach(([key, value]) => {
            if (key !== "novasImagens" ) {
                formData.append(key, value ?? "");
            }
        });

        formData.append("idVendedor", usuario.id);

        try {
            const token = localStorage.getItem("token");

            const resMotoAndImagens = await fetch(`http://localhost:8001/motos/editar/${formulario.idMoto}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })

            const resultadoMotoAndImagens = await resMotoAndImagens.json();

            let anuncioMoto = {
                id_usuario: usuario.id,
                id_moto: resultadoMotoAndImagens.idMoto,
                preco: formulario.preco,
                localizacao: formulario.localizacao,
                descricao: formulario.descricao
            }

            const resAnuncio = await fetch(`http://localhost:8002/anuncios/editar/${idAnuncio}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  
                },
                body: JSON.stringify(anuncioMoto),
            });
            const resultadoAnuncioMoto = await resAnuncio.json();

            console.log(resultadoAnuncioMoto);
            alert(resultadoAnuncioMoto.mensagem);
            navigate(`/usuario/${id}`);
        } catch (error) {
            console.error("erro: \n\t", error);
        }
    };

    return (
        <>
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
            <button onClick={() => editarAnuncio()}>Salvar alterações</button>
        </>
    );
}