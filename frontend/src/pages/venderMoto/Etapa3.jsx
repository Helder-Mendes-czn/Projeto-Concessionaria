import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MotoCadastroContext from "../../context/MotoCadastro/MotoCadastroContext";
import MiniaturaImagem from "../editarAnuncio/MiniaturaImagem";

export default function Etapa3() {
    const { formulario, controlaEstado } = useContext(MotoCadastroContext);
    const imagensSelecionadas = formulario.imagens || [];
    const numeroEtapa = 2;
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
                        <label htmlFor="quilometragem">Quilometragem *</label>
                        <input type="text" name="quilometragem" value={formulario.quilometragem} onChange={controlaEstado} required />
                        <label htmlFor="descricao">Descrição da moto *</label>
                        <input type="text" name="descricao" value={formulario.descricao} onChange={controlaEstado} required />
                        <label htmlFor="preco">Preço *</label>
                        <input type="text" name="preco" value={formulario.preco} onChange={controlaEstado} required />
                        <label htmlFor="imagens">Imagens da moto *</label>
                        <input type="file" name="imagens" accept="image/*" multiple onChange={(e) => { controlaEstado("imagens", Array.from(e.target.files)); console.log(e.target.files); console.log(formulario.imagens) }} />
                        <br />

                        {imagensSelecionadas.length > 0 && (
                            <div className="preview-imagens">
                                {imagensSelecionadas.map((img, index) => (
                                    <MiniaturaImagem key={index} file={img} />
                                ))}
                            </div>
                        )}

                        <label htmlFor="localizacao">Localização *</label>
                        <input type="text" name="localizacao" value={formulario.localizacao} onChange={controlaEstado} required />
                        <label htmlFor="cilindrada">Cilindradas *</label>
                        <input type="text" name="cilindrada" value={formulario.cilindrada} onChange={controlaEstado} required />
                    </div>
                </div>
            </div>
        </>
    )
}
