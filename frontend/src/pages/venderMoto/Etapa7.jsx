import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa7() {
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 6;
    const navigate = useNavigate();

    return (
        <>
            <div className="cadastroMoto-botoes">
                <button className="voltar" onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa - 1}`)}>
                    Voltar
                </button>

                <button className="continuar"
                    onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa + 1}`)}>
                    Continuar
                </button>
            </div>
            <div className="cadastroMoto-container">
                <div className="cadastroMoto-steps">
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Destaque seu anúncio</h4>
                </div>
                <div>
                    <div>
                        <h2>Preencha os dados do véiculo</h2>
                        <label htmlFor="partida">Partida</label>
                        <select name="partida" value={formulario.partida} onChange={controlaEstado}>
                            <option value="" disabled hidden>Partida</option>
                            <option value="Electric">Elétrica</option>
                            <option value="Kick">Pedal</option>
                            <option value="Electric & kick">Pedal e elétrica</option>
                        </select>
                        <label htmlFor="pesoTotal">Peso Total</label>
                        <input type="text" name="pesoTotal" value={formulario.pesoTotal} onChange={controlaEstado} />
                        <label htmlFor="pneuDianteiro">Pneu Dianteiro</label>
                        <input type="text" name="pneuDianteiro" value={formulario.pneuDianteiro} onChange={controlaEstado} />
                        <label htmlFor="pneuTraseiro">Pneu Traseiro</label>
                        <input type="text" name="pneuTraseiro" value={formulario.pneuTraseiro} onChange={controlaEstado} />
                        <label htmlFor="potencia">Potência</label>
                        <input type="text" name="potencia" value={formulario.potencia} onChange={controlaEstado} />
                        <label htmlFor="quadro">Quadro</label>
                        <input type="text" name="quadro" value={formulario.quadro} onChange={controlaEstado} />
                    </div>
                </div>
            </div>
        </>
    )
}