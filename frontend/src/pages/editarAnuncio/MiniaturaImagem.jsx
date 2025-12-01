import { useState, useEffect } from 'react';

/**
 * Componente que exibe a miniatura de um arquivo de imagem.
 * Lida com a criação e revogação da URL temporária.
 * @param {object} props
 * @param {File} props.file O objeto File da imagem.
 */
function MiniaturaImagem({ file }) {
    const [imageURL, setImageURL] = useState(null);

    // Efeito para criar e limpar a URL temporária da imagem
    useEffect(() => {
        if (!file || !(file instanceof File)) {
            return;
        }

        // 1. Cria a URL temporária para visualização
        const url = URL.createObjectURL(file);
        setImageURL(url);

        // 2. Função de limpeza (cleanup)
        // Isso é essencial para liberar a memória do navegador 
        // quando a imagem não for mais necessária (componente desmontado)
        return () => URL.revokeObjectURL(url);
    }, [file]); // Dependência: o efeito roda novamente se o objeto 'file' mudar

    if (!imageURL) {
         return <p></p>;
    }

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            marginRight: '10px', 
            marginBottom: '10px', 
            overflow: 'hidden',
            width: '100px',
            height: '100px',
            flexShrink: 0
        }}>
            <img src={imageURL} alt={`Preview de ${file.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
    );
}

export default MiniaturaImagem;