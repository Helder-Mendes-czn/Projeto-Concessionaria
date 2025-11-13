import { useState } from "react";

function ContainerMotos() {
    const [anuncios, setAnuncios] = useState([]);

    const buscarAnuncios = async () => {
        try {
            const res = await fetch("http://localhost:8002/anuncios/buscar");
            const data = await res.json();
            setAnuncios(data);
            console.log(data)
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
                params.append(key, value.join(","));
            } else if (value) {
                params.append(key, value);
            }
        });

        const res = await fetch(`http://localhost:8002/anuncios/buscar?${params.toString()}`);
        const data = await res.json();
        setAnuncios(data);
    };

    return (
        <>
            <nav>
                <div>
                    Motos Helder
                </div>
                <div>
                    <input type="text" placeholder="busque por marca ou modelo" />
                </div>
                <div>
                    <div>
                        <i class="fa-solid fa-circle-user"></i>
                        <h6>Helder Mendes</h6>
                    </div>
                    ❤️
                </div>
            </nav>

            <button onClick={buscarAnuncios}>Buscar anuncios</button>
            <div className="filtrosMoto">
                <div className="filtrosLocalizacao">
                    <h4 className="tituloFiltros">Localização</h4>
                    <input type="text" name="localizacao" placeholder="Digite sua cidade ou estado" value={filtros.localizacao} onChange={controlaEstado} />
                </div>
                <div className="filtrosMarca">
                    <h4 className="tituloFiltros">Marca</h4>
                    <div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "BMW" }))}>
                            <img src="https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" />
                            BMW
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Dafra" }))}>
                            <img src="https://vectorseek.com/wp-content/uploads/2023/08/Dafra-Logo-Vector.svg-.png" alt="" />
                            Dafra
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Ducati" }))}>
                            <img src="https://logos-world.net/wp-content/uploads/2021/03/Ducati-Symbol.png" alt="" />
                            Ducati
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Harley-Davidson" }))}>
                            <img src="https://motorcycle-logos.com/wp-content/uploads/2016/10/Harley-Davidson-logo.png" alt="" />
                            Harley-Davidson
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Honda" }))}>
                            <img src="https://motorcycle-logos.com/wp-content/uploads/2016/10/Honda-motorcycle-logo.png" alt="" />
                            Honda
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "KTM" }))}>
                            <img src="https://motorcycle-logos.com/wp-content/uploads/2016/10/KTM-logo.png" alt="" />
                            KTM
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Kawasaki" }))}>
                            <img src="https://logos-world.net/wp-content/uploads/2020/09/Kawasaki-Emblem.png" alt="" />
                            Kawasaki
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Suzuki" }))}>
                            <img src="https://logospng.org/download/suzuki/logo-suzuki-4096.png" alt="" />
                            Suzuki
                        </div>
                        <div className="filtosMarcaBtn" onClick={() => setFiltros((p) => ({ ...p, marca: "Yamaha" }))}>
                            <img src="https://motorcycle-logos.com/wp-content/uploads/2016/10/Logo-Yamaha.png" alt="" />
                            Yamaha
                        </div>
                    </div>
                    <button>Ver todas as marcas</button>
                    <div className="filtrosMarcaColuna">
                        <div>
                            <div>
                                <i class="fa-solid fa-arrow-left"></i>
                                <h5>Selecione uma marca</h5>
                            </div>
                            <div>
                                <input type="text" name="marca" onChange={controlaEstado} value={filtros.marca} placeholder="Digite a marca" />
                            </div>
                        </div>
                        <hr />
                        <div className="filtrosMarcaColunaLista">
                            <h6 className="tituloFiltrosMarcaLista">Todas as marcas</h6>
                            <ul>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Aprilia" }))}>Aprilia</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Bajaj" }))}>Bajaj</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Bimota" }))}>Bimota</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "BMW" }))}>BMW</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Erik Buell Racing" }))}>Erik Buell Racing</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Buell" }))}>Buell</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Bullit" }))}>Bullit</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Cagiva" }))}>Cagiva</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Can-am" }))}>Can-am</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Dafra" }))}>Dafra</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Ducati" }))}>Ducati</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "GAS GAS" }))}>GAS GAS</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Moto Guzzi" }))}>Moto Guzzi</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Haojue" }))}>Haojue</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Harley-Davidson" }))}>Harley-Davidson</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Honda" }))}>Honda</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Husqvarna" }))}>Husqvarna</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Indian" }))}>Indian</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Jincheng" }))}>Jincheng</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Kasinski" }))}>Kasinski</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Kawasaki" }))}>Kawasaki</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "KTM" }))}>KTM</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Kymco" }))}>Kymco</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Lambretta" }))}>Lambretta</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "LML" }))}>LML</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Malaguti" }))}>Malaguti</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Moto Morini" }))}>Moto Morini</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Motorino" }))}>Motorino</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "MV Agusta" }))}>MV Agusta</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Niu" }))}>Niu</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Peugeot" }))}>Peugeot</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Piaggio" }))}>Piaggio</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Polaris" }))}>Polaris</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Sachs" }))}>Sachs</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Sherco" }))}>Sherco</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Shineray" }))}>Shineray</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Super soco" }))}>Super soco</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Suzuki" }))}>Suzuki</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Triumph" }))}>Triumph</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Vespa" }))}>Vespa</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Yadea" }))}>Yadea</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Yamaha" }))}>Yamaha</li>
                                <li onClick={() => setFiltros((p) => ({ ...p, marca: "Zontes" }))}>Zontes</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="filtrosAno">
                    <div className="">
                        <h4 className="tituloFiltros">Ano</h4>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <h5>escolha um intervalo</h5>
                            <div>
                                <input type="text" name="ano_min" value={filtros.ano_min} placeholder="Ano mínimo" onChange={controlaEstado} />
                                <input type="text" name="ano_max" value={filtros.ano_max} placeholder="Ano máximo" onChange={controlaEstado} />
                            </div>
                        </div>
                        <div>
                            <h5>Ou escolha um ano específico</h5>
                            <div>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2025" }))}>2025</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2024" }))}>2024</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2023" }))}>2023</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2022" }))}>2022</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2021" }))}>2021</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2020" }))}>2020</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2019" }))}>2019</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2018" }))}>2018</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2017" }))}>2017</span>
                                <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, ano: "2016" }))}>2016</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filtrosPreco">
                    <div>
                        <h4 className="tituloFiltros">Preço</h4>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <h5>Escolha um intervalo</h5>
                            <div>
                                <input type="text" name="preco_min" value={filtros.preco_min} onChange={controlaEstado} placeholder="Preço mínimo" />
                                <input type="text" name="preco_max" value={filtros.preco_max} onChange={controlaEstado} placeholder="Preço máximo" />
                            </div>
                        </div>
                        <div>
                            <h5>Ou escolha uma faixa de preço específica</h5>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "60000" }))}>Até 60 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "70000" }))}>Até 70 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "80000" }))}>Até 80 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "100000" }))}>Até 100 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "150000" }))}>Até 150 mil</span>
                            <span className="filtrosBtnAux" onClick={() => setFiltros((p) => ({ ...p, preco_max: "200000" }))}>Até 200 mil</span>
                        </div>
                    </div>
                </div>
                <div className="filtrosCilindradas">
                    <div>
                        <h4 className="tituloFiltros">Cilindradas</h4>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <input type="text" name="cilindra_min" value={filtros.cilindrada_min} onChange={controlaEstado} placeholder="Cilindradas mínima" />
                            <input type="text" name="cilindra_max" value={filtros.cilindrada_max} onChange={controlaEstado} placeholder="Cilindradas máxima" />
                        </div>
                    </div>
                </div>
                <div className="filtrosRefrigeracao">
                    <div>
                        <h4 className="tituloFiltros">Tipo de refrigeração</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <label><input type="checkbox" value="Air" checked={filtros.refrigeracao.includes("Air")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} /> Ar</label>
                            <label><input type="checkbox" value="Liquid" checked={filtros.refrigeracao.includes("Liquid")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} /> Líquida</label>
                            <label><input type="checkbox" value="Oil & air" checked={filtros.refrigeracao.includes("Oil & air")} onChange={(e) => controlaCheckbox(e, "refrigeracao")} /> Ar e óleo</label>
                        </div>
                    </div>
                </div>

                <div className="filtrosPartida">
                    <div>
                        <h4 className="tituloFiltros">Tipo de partida</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <label><input type="checkbox" value="Electric" checked={filtros.partida.includes("Electric")} onChange={(e) => controlaCheckbox(e, "partida")} /> Elétrica</label>
                            <label><input type="checkbox" value="Kick" checked={filtros.partida.includes("Kick")} onChange={(e) => controlaCheckbox(e, "partida")} /> Pedal</label>
                            <label><input type="checkbox" value="Electric & kick" checked={filtros.partida.includes("Electric & kick")} onChange={(e) => controlaCheckbox(e, "partida")} /> Pedal e Elétrica</label>
                        </div>
                    </div>
                </div>

                <div className="filtrosMotor">
                    <div>
                        <h4 className="tituloFiltros">Tipo de motor</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
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

                <div className="filtrosMarchas">
                    <div>
                        <h4 className="tituloFiltros">Número de marchas</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
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

                <div className="filtrosFreios">
                    <div>
                        <h4 className="tituloFiltros">Freio dianteiro / traseiro</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <label><input type="checkbox" value="disc / disc" checked={filtros.freios.includes("disc / disc")} onChange={(e) => controlaCheckbox(e, "freios")} /> Disco / Disco</label>
                            <label><input type="checkbox" value="disc / brake" checked={filtros.freios.includes("disc / brake")} onChange={(e) => controlaCheckbox(e, "freios")} /> Disco / Tambor</label>
                            <label><input type="checkbox" value="brake / disc" checked={filtros.freios.includes("brake / disc")} onChange={(e) => controlaCheckbox(e, "freios")} /> Tambor / Disco</label>
                            <label><input type="checkbox" value="brake / brake" checked={filtros.freios.includes("brake / brake")} onChange={(e) => controlaCheckbox(e, "freios")} /> Tambor / Tambor</label>
                        </div>
                    </div>
                </div>

                <div className="filtrosAlimentacao">
                    <div>
                        <h4 className="tituloFiltros">Tipo de alimentação</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <label><input type="checkbox" value="Carburettor" checked={filtros.alimentacao.includes("Carburettor")} onChange={(e) => controlaCheckbox(e, "alimentacao")} /> Carburador</label>
                            <label><input type="checkbox" value="Injection" checked={filtros.alimentacao.includes("Injection")} onChange={(e) => controlaCheckbox(e, "alimentacao")} /> Injeção Eletrônica</label>
                        </div>
                    </div>
                </div>

                <div className="filtrosEstilo">
                    <div>
                        <h4 className="tituloFiltros">Estilo</h4>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <div>
                        <div>
                            <label><input type="checkbox" value="Ciclomotor" checked={filtros.estilo.includes("Ciclomotor")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Ciclomotor</label>
                            <label><input type="checkbox" value="Custom" checked={filtros.estilo.includes("Custom")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Custom</label>
                            <label><input type="checkbox" value="Eletric" checked={filtros.estilo.includes("Eletric")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Elétrica</label>
                            <label><input type="checkbox" value="Sport" checked={filtros.estilo.includes("Sport")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Esportiva</label>
                            <label><input type="checkbox" value="Naked" checked={filtros.estilo.includes("Naked")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Naked</label>
                            <label><input type="checkbox" value="offroad" checked={filtros.estilo.includes("offroad")} onChange={(e) => controlaCheckbox(e, "estilo")}/>OffRoad</label>
                            <label><input type="checkbox" value="Quadriciclo" checked={filtros.estilo.includes("Quadriciclo")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Quadriciclo</label>
                            <label><input type="checkbox" value="Scooter" checked={filtros.estilo.includes("Scooter")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Scooter</label>
                            <label><input type="checkbox" value="Street" checked={filtros.estilo.includes("Street")} onChange={(e) => controlaCheckbox(e, "estilo")} />Street</label>
                            <label><input type="checkbox" value="Supermotard" checked={filtros.estilo.includes("Supermotard")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Supermotard</label>
                            <label><input type="checkbox" value="Touring" checked={filtros.estilo.includes("Touring")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Touring</label>
                            <label><input type="checkbox" value="Trail" checked={filtros.estilo.includes("Trail")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Trail</label>
                            <label><input type="checkbox" value="Triciclo" checked={filtros.estilo.includes("Triciclo")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Triciclo</label>
                            <label><input type="checkbox" value="Utilitaria" checked={filtros.estilo.includes("Utilitaria")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Utilitária</label>
                            <label><input type="checkbox" value="Classica" checked={filtros.estilo.includes("Classica")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Clássica</label>
                            <label><input type="checkbox" value="ATV" checked={filtros.estilo.includes("ATV")} onChange={(e) => controlaCheckbox(e, "estilo")} /> ATV</label>
                            <label><input type="checkbox" value="SportTouring" checked={filtros.estilo.includes("SportTouring")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Sport Touring</label>
                            <label><input type="checkbox" value="Cross" checked={filtros.estilo.includes("Cross")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Cross / Motocross</label>
                            <label><input type="checkbox" value="Minimoto" checked={filtros.estilo.includes("Minimoto")} onChange={(e) => controlaCheckbox(e, "estilo")} /> Minimoto / Cross</label>
                        </div>
                    </div>
                </div>

                <button onClick={aplicarFiltros}>Aplicar filtros</button>
            </div>
            <div>
                {anuncios.map((moto) => (
                    <div key={moto.id_anuncio}>
                        <div>
                            <img src={moto.imagem_principal} width={20} alt="" />
                        </div>
                        <div>
                            <div>
                                <h2 className="tituloCardMoto">{moto.marca} {moto.modelo}</h2>
                            </div>
                            <div className="descricaoCardMoto">
                                <h3>{moto.ano}</h3>
                                <h3>{moto.localizacao}</h3>
                            </div>
                            <div className="precoCardMoto">
                                <h3>R$ {moto.preco}</h3>
                            </div>
                        </div>
                        <div>
                            <button>Ver anúncio</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ContainerMotos;