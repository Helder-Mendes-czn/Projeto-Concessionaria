import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa4() {
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 3;
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
                        <select name="alimentacao" value={formulario.alimentacao} onChange={controlaEstado}>
                            <option value="">Alimentacao</option>
                            <option value="Carburettor">Carburador</option>
                            <option value="Injection">Injeção eletrônica</option>
                        </select>
                        <label htmlFor="alturaTotal">Altura total</label>
                        <input type="text" name="alturaTotal" value={formulario.alturaTotal} onChange={controlaEstado} />
                        <label htmlFor="caixaMarchas">Marchas</label>
                        <select name="caixaMarchas" value={formulario.caixaMarchas} onChange={controlaEstado}>
                            <option value="" disabled hidden> Marchas</option>
                            <option value="Automatic">Automática</option>
                            <option value="1-speed">1-speed</option>
                            <option value="2-speed">2-speed</option>
                            <option value="3-speed">3-speed</option>
                            <option value="4-speed">4-speed</option>
                            <option value="5-speed">5-speed</option>
                            <option value="6-speed">6-speed</option>
                            <option value="7-speed">7-speed</option>
                            <option value="8-speed">8-speed</option>
                        </select>
                        <label htmlFor="capacidadeCombustivel">Capacidade do tanque de combustível</label>
                        <input type="text" name="capacidadeCombustivel" value={formulario.capacidadeCombustivel} onChange={controlaEstado} />
                        <label htmlFor="comandoCombustivel">Comando combustível</label>
                        <input type="text" name="comandoCombustivel" value={formulario.comandoCombustivel} onChange={controlaEstado} />
                        <label htmlFor="embreagem">Embreagem</label>
                        <input type="text" name="embreagem" value={formulario.embreagem} onChange={controlaEstado} />
                    </div>
                </div>
            </div>
        </>
    )
}