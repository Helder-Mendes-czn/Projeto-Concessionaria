import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formulario, setFormulario] = useState({ usuario: "", senha: "" });
    const navigate = useNavigate();

    const controlaEstado = (elemento) => {
        const { name, value } = elemento.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const submeterUsuario = (evento) => {
        evento.preventDefault();
        logar();
    };

    const logar = async () => {
        try {
            const res = await fetch("http://localhost:1330/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formulario),
            });

            const resultado = await res.json();
            alert(resultado.mensagem);
            if (resultado.token) {
                localStorage.setItem("token", resultado.token);
                navigate("/home");
            }

        } catch (error) {
            console.error("erro: ", error);
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={submeterUsuario}>

                <h2 className="login-titulo">Entrar</h2>

                <input
                    type="text"
                    placeholder="Usuário"
                    name="usuario"
                    value={formulario.usuario}
                    onChange={controlaEstado}
                    required
                    className="login-input"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    value={formulario.senha}
                    onChange={controlaEstado}
                    required
                    className="login-input"
                />

                <button type="submit" className="login-botao">Logar</button>

                <Link to="/cadastro" className="login-link">
                    Não tem uma conta? Crie uma!
                </Link>

            </form>

        </>
    )
}

export default Login;
