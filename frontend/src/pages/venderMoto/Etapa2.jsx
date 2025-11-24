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
            <button onClick={() => { navigate(`/anuncios/venderMoto/etapa${numeroEtapa + 1}`); console.log(formulario) }}>continuar</button>
            <button onClick={() => navigate(`/anuncios/venderMoto/`)}>voltar</button>
            <section>
                <div>
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Destaque seu anúncio</h4>
                </div>
                <div>
                    <div>
                        <h2>Preencha os dados do véiculo</h2>

                        <label for="marca">Marca *</label>
                        <input type="text" id="marca" name="marca" value={formulario.marca} onChange={controlaEstado} required />
                        <label for="modelo">Modelo *</label>
                        <input type="text" id="modelo" name="modelo" value={formulario.modelo} onChange={controlaEstado} required />
                        <div>
                            <label for="anoModelo">Ano modelo *</label>
                            <input type="text" name="anoModelo" value={formulario.anoModelo} onChange={controlaEstado} required />
                            <label for="anoFabricacao">Ano Fabricação *</label>
                            <input type="text" name="anoFabricacao" value={formulario.anoFabricacao} onChange={controlaEstado} required />
                        </div>
                        <label for="corPrincipal">Cor predominante *</label>
                        <input type="text" name="corPrincipal" id="corPrincipal" value={formulario.corPrincipal} onChange={controlaEstado} required />
                        <label for="corSecundaria">Cor secundária *</label>
                        <input type="text" name="corSecundaria" id="corSecundaria" value={formulario.corSecundaria} onChange={controlaEstado} required />
                    </div>
                </div>
            </section>
        </>
    )
}