import "../../styles/Home.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";


export default function Home() {
    return (
        <main className="landingCzn">
            <section className="heroCzn">
                <div className="heroContent">
                    <h2>CZN Motors</h2>
                    <h1>Adrenalina e liberdade em <span>duas rodas</span></h1>
                    <p>A moto perfeita está mais perto do que você imagina.</p>
                    <Link to={"/anuncios"} className="btnHero">Ver Catálogo</Link>
                </div>
                <div className="heroImg"></div>
            </section>

            <section className="categoriasCzn">
                <h2>Categorias</h2>
                <div className="gridCategorias">
                    <div className="itemCategoria">E muito +</div>
                    <div className="itemCategoria">Esportivas</div>
                    <div className="itemCategoria">Naked</div>
                    <div className="itemCategoria">Scooters</div>
                    <div className="itemCategoria">Adventure</div>
                    <div className="itemCategoria">Street</div>
                    <div className="itemCategoria">E muito +</div>
                </div>
            </section>

            <section className="historiaCzn">
                <div className="historiaContent">
                    <div className="historiaBox">
                        <h2>Sobre CZN Motors</h2>
                        <p>
                            CZN Motors é um projeto escolar desenvolvido com foco em tecnologia e inovação,
                            simulando uma concessionária de motos. A plataforma foi criada utilizando
                            <strong> React, Node.js e MySQL</strong>, buscando explorar conceitos de UI/UX,
                            responsividade, banco de dados e integração com backend.
                        </p>
                        <p>
                            Nossa missão é simples: garantir que cada piloto encontre a moto que traduz sua
                            personalidade e seu estilo de vida.
                        </p>
                    </div>
                    <div className="historiaImg"></div>
                </div>
                <div className="historiaContent">
                    <div className="historiaImg"></div>
                    <div className="historiaBox">
                        <h2>Objetivo</h2>
                        <p>
                            O objetivo principal deste projeto é simular uma experiência real de compra de motos,
                            com catálogo dinâmico, sistema de anúncios, filtros, área de atendimento e navegação otimizada.
                            A proposta é unir design moderno e desenvolvimento de software na prática.
                        </p>
                        <p>
                            Nossa missão é simples: garantir que cada piloto encontre a moto que traduz sua
                            personalidade e seu estilo de vida.
                        </p>
                    </div>
                </div>
            </section>

            <section className="porqueCzn">
                <h2>Por que escolher a <span>CZNMotors</span>?</h2>
                <div className="cardsPorque">
                    <div className="cardP">
                        <i className="fa-solid fa-lock"></i>
                        <span>Modelos exclusivos no preço certo</span>
                    </div>
                    <div className="cardP">
                        <i className="fa-solid fa-headset"></i>
                        <span>Suporte técnico especializado</span>
                    </div>
                    <div className="cardP">
                        <i className="fa-solid fa-money-bill-1-wave"></i>
                        <span>Planos de financiamento diferenciados</span>
                    </div>
                    <div className="cardP">
                        <i className="fa-solid fa-truck-fast"></i>
                        <span>Entrega rápida, segura, otimizada eficiente</span>
                    </div>
                </div>
            </section>

            <section className="premiumCzn">
                <h2>Destaques Premium</h2>
                <p className="descricaoPremium">Explore os modelos mais desejados do momento</p>
                <div className="galeria3d">
                    <div className="card3d mA">
                        <h3>Honda CB1000</h3>
                    </div>
                    <div className="card3d mB">
                        <h3>Yamaha MT-07</h3>
                    </div>
                    <div className="card3d mC">
                        <h3>BMW R1200GS</h3>
                    </div>
                    <div className="card3d mD">
                        <h3>Suzuki GSX-S1000 R</h3>
                    </div>
                    <div className="card3d mE">
                        <h3>Yamaha MT-09</h3>
                    </div>
                </div>
            </section>

            <section className="testimonial">
                <div className="headings">
                    <h1>Avaliações</h1>
                    <h2>Avaliações de alguns clientes meus.</h2>
                </div>

                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    loop={true}
                    spaceBetween={40}
                    slidesPerView="auto"
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    observer={true}
                    observeParents={true}
                    className="testimonial_swiper"
                >
                    <SwiperSlide key="abc11">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="./../../src/assets/profile6.jpeg" alt="Eduardo Beltrão" />
                                </div>
                                <div className="client_name">
                                    <h2>Eduardo Beltrão</h2>
                                    <p>Comprador</p>
                                </div>
                            </div>
                            <p className="swiper_pere">"O atendimento foi excepcional! Encontrei a moto perfeita e a equipe fez de tudo para agilizar o financiamento. Recomendo 100%!"</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide key="abc1">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="./../../src/assets/profile2.jpeg" alt="Foto de Alice Francoso" />
                                </div>
                                <div className="client_name">
                                    <h2>Alice Francoso</h2>
                                    <p>Aventureira</p>
                                </div>
                            </div>
                            <p className="swiper_pere">"Comprei uma trail para minhas viagens e a moto é fantástica. A consultoria sobre os modelos foi muito útil, superando minhas expectativas."</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide key="abc8">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="../../src/assets/profile1.jpeg" alt="Foto de João Pedro" />
                                </div>
                                <div className="client_name">
                                    <h2>João Pedro</h2>
                                    <p>Cliente de Serviço</p>
                                </div>
                            </div>
                            <p className="swiper_pere">
                                "Levei minha moto para a revisão e o serviço foi rápido, transparente e de alta qualidade. Os mecânicos são muito atenciosos e profissionais."
                            </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide key="abc10">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="../../src/assets/profile4.jpeg" alt="Foto de Reine Lima" />
                                </div>
                                <div className="client_name">
                                    <h2>Reine Lima</h2>
                                    <p>Novo Proprietário</p>
                                </div>
                            </div>
                            <p className="swiper_pere">
                                "A variedade de modelos na concessionária é impressionante. Recebi todo o suporte para escolher minha primeira moto, me senti muito segura com a compra."
                            </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide key="abc4">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="../../src/assets/profile7.jpeg" alt="Foto de Ana Luiza" />
                                </div>
                                <div className="client_name">
                                    <h2>Ana luiza</h2>
                                    <p>Entusiasta</p>
                                </div>
                            </div>
                            <p className="swiper_pere">"O pós-venda é o grande diferencial! Tive uma dúvida técnica e fui prontamente atendida, mostrando que se importam de verdade com o cliente."</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key="abc3">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="./../../src/assets/profile3.jpeg" alt="Foto de Ryan Scopin" />
                                </div>
                                <div className="client_name">
                                    <h2>Ryan Scopin</h2>
                                    <p>Cliente Recorrente</p>
                                </div>
                            </div>
                            <p className="swiper_pere">"Minha segunda moto comprada aqui! Preços justos, motos de qualidade e a melhor equipe de vendas que já encontrei. Confiança total!"</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key="abc2">
                        <div className="clients">
                            <div className="client_det">
                                <div className="client_img">
                                    <img src="./../../src/assets/profile5.jpeg" alt="Foto de Igor Bueno" />
                                </div>
                                <div className="client_name">
                                    <h2>Igor Bueno</h2>
                                    <p>Proprietário de Custom</p>
                                </div>
                            </div>
                            <p className="swiper_pere">"Precisava de uma peça específica para minha custom e eles encontraram rapidamente. Estoque diversificado e peças originais garantidas."</p>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
            </section>

            <section className="ctaCzn">
                <h2>Seu novo capítulo começa agora</h2>
                <p>Se cadastre na CZN Motors</p>
                <Link to={"/cadastro"} className="btnHero">Se cadastrar</Link>
            </section>
        </main>
    );
}
