import { useState, useEffect } from 'react';

/**
 * Componente que exibe a miniatura de um arquivo de imagem.
 * Lida com a criação e revogação da URL temporária.
 * @param {object} props
 * @param {File} props.file 
 */
function MiniaturaImagem({ file }) {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        if (!file || !(file instanceof File)) {
            return;
        }

        const url = URL.createObjectURL(file);
        setImageURL(url);

        return () => URL.revokeObjectURL(url);
    }, [file]); 

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