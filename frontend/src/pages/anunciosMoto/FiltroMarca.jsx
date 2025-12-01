import { useState } from "react";

export default function FiltroMarca({ filtros, setFiltros }) {
    const [abrirListaMarcas, setAbrirListaMarcas] = useState(false);

    const marcasFixas = [
        { nome: "BMW", img: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" },
        { nome: "Dafra", img: "https://vectorseek.com/wp-content/uploads/2023/08/Dafra-Logo-Vector.svg-.png" },
        { nome: "Ducati", img: "https://logos-world.net/wp-content/uploads/2021/03/Ducati-Symbol.png" },
        { nome: "Harley-Davidson", img: "https://motorcycle-logos.com/wp-content/uploads/2016/10/Harley-Davidson-logo.png" },
        { nome: "Honda", img: "https://motorcycle-logos.com/wp-content/uploads/2016/10/Honda-motorcycle-logo.png" },
        { nome: "KTM", img: "https://motorcycle-logos.com/wp-content/uploads/2016/10/KTM-logo.png" },
        { nome: "Kawasaki", img: "https://logos-world.net/wp-content/uploads/2020/09/Kawasaki-Emblem.png" },
        { nome: "Suzuki", img: "https://logospng.org/download/suzuki/logo-suzuki-4096.png" },
        { nome: "Yamaha", img: "https://motorcycle-logos.com/wp-content/uploads/2016/10/Logo-Yamaha.png" },
    ];

    const listaMarcas = [
        "Aprilia", "Bajaj", "Bimota", "BMW", "Erik Buell Racing", "Buell", "Bullit",
        "Cagiva", "Can-am", "Dafra", "Ducati", "GAS GAS", "Moto Guzzi", "Haojue",
        "Harley-Davidson", "Honda", "Husqvarna", "Indian", "Jincheng", "Kasinski",
        "Kawasaki", "KTM", "Kymco", "Lambretta", "LML", "Malaguti", "Moto Morini",
        "Motorino", "MV Agusta", "Niu", "Peugeot", "Piaggio", "Polaris", "Sachs",
        "Sherco", "Shineray", "Super soco", "Suzuki", "Triumph", "Vespa", "Yadea",
        "Yamaha", "Zontes"
    ];

    return (
        <div className="filtrosMoto">

            {/* TÍTULO */}
            <h4 className="tituloFiltros">Marca</h4>

            {/* LISTA PRINCIPAL DE MARCAS */}
            <div>
                {marcasFixas.map((m) => (
                    <div
                        key={m.nome}
                        className="filtosMarcaBtn"
                        onClick={() => setFiltros((p) => ({ ...p, marca: m.nome }))}
                    >
                        <img src={m.img} alt={m.nome} />
                        {m.nome}
                    </div>
                ))}
            </div>

            {/* BOTÃO ABRIR COLUNA COMPLETA */}
            <button onClick={() => setAbrirListaMarcas(true)}>
                Ver todas as marcas
            </button>

            {/* LISTA EXPANDIDA */}
            {abrirListaMarcas && (
                <div className="filtrosMarcaColuna">
                    <div>

                        {/* HEADER */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <i
                                    className="fa-solid fa-arrow-left"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setAbrirListaMarcas(false)}
                                ></i>
                                <h5>Selecione uma marca</h5>
                            </div>
                        </div>

                        {/* INPUT BUSCA */}
                        <div style={{ marginTop: 12 }}>
                            <input
                                type="text"
                                name="marca"
                                placeholder="Digite a marca"
                                value={filtros.marca}
                                onChange={(e) =>
                                    setFiltros((p) => ({ ...p, marca: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <hr />

                    {/* LISTA COM SCROLL */}
                    <div className="filtrosMarcaColunaLista">
                        <h6 className="tituloFiltrosMarcaLista">Todas as marcas</h6>
                        <ul>
                            {listaMarcas.map((marca) => (
                                <li
                                    key={marca}
                                    
                                >
                                    {marca}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
