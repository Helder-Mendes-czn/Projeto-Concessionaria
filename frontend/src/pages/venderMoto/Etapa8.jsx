import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa8(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 7;
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => { navigate(`/anuncios/venderMoto/etapa${numeroEtapa + 1}`); console.log(formulario); console.log(formulario.idUsuario) }}>continuar</button>
            <button onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa - 1}`)}>voltar</button>
            <section>
                <div>
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Destaque seu anúncio</h4>
                </div>
                <div>
                    <div>
                        <h2>Preencha os dados do véiculo</h2>
                        <label htmlFor="refrigeracao">Refrigeração</label>
                        <input type="text" name="refrigeracao" value={formulario.refrigeracao} onChange={controlaEstado}/>
                        <label htmlFor="suspensaoDianteira">Suspensão Dianteira</label>
                        <input type="text" name="suspensaoDianteira" value={formulario.suspensaoDianteira} onChange={controlaEstado}/>
                        <label htmlFor="suspensaoTraseira">Suspensão Traseira</label>
                        <input type="text" name="suspensaoTraseira" value={formulario.suspensaoTraseira} onChange={controlaEstado}/>
                        <label htmlFor="taxaCompressao">Taxa compressão</label>
                        <input type="text" name="taxaCompressao" value={formulario.taxaCompressao} onChange={controlaEstado}/>
                        <label htmlFor="torque">Torque</label>
                        <input type="text" name="torque" value={formulario.torque} onChange={controlaEstado}/>
                        <label htmlFor="transmissao">Transmissão</label>
                        <input type="text" name="transmissao" value={formulario.transmissao} onChange={controlaEstado}/>
                        <label htmlFor="valvulasPorCilindro">Valvúlas por Cilindro</label>
                        <input type="text" name="valvulasPorCilindro" value={formulario.valvulasPorCilindro} onChange={controlaEstado}/>
                        <label htmlFor="comprimentoTotal">Comprimento Total</label>
                        <input type="text" name="comprimentoTotal" value={formulario.comprimentoTotal} onChange={controlaEstado}/>
                    </div>
                </div>
            </section>
        </>
    )
}