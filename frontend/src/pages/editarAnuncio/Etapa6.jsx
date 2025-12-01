import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";

export default function Etapa6() {
    const { formulario, controlaEstado } = useContext(EditarAnuncioContext);

    return (
        <>
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
        </>
    );
}