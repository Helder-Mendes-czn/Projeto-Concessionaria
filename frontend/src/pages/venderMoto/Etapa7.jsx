import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa7(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 6;
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
                        <label htmlFor="partida">Partida</label>
                        <input type="text" name="partida" value={formulario.partida} onChange={controlaEstado}/>
                        <label htmlFor="pesoTotal">Peso Total</label>
                        <input type="text" name="pesoTotal" value={formulario.pesoTotal} onChange={controlaEstado}/>
                        <label htmlFor="pneuDianteiro">Pneu Dianteiro</label>
                        <input type="text" name="pneuDianteiro" value={formulario.pneuDianteiro} onChange={controlaEstado}/>
                        <label htmlFor="pneuTraseiro">Pneu Traseiro</label>
                        <input type="text" name="pneuTraseiro" value={formulario.pneuTraseiro} onChange={controlaEstado}/>
                        <label htmlFor="potencia">Potência</label>
                        <input type="text" name="potencia" value={formulario.potencia} onChange={controlaEstado}/>
                        <label htmlFor="quadro">Quadro</label>
                        <input type="text" name="quadro" value={formulario.quadro} onChange={controlaEstado}/>
                    </div>
                </div>
            </section>
        </>
    )
}