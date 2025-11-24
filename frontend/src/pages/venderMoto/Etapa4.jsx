import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa4(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 3;
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
                        <label for="alimentacao">Alimentação</label>
                        <input type="text" name="alimentacao" value={formulario.alimentacao} onChange={controlaEstado}/>
                        <label for="alturaTotal">Altura total</label>
                        <input type="text" name="alturaTotal" value={formulario.alturaTotal} onChange={controlaEstado}/>
                        <label for="caixaMarchas">Marchas</label>
                        <input type="text" name="caixaMarchas" value={formulario.caixaMarchas} onChange={controlaEstado}/>
                        <label for="capacidadeCombustivel">Capacidade do tanque de combustível</label>
                        <input type="text" name="capacidadeCombustivel" value={formulario.capacidadeCombustivel} onChange={controlaEstado}/>
                        <label for="comandoCombustivel">Comando combustível</label>
                        <input type="text" name="comandoCombustivel" value={formulario.comandoCombustivel} onChange={controlaEstado}/>
                        <label for="embreagem">Embreagem</label>
                        <input type="text" name="embreagem" value={formulario.embreagem} onChange={controlaEstado}/>
                    </div>
                </div>
            </section>
        </>
    )
}