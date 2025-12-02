import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
    const [formulario, setFormulario] = useState({ nome: "", usuario: "", email: "", telefone: "", senha: "", confirmaSenha: "", tipo: "" })
    const navigate = useNavigate();

    const controlaEstado = (elemento) => {
        const { name, value } = elemento.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const submeterUsuario = (evento) => {
        evento.preventDefault();
        cadastrar();
    }
    const cadastrar = async () => {
        try {
            const res = await fetch("http://localhost:1330/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formulario),
            });
            const resultado = await res.json();
            alert(resultado.mensagem);
            navigate("/home");
        } catch (error) {
            console.error("ERRO: ", error)
        }
    };

    return (
        <>
            <form className="cadastroUsuario-form" onSubmit={submeterUsuario}>

                <h2 className="cadastroUsuario-titulo">Criar conta</h2>

                <select
                    name="tipo"
                    value={formulario.tipo}
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-select"
                >
                    <option value="" disabled hidden>Selecione o tipo de usuário</option>
                    <option value="Usuário Comum">Usuário Comum</option>
                    <option value="Usuário Vendedor">Usuário Vendedor</option>
                </select>

                <input
                    type="text"
                    name="nome"
                    value={formulario.nome}
                    placeholder="Nome de exibição"
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-input"
                />

                <input
                    type="text"
                    name="usuario"
                    value={formulario.usuario}
                    placeholder="Usuário"
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-input"
                />

                <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    placeholder="Email"
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-input"
                />

                <input
                    type="text"
                    name="telefone"
                    value={formulario.telefone}
                    placeholder="Telefone"
                    onChange={controlaEstado}
                    className="cadastroUsuario-input"
                />

                <input
                    type="password"
                    name="senha"
                    value={formulario.senha}
                    placeholder="Senha"
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-input"
                />

                <input
                    type="password"
                    name="confirmaSenha"
                    value={formulario.confirmaSenha}
                    placeholder="Confirmar senha"
                    onChange={controlaEstado}
                    required
                    className="cadastroUsuario-input"
                />

                <button type="submit" className="cadastroUsuario-botao">Cadastrar</button>

                <Link to="/login" className="cadastroUsuario-link">
                    Já possui uma conta? Logue!
                </Link>
            </form>
        </>
    )
}

export default Cadastro;