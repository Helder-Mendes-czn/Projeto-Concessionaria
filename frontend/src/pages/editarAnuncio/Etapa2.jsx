import { useContext } from "react";
import EditarAnuncioContext from "../../context/EditarAnuncio/EditarAnuncioContext";
import MiniaturaImagem from './MiniaturaImagem';

export default function Etapa2() {
    const {formulario, controlaEstado} = useContext(EditarAnuncioContext);
    const imagensSelecionadas = formulario.imagens || [];
    
    return (
        <>
            <div>
                <h2>Preencha os dados do véiculo</h2>
                <label htmlFor="quilometragem">Quilometragem *</label>
                <input type="text" name="quilometragem" value={formulario.quilometragem} onChange={controlaEstado} required />
                <label htmlFor="descricao">Descrição da moto *</label>
                <input type="text" name="descricao" value={formulario.descricao} onChange={controlaEstado} required />
                <label htmlFor="preco">Preço *</label>
                <input type="text" name="preco" value={formulario.preco} onChange={controlaEstado} required />
                <label htmlFor="imagens">Imagens da moto *</label>
                <input type="file" name="imagens" accept="image/*" multiple onChange={(e) => {controlaEstado("imagens", Array.from(e.target.files)); console.log(e.target.files); console.log(formulario.imagens)}} />
                <br/>
                
                {imagensSelecionadas.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                        {imagensSelecionadas.map((file, index) => (
                            <MiniaturaImagem 
                                key={file.name + file.size + index} 
                                file={file} 
                            />
                        ))}
                    </div>
                )}
                
                <label htmlFor="localizacao">Localização *</label>
                <input type="text" name="localizacao" value={formulario.localizacao} onChange={controlaEstado} required />
                <label htmlFor="cilindrada">Cilindradas *</label>
                <input type="text" name="cilindrada" value={formulario.cilindrada} onChange={controlaEstado} required />
            </div>
        </>
    );
}