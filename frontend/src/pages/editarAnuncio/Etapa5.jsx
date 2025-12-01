import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";

export default function Etapa5() {
    const { formulario, controlaEstado } = useContext(EditarAnuncioContext);
    return (
        <>
            <div>
                <h2>Preencha os dados do véiculo</h2>
                <label htmlFor="entreEixos">Entre eixos</label>
                <input type="text" name="entreEixos" value={formulario.entreEixos} onChange={controlaEstado} />
                <label htmlFor="comprimentoTotal">Comprimento Total</label>
                <input type="text" name="comprimentoTotal" value={formulario.comprimentoTotal} onChange={controlaEstado} />
                <label htmlFor="ignicao">Ignição</label>
                <input type="text" name="ignicao" value={formulario.ignicao} onChange={controlaEstado} />
                <label htmlFor="larguraTotal">Largura Total</label>
                <input type="text" name="larguraTotal" value={formulario.larguraTotal} onChange={controlaEstado} />
                <label htmlFor="lubrificacao">Lubrificação</label>
                <input type="text" name="lubrificacao" value={formulario.lubrificacao} onChange={controlaEstado} />
                <label htmlFor="motor">Motor</label>
                <select name="motor" value={formulario.motor} onChange={controlaEstado}>
                    <option value="" disabled hidden>Selecione o Tipo de Motor --</option>
                    <option value="V2, four-stroke">V2, quatro tempos</option>
                    <option value="V4, four-stroke">V4, quatro tempos</option>
                    <option value="Single cylinder, two-stroke">Monocilíndrico, dois tempos</option>
                    <option value="Single cylinder, four-stroke">Monocilíndrico, quatro tempos</option>
                    <option value="Twin, two-stroke">Bicilíndrico, dois tempos</option>
                    <option value="Twin, four-stroke">Bicilíndrico, quatro tempos</option>
                    <option value="Electric">Elétrico</option>
                    <option value="In-line four, four-stroke">Quatro cilindros em linha, quatro tempos</option>
                    <option value="In-line six, four-stroke">Seis cilindros em linha, quatro tempos</option>
                    <option value="Two cylinder boxer, four-stroke">Bicilíndrico boxer, quatro tempos</option>
                    <option value="In-line three, four-stroke">Três cilindros em linha, quatro tempos</option>
                </select>
            </div>
        </>
    );
}