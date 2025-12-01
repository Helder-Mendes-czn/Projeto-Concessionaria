import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa5() {
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 4;
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
                </div>
            </div>
        </>
    )
}