import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";

export default function Garagem({ usuario }) {
    const [anuncios, setAnuncios] = useState([]);
    const { id } = useParams();

    const buscarAnuncios = async () => {
        try {
            const res = await fetch(`http://localhost:1333/garagem/usuario/${id}`)
            const data = await res.json();
            setAnuncios(data);
        } catch (error) {
            console.error("Erro: \n\t", error);
        }
    };

    useEffect(() => {
        buscarAnuncios();
    }, []);

    const desFavoritar = async (idAnuncio) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:1333/garagem/favoritar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ idAnuncio: idAnuncio }),
            });

            const resultado = await res.json();
            alert(resultado.mensagem);
        } catch (error) {
            console.error("erro: ", error);
        }
    };

    return (
        <>
            <h1>Meus favoritos</h1>
            <div className="container-card-anuncio">
                {anuncios.map((item) => (
                    <div key={item.anuncio.id_anuncio} className="card-anuncio">

                        <img
                            className="card-img"
                            src={item.imagens?.[0] ? `http://localhost:1333/uploads/${item.imagens[0]}` : ""}
                            alt={item.anuncio.modelo}
                        />

                        <div className="card-info">
                            <div className="card-topo">
                                <h2 className="card-titulo">
                                    {item.anuncio.marca} {item.anuncio.modelo}
                                </h2>

                                <div className="card-detalhes">
                                    <div className="card-linha">
                                        <h3>{item.anuncio.ano_modelo}/{item.anuncio.ano_fabricacao}</h3>
                                        <h3>{item.anuncio.quilometragem} Km</h3>
                                    </div>

                                    <div className="card-local">
                                        <h3>{item.anuncio.localizacao}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="card-preco">
                                <h3>R$ {item.anuncio.preco}</h3>
                            </div>
                        </div>
                        <Link to={`/anuncios/moto/${item.anuncio.id_anuncio}`} className="card-botao">
                            Ver anúncio
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}