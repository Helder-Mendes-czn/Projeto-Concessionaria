import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";

export default function Etapa3() {
    const {formulario, controlaEstado} = useContext(EditarAnuncioContext);
    console.log(formulario.caixaMarchas)

    return (
        <>
            <div>
                <h2>Preencha os dados do véiculo</h2>
                <select name="alimentacao">
                    <option value="" disabled hidden>Alimentacao</option>
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
        </>
    );
}