import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";

export default function Etapa1() {
    const {formulario} = useContext(EditarAnuncioContext);
    const {controlaEstado} = useContext(EditarAnuncioContext);

    return (
        <>
            <div>
                <h2>Preencha os dados do véiculo</h2>

                <label htmlFor="marca">Marca *</label>
                <input type="text" id="marca" name="marca" value={formulario.marca} onChange={controlaEstado} required />
                <label htmlFor="modelo">Modelo *</label>
                <input type="text" id="modelo" name="modelo" value={formulario.modelo} onChange={controlaEstado} required />
                <div>
                    <label htmlFor="anoModelo">Ano modelo *</label>
                    <input type="text" name="anoModelo" value={formulario.anoModelo} onChange={controlaEstado} required />
                    <label htmlFor="anoFabricacao">Ano Fabricação *</label>
                    <input type="text" name="anoFabricacao" value={formulario.anoFabricacao} onChange={controlaEstado} required />
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
        </>
    );
}