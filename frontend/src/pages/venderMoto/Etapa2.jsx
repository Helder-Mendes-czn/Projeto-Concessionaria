import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext.jsx";

export default function Etapa2() {
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);

    const navigate = useNavigate();
    const numeroEtapa = 1;


    return (
        <>
            <div className="cadastroMoto-botoes">
                <button className="voltar" onClick={() => navigate("/anuncios/venderMoto/")}>
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

                        <label htmlFor="marca">Marca *</label>
                        <input type="text" id="marca" name="marca" value={formulario.marca} onChange={controlaEstado} required />
                        <label htmlFor="modelo">Modelo *</label>
                        <input type="text" id="modelo" name="modelo" value={formulario.modelo} onChange={controlaEstado} required />
                        <div className="cadastroMoto-dupla">

                            <div>
                                <label htmlFor="anoModelo">Ano modelo *</label>
                                <input
                                    type="text"
                                    id="anoModelo"
                                    name="anoModelo"
                                    value={formulario.anoModelo}
                                    onChange={controlaEstado}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="anoFabricacao">Ano Fabricação *</label>
                                <input
                                    type="text"
                                    id="anoFabricacao"
                                    name="anoFabricacao"
                                    value={formulario.anoFabricacao}
                                    onChange={controlaEstado}
                                    required
                                />
                            </div>

                        </div>
                        <select name="estilo" value={formulario.estilo} onChange={controlaEstado}>
                            <option value="">Selecione o Estilo</option>
                            <option value="Ciclomotor">Ciclomotor</option>
                            <option value="Custom">Custom</option>
                            <option value="Eletric">Elétrica</option>
                            <option value="Sport">Esportiva</option>
                            <option value="Naked">Naked</option>
                            <option value="offroad">OffRoad</option>
                            <option value="Quadriciclo">Quadriciclo</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Street">Street</option>
                            <option value="Supermotard">Supermotard</option>
                            <option value="Touring">Touring</option>
                            <option value="Trail">Trail</option>
                            <option value="Triciclo">Triciclo</option>
                            <option value="Utilitaria">Utilitária</option>
                            <option value="Classica">Clássica</option>
                            <option value="ATV">ATV</option>
                            <option value="SportTouring">Sport Touring</option>
                            <option value="Cross">Cross / Motocross</option>
                            <option value="Minimoto">Minimoto / Cross</option>
                        </select>
                        <label htmlFor="corPrincipal">Cor predominante *</label>
                        <input type="text" name="corPrincipal" id="corPrincipal" value={formulario.corPrincipal} onChange={controlaEstado} required />
                        <label htmlFor="corSecundaria">Cor secundária *</label>
                        <input type="text" name="corSecundaria" id="corSecundaria" value={formulario.corSecundaria} onChange={controlaEstado} required />
                    </div>
                </div>
            </div>
        </>
    )
}