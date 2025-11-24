import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa5(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 4;
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
                        <label htmlFor="cursoRodaDianteira">Curso Roda Dianteira</label>
                        <input type="text" name="cursoRodaDianteira" value={formulario.cursoRodaDianteira} onChange={controlaEstado}/>
                        <label htmlFor="cursoRodaTraseira">Curso Roda Traseira</label>
                        <input type="text" name="cursoRodaTraseira" value={formulario.cursoRodaTraseira} onChange={controlaEstado}/>
                        <label htmlFor="freiosDianteiros">Freios Dianteiros</label>
                        <input type="text" name="freiosDianteiros" value={formulario.freiosDianteiros} onChange={controlaEstado}/>
                        <label htmlFor="freiosTraseiros">Freios Traseiros</label>
                        <input type="text" name="freiosTraseiros" value={formulario.freiosTraseiros} onChange={controlaEstado}/>
                        <label htmlFor="diametroCuros">Diametro Curso</label>
                        <input type="text" name="diametroCurso" value={formulario.diametroCurso} onChange={controlaEstado}/>
                        <label htmlFor="distanciaSolo">Distância para o solo</label>
                        <input type="text" name="distanciaSolo" value={formulario.distanciaSolo} onChange={controlaEstado}/>
                    </div>
                </div>
            </section>
        </>
    )
}