import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa6(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 5;
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
                        <label htmlFor="entreEixos">Entre eixos</label>
                        <input type="text" name="entreEixos" value={formulario.entreEixos} onChange={controlaEstado}/>
                        <label htmlFor="estilo">Estilo</label>
                        <input type="text" name="estilo" value={formulario.estilo} onChange={controlaEstado}/>
                        <label htmlFor="ignicao">Ignição</label>
                        <input type="text" name="ignicao" value={formulario.ignicao} onChange={controlaEstado}/>
                        <label htmlFor="larguraTotal">Largura Total</label>
                        <input type="text" name="larguraTotal" value={formulario.larguraTotal} onChange={controlaEstado}/>
                        <label htmlFor="lubrificacao">Lubrificação</label>
                        <input type="text" name="lubrificacao" value={formulario.lubrificacao} onChange={controlaEstado}/>
                        <label htmlFor="motor">Motor</label>
                        <input type="text" name="motor" value={formulario.motor} onChange={controlaEstado}/>
                    </div>
                </div>
            </section>
        </>
    )
}