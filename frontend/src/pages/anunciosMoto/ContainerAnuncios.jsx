import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ContainerAnuncios() {
    const [anuncios, setAnuncios] = useState([]);
    const [sessoes, setSessoes] = useState({
        localizacao: false,
        marca: false,
        ano: false,
        preco: false,
        cilindrada: false,
        refrigeracao: false,
        partida: false,
        motor: false,
        caixa_marchas: false,
        freios: false,
        alimentacao: false,
        estilo: false,
    });

    const toggleSessao = (nomeSessao) => {
        setSessoes((prev) => ({
            ...prev,
            [nomeSessao]: !prev[nomeSessao]
        }));
    };


    const buscarAnuncios = async () => {
        try {
            const res = await fetch("http://localhost:1334/anuncios/buscar");
            const data = await res.json();
            setAnuncios(data);
        } catch (error) {
            console.error("erro: \n", error);
        }
    };

    const [filtros, setFiltros] = useState({
        localizacao: "",
        marca: "",
        ano: "",
        ano_min: "",
        ano_max: "",
        preco_min: "",
        preco_max: "",
        cilindrada_min: "",
        cilindrada_max: "",
        refrigeracao: [],
        partida: [],
        motor: [],
        caixa_marchas: [],
        freios: [],
        alimentacao: [],
        estilo: [],
    });

    const controlaEstado = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const controlaCheckbox = (e, campo) => {
        const { value, checked } = e.target;
        setFiltros((prev) => {
            const lista = prev[campo] || [];
            return {
                ...prev,
                [campo]: checked
                    ? [...lista, value]
                    : lista.filter((v) => v !== value),
            };
        });
    };

    const aplicarFiltros = async () => {
        const params = new URLSearchParams();

        Object.entries(filtros).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach(v => params.append(key, v));
            } else if (value) {
                params.append(key, value);
            }
        });

        const res = await fetch(`http://localhost:1334/anuncios/buscar?${params.toString()}`);
        const data = await res.json();
        setAnuncios(data);
    };

    useEffect(() => {
        buscarAnuncios();
    }, [])

    const limparFiltros = () => {
        setFiltros({
            localizacao: "",
            marca: "",
            ano: "",
            ano_min: "",
            ano_max: "",
            preco_min: "",
            preco_max: "",
            cilindrada_min: "",
            cilindrada_max: "",
            refrigeracao: [],
            partida: [],
            motor: [],
            caixa_marchas: [],
            freios: [],
            alimentacao: [],
            estilo: [],
        })
    }

    const marcasFixas = [
        { nome: "BMW", img: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" },
        { nome: "Aprilia", img: "https://loghi-famosi.com/wp-content/uploads/2021/08/Logo-della-Aprilia-650x366.png" },
        { nome: "Ducati", img: "https://logos-world.net/wp-content/uploads/2021/03/Ducati-Symbol.png" },
        { nome: "Triumph", img: "https://logos-world.net/wp-content/uploads/2020/11/Triumph-Logo.png" },
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
        <div className="containerLista">
            <div className="filtrosMoto">
                <div className="filtrosBtns">
                    <button onClick={() => aplicarFiltros()}>Aplicar filtros</button>
                    <button onClick={() => limparFiltros()}>Limpar Filtros</button>
                </div>

                <div className="filtrosLocalizacao">
                    <h4>Localização</h4>
                    <input type="text" name="localizacao" placeholder="Digite sua cidade ou estado" value={filtros.localizacao} onChange={controlaEstado} />
                </div>
                <div className={`filtroSessao ${sessoes.marca ? "aberto" : ""} filtrosMarca`}>
                    <div className="gridMarcas">
                        {marcasFixas.map((m) => (
                            <div key={m.nome} className="filtrosMarcaBtn" onClick={() => { setFiltros((p) => ({ ...p, marca: m.nome })) }}>
                                <img src={m.img} alt={m.nome} />
                                {m.nome}
                            </div>
                        ))}
                    </div>
                    <div className="headerSessao headerSessaoFiltrosMarca" onClick={() => toggleSessao("marca")}>
                        <h4 className="tituloFiltrosMarca">Ver todas as marcas</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div className="filtroConteudo filtrosMarcaColuna">
                        <div className="filtroLinhaInputs">
                            <input type="text" name="marca" onChange={controlaEstado} value={filtros.marca} placeholder="Digite a marca" />
                        </div>
                        <h5 className="tituloFiltrosMarcaLista">Todas as marcas</h5>
                        <hr />
                        <div className="filtrosMarcaColunaLista">
                            <ul>
                                {listaMarcas.map((marca) => (
                                    <li key={marca} onClick={() => setFiltros((p) => ({ ...p, marca }))}>{marca}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.ano ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => toggleSessao("ano")}>
                        <h4>Ano</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div className="filtroConteudo">
                        <h5>escolha um intervalo</h5>
                        <div className="filtroLinhaInputs">
                            <input type="text" name="ano_min" value={filtros.ano_min} placeholder="Ano mínimo" onChange={controlaEstado} />
                            <input type="text" name="ano_max" value={filtros.ano_max} placeholder="Ano máximo" onChange={controlaEstado} />
                        </div>
                        <h5>Ou escolha um ano específico</h5>
                        <div className="filtrosBtnsAux">
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2025" }))}>2025</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2024" }))}>2024</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2023" }))}>2023</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2022" }))}>2022</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2021" }))}>2021</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2020" }))}>2020</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2019" }))}>2019</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2018" }))}>2018</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2017" }))}>2017</span>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.preco ? "aberto" : ""}`}>

                    <div
                        className="headerSessao"
                        onClick={() => toggleSessao("preco")}
                    >
                        <h4>Preço</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>

                    <div className="filtroConteudo">
                        <h5>Escolha um intervalo</h5>
                        <div className="filtroLinhaInputs">
                            <input type="text" name="preco_min" placeholder="Preço mínimo" value={filtros.preco_min} onChange={controlaEstado} />
                            <input type="text" name="preco_max" placeholder="Preço máximo" value={filtros.preco_max} onChange={controlaEstado} />
                        </div>
                        <h5>Ou escolha uma faixa de preço específica.</h5>
                        <div className="filtrosBtnsAux">
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "60000" }))}>Até 60 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "70000" }))}>Até 70 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "80000" }))}>Até 80 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "100000" }))}>Até 100 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "150000" }))}>Até 150 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "200000" }))}>Até 200 mil</span>
                        </div>
                    </div>

                </div>

                <div className={`filtroSessao ${sessoes.cilindrada ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("cilindrada") }}>
                        <h4>Cilindradas</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div className="filtroConteudo">
                        <h5>Escolha um intervalo</h5>
                        <div className="filtroLinhaInputs">
                            <input type="text" name="cilindrada_min" value={filtros.cilindrada_min} onChange={controlaEstado} placeholder="Cilindradas mínima" />
                            <input type="text" name="cilindrada_max" value={filtros.cilindrada_max} onChange={controlaEstado} placeholder="Cilindradas máxima" />
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.refrigeracao ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => toggleSessao("refrigeracao")}>
                        <h4>Tipo de refrigeração</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.refrigeracao ? "up" : "down"}`}></i>
                    </div>

                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label>
                                <input type="checkbox" value="Air" checked={filtros.refrigeracao.includes("Air")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} />
                                Ar
                            </label>
                            <label>
                                <input type="checkbox" value="Liquid" checked={filtros.refrigeracao.includes("Liquid")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} />
                                Líquida
                            </label>
                            <label>
                                <input type="checkbox" value="Oil & air" checked={filtros.refrigeracao.includes("Oil & air")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} />
                                Ar e óleo
                            </label>
                        </div>
                    </div>

                </div>

                <div className={`filtroSessao ${sessoes.partida ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("partida") }}>
                        <h4>Tipo de partida</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.partida ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label><input type="checkbox" value="Electric" checked={filtros.partida.includes("Electric")} onChange={(e) => controlaCheckbox(e, "partida")} /> Elétrica</label>
                            <label><input type="checkbox" value="Kick" checked={filtros.partida.includes("Kick")} onChange={(e) => controlaCheckbox(e, "partida")} /> Pedal</label>
                            <label><input type="checkbox" value="Electric & kick" checked={filtros.partida.includes("Electric & kick")} onChange={(e) => controlaCheckbox(e, "partida")} /> Pedal e Elétrica</label>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.motor ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("motor") }}>
                        <h4>Tipo de motor</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.motor ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo filtrosLongo">
                        <div className="checkboxLinha">
                            <label><input type="checkbox" value="V2, four-stroke" checked={filtros.motor.includes("V2, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> V2, quatro tempos</label>
                            <label><input type="checkbox" value="V4, four-stroke" checked={filtros.motor.includes("V4, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> V4, quatro tempos</label>
                            <label><input type="checkbox" value="Single cylinder, two-stroke" checked={filtros.motor.includes("Single cylinder, two-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Monocilíndrico, dois tempos</label>
                            <label><input type="checkbox" value="Single cylinder, four-stroke" checked={filtros.motor.includes("Single cylinder, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Monocilíndrico, quatro tempos</label>
                            <label><input type="checkbox" value="Twin, two-stroke" checked={filtros.motor.includes("Twin, two-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Bicilíndrico, dois tempos</label>
                            <label><input type="checkbox" value="Twin, four-stroke" checked={filtros.motor.includes("Twin, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Bicilíndrico, quatro tempos</label>
                            <label><input type="checkbox" value="Electric" checked={filtros.motor.includes("Electric")} onChange={(e) => controlaCheckbox(e, "motor")} /> Elétrico</label>
                            <label><input type="checkbox" value="In-line four, four-stroke" checked={filtros.motor.includes("In-line four, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Quatro cilindros em linha, quatro tempos</label>
                            <label><input type="checkbox" value="In-line six, four-stroke" checked={filtros.motor.includes("In-line six, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Seis cilindros em linha, quatro tempos</label>
                            <label><input type="checkbox" value="Two cylinder boxer, four-stroke" checked={filtros.motor.includes("Two cylinder boxer, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Bicilíndrico boxer, quatro tempos</label>
                            <label><input type="checkbox" value="In-line three, four-stroke" checked={filtros.motor.includes("In-line three, four-stroke")} onChange={(e) => controlaCheckbox(e, "motor")} /> Três cilindros em linha, quatro tempos</label>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.caixa_marchas ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("caixa_marchas") }}>
                        <h4>Número de marchas</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.caixa_marchas ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label><input type="checkbox" value="Automatic" checked={filtros.caixa_marchas.includes("Automatic")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> Automática</label>
                            <label><input type="checkbox" value="1-speed" checked={filtros.caixa_marchas.includes("1-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 1-speed</label>
                            <label><input type="checkbox" value="2-speed" checked={filtros.caixa_marchas.includes("2-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 2-speed</label>
                            <label><input type="checkbox" value="3-speed" checked={filtros.caixa_marchas.includes("3-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 3-speed</label>
                            <label><input type="checkbox" value="4-speed" checked={filtros.caixa_marchas.includes("4-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 4-speed</label>
                            <label><input type="checkbox" value="5-speed" checked={filtros.caixa_marchas.includes("5-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 5-speed</label>
                            <label><input type="checkbox" value="6-speed" checked={filtros.caixa_marchas.includes("6-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 6-speed</label>
                            <label><input type="checkbox" value="7-speed" checked={filtros.caixa_marchas.includes("7-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 7-speed</label>
                            <label><input type="checkbox" value="8-speed" checked={filtros.caixa_marchas.includes("8-speed")} onChange={(e) => controlaCheckbox(e, "caixa_marchas")} /> 8-speed</label>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.freios ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("freios") }}>
                        <h4>Freio dianteiro / traseiro</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.freios ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label><input type="checkbox" value="disc / disc" checked={filtros.freios.includes("disc / disc")} onChange={(e) => controlaCheckbox(e, "freios")} /> Disco / Disco</label>
                            <label><input type="checkbox" value="disc / brake" checked={filtros.freios.includes("disc / brake")} onChange={(e) => controlaCheckbox(e, "freios")} /> Disco / Tambor</label>
                            <label><input type="checkbox" value="brake / disc" checked={filtros.freios.includes("brake / disc")} onChange={(e) => controlaCheckbox(e, "freios")} /> Tambor / Disco</label>
                            <label><input type="checkbox" value="brake / brake" checked={filtros.freios.includes("brake / brake")} onChange={(e) => controlaCheckbox(e, "freios")} /> Tambor / Tambor</label>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.alimentacao ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => { toggleSessao("alimentacao") }}>
                        <h4>Tipo de alimentação</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.alimentacao ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label><input type="checkbox" value="Carburettor" checked={filtros.alimentacao.includes("Carburettor")} onChange={(e) => controlaCheckbox(e, "alimentacao")} /> Carburador</label>
                            <label><input type="checkbox" value="Injection" checked={filtros.alimentacao.includes("Injection")} onChange={(e) => controlaCheckbox(e, "alimentacao")} /> Injeção Eletrônica</label>
                        </div>
                    </div>
                </div>

                <div className={`filtroSessao ${sessoes.estilo ? "aberto" : ""}`}>
                    <div className="headerSessao" onClick={() => toggleSessao("estilo")}>
                        <h4>Estilo</h4>
                        <i className={`fa-solid fa-chevron-${sessoes.estilo ? "up" : "down"}`}></i>
                    </div>
                    <div className="filtroConteudo">
                        <div className="checkboxLinha">
                            <label>
                                <input type="checkbox" value="Ciclomotor" checked={filtros.estilo.includes("Ciclomotor")} onChange={(e) => controlaCheckbox(e, "estilo")} />Ciclomotor
                            </label>
                            <label>
                                <input type="checkbox" value="Custom" checked={filtros.estilo.includes("Custom")} onChange={(e) => controlaCheckbox(e, "estilo")} />Custom
                            </label>
                            <label>
                                <input type="checkbox" value="Eletric" checked={filtros.estilo.includes("Eletric")} onChange={(e) => controlaCheckbox(e, "estilo")} />Elétrica
                            </label>
                            <label>
                                <input type="checkbox" value="Sport" checked={filtros.estilo.includes("Sport")} onChange={(e) => controlaCheckbox(e, "estilo")} />Esportiva
                            </label>
                            <label>
                                <input type="checkbox" value="Naked" checked={filtros.estilo.includes("Naked")} onChange={(e) => controlaCheckbox(e, "estilo")} />Naked
                            </label>
                            <label>
                                <input type="checkbox" value="offroad" checked={filtros.estilo.includes("offroad")} onChange={(e) => controlaCheckbox(e, "estilo")} />OffRoad
                            </label>
                            <label>
                                <input type="checkbox" value="Quadriciclo" checked={filtros.estilo.includes("Quadriciclo")} onChange={(e) => controlaCheckbox(e, "estilo")} />Quadriciclo
                            </label>
                            <label>
                                <input type="checkbox" value="Scooter" checked={filtros.estilo.includes("Scooter")} onChange={(e) => controlaCheckbox(e, "estilo")} />Scooter
                            </label>
                            <label>
                                <input type="checkbox" value="Street" checked={filtros.estilo.includes("Street")} onChange={(e) => controlaCheckbox(e, "estilo")} />Street
                            </label>
                            <label>
                                <input type="checkbox" value="Supermotard" checked={filtros.estilo.includes("Supermotard")} onChange={(e) => controlaCheckbox(e, "estilo")} />Supermotard
                            </label>
                            <label>
                                <input type="checkbox" value="Touring" checked={filtros.estilo.includes("Touring")} onChange={(e) => controlaCheckbox(e, "estilo")} />Touring
                            </label>
                            <label>
                                <input type="checkbox" value="Trail" checked={filtros.estilo.includes("Trail")} onChange={(e) => controlaCheckbox(e, "estilo")} />Trail
                            </label>
                            <label>
                                <input type="checkbox" value="Triciclo" checked={filtros.estilo.includes("Triciclo")} onChange={(e) => controlaCheckbox(e, "estilo")} />Triciclo
                            </label>
                            <label>
                                <input type="checkbox" value="Utilitaria" checked={filtros.estilo.includes("Utilitaria")} onChange={(e) => controlaCheckbox(e, "estilo")} />Utilitária
                            </label>
                            <label>
                                <input type="checkbox" value="Classica" checked={filtros.estilo.includes("Classica")} onChange={(e) => controlaCheckbox(e, "estilo")} />Clássica
                            </label>
                            <label>
                                <input type="checkbox" value="ATV" checked={filtros.estilo.includes("ATV")} onChange={(e) => controlaCheckbox(e, "estilo")} />ATV
                            </label>
                            <label>
                                <input type="checkbox" value="SportTouring" checked={filtros.estilo.includes("SportTouring")} onChange={(e) => controlaCheckbox(e, "estilo")} />Sport Touring
                            </label>
                            <label>
                                <input type="checkbox" value="Cross" checked={filtros.estilo.includes("Cross")} onChange={(e) => controlaCheckbox(e, "estilo")} />Cross / Motocross
                            </label>
                            <label>
                                <input type="checkbox" value="Minimoto" checked={filtros.estilo.includes("Minimoto")} onChange={(e) => controlaCheckbox(e, "estilo")} />Minimoto / Cross
                            </label>
                        </div>
                    </div>
                </div>
                <div className="filtrosBtns">
                    <button onClick={() => aplicarFiltros()}>Aplicar filtros</button>
                    <button onClick={() => limparFiltros()}>Limpar Filtros</button>
                </div>
            </div>
            <div className="listaAnuncios">
                {anuncios.map((item) => (
                    <div key={item.anuncio.id_anuncio} className="cardMoto">

                        <img
                            src={item.imagens?.[0] ? `http://localhost:1333/uploads/${item.imagens[0]}` : ""}
                            alt={item.anuncio.modelo}
                        />

                        <div className="cardInfo">
                            <div>
                                <h2 className="tituloCardMoto">
                                    {item.anuncio.marca} {item.anuncio.modelo}
                                </h2>
                                <div className="descricaoCardMoto">
                                    <div className="descricaoCardMoto1">
                                        <h3>{item.anuncio.ano_modelo}/{item.anuncio.ano_fabricacao}</h3>
                                        <h3>{item.anuncio.quilometragem} Km</h3>
                                    </div>
                                    <div className="descricaoCardMoto2">
                                        <h3>{item.anuncio.localizacao}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="precoCardMoto">
                                <h3>R$ {item.anuncio.preco}</h3>
                            </div>
                        </div>  
                        <Link to={`/anuncios/moto/${item.anuncio.id_anuncio}`}>
                            Ver anúncio
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
};