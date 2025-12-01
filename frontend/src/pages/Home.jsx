export default function () {
    return (
        <>
            <div className="landing">

                {/* HERO */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Encontre a moto perfeita para você</h1>
                        <p>A maior plataforma de anúncios de motos customizadas, esportivas e urbanas.</p>

                        <div className="hero-buttons">
                            <a href="/anuncios" className="btn-primary">Ver anúncios</a>
                            <a href="/cadastro" className="btn-secondary">Criar conta</a>
                        </div>
                    </div>

                    <div className="hero-img"></div>
                </section>

                {/* HIGHLIGHTS */}
                <section className="highlights">
                    <div className="highlight-card">
                        <i className="fa-solid fa-motorcycle"></i>
                        <h3>Anúncios verificados</h3>
                        <p>Todos os anúncios passam por uma verificação manual para garantir sua segurança.</p>
                    </div>

                    <div className="highlight-card">
                        <i className="fa-solid fa-shield"></i>
                        <h3>Segurança primeiro</h3>
                        <p>Navegue, pesquise e negocie com total proteção de dados.</p>
                    </div>

                    <div className="highlight-card">
                        <i className="fa-solid fa-bolt"></i>
                        <h3>Carregamento rápido</h3>
                        <p>Interface otimizada para carregar anúncios em poucos segundos.</p>
                    </div>
                </section>

                {/* COMO FUNCIONA */}
                <section className="como-funciona">
                    <h2>Como funciona</h2>

                    <div className="steps">
                        <div className="step">
                            <span>1</span>
                            <h4>Crie sua conta</h4>
                            <p>Cadastre-se gratuitamente e personalize seu perfil.</p>
                        </div>

                        <div className="step">
                            <span>2</span>
                            <h4>Publique seu anúncio</h4>
                            <p>Adicione fotos, detalhes e valores rapidamente.</p>
                        </div>

                        <div className="step">
                            <span>3</span>
                            <h4>Negocie com segurança</h4>
                            <p>Receba contatos e negocie diretamente com compradores.</p>
                        </div>
                    </div>
                </section>

                {/* BENEFÍCIOS */}
                <section className="beneficios">
                    <h2>Por que usar nossa plataforma?</h2>

                    <div className="beneficios-grid">

                        <div className="beneficio-item">
                            <i className="fa-solid fa-eye"></i>
                            <h3>Visibilidade máxima</h3>
                            <p>Seu anúncio alcança milhares de usuários diariamente.</p>
                        </div>

                        <div className="beneficio-item">
                            <i className="fa-solid fa-star"></i>
                            <h3>Experiência premium</h3>
                            <p>Navegação fluida e visual moderno.</p>
                        </div>

                        <div className="beneficio-item">
                            <i className="fa-solid fa-headset"></i>
                            <h3>Suporte dedicado</h3>
                            <p>Estamos disponíveis para te ajudar sempre que precisar.</p>
                        </div>

                    </div>
                </section>
            </div>

        </>
    )
}