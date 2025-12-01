import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";

export default function Etapa4() {
    const {formulario, controlaEstado} = useContext(EditarAnuncioContext);
    return (
        <>
            <div>
                <h2>Preencha os dados do véiculo</h2>
                <label htmlFor="cursoRodaDianteira">Curso Roda Dianteira</label>
                <input type="text" name="cursoRodaDianteira" value={formulario.cursoRodaDianteira} onChange={controlaEstado} />
                <label htmlFor="cursoRodaTraseira">Curso Roda Traseira</label>
                <input type="text" name="cursoRodaTraseira" value={formulario.cursoRodaTraseira} onChange={controlaEstado} />
                <label htmlFor="freios">Freios</label>
                <select name="freios" value={formulario.freios} onChange={controlaEstado}>
                    <option value="" disabled hidden>Selecione o tipo de freios</option>
                    <option value="disc / disc">Disco / Disco</option>
                    <option value="brake / disc">Tambor / Disco</option>
                    <option value="disc / brake">Disco / Tambor</option>
                    <option value="brake / brake">Tambor / Tambor</option>
                </select>
                <label htmlFor="diametroCuros">Diametro Curso</label>
                <input type="text" name="diametroCurso" value={formulario.diametroCurso} onChange={controlaEstado} />
                <label htmlFor="distanciaSolo">Distância para o solo</label>
                <input type="text" name="distanciaSolo" value={formulario.distanciaSolo} onChange={controlaEstado} />
            </div>
        </>
    );
}