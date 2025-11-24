import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";

export default function Etapa3(){
    const { formulario } = useContext(MotoCadastroContext);
    const { controlaEstado } = useContext(MotoCadastroContext);
    const numeroEtapa = 2;
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
                        <label for="quilometragem">Quilometragem *</label>
                        <input type="text" name="quilometragem" value={formulario.quilometragem} onChange={controlaEstado} required/>
                        <label for="descricao">Descrição da moto *</label>
                        <input type="text" name="descricao" value={formulario.descricao} onChange={controlaEstado} required/>
                        <label for="preco">Preço *</label>
                        <input type="text" name="preco" value={formulario.preco} onChange={controlaEstado} required/>
                        <label for="imagens">Imagens da moto *</label>
                        <input type="file" name="imagens" accept="image/*" multiple onChange={(e) => controlaEstado("imagens", Array.from(e.target.files))}/>
                        <label for="localizacao">Localização *</label>
                        <input type="text" name="localizacao" value={formulario.localizacao} onChange={controlaEstado} required/>
                        <label for="cilindrada">Cilindradas *</label>
                        <input type="text" name="cilindrada" value={formulario.cilindrada} onChange={controlaEstado} required/>
                    </div>
                </div>
            </section>
        </>
    )
}
