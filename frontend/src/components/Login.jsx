import { useState } from "react";
import { Link } from "react-router-dom";

function Login(){
    const [formulario, setFormulario] = useState({usuario: "", senha: ""});

    const controlaEstado = (elemento) => {
        const {name, value} = elemento.target;
        setFormulario({...formulario, [name]: value});
    };

    const submeterUsuario = (evento) => {
        evento.preventDefault();
        logar();
    };

    const logar = async () => {
        try {
            const res = await fetch("http://localhost:4000/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formulario),
            });
            const resultado = await res.json();
            alert(resultado.mensagem);
        } catch (error) {
            console.error("erro: ", error);
        }
    }

    return(
        <>
            <form onSubmit={submeterUsuario}>
                <input type="text" placeholder="usuario" name="usuario" value={formulario.usuario} onChange={controlaEstado} required/>
                <input type="password" placeholder="senha" name="senha" value={formulario.senha} onChange={controlaEstado} required/>
                <button type="submit">Logar</button>
                <Link to={"/cadastro"}>Não tem uma conta? Crie uma!</Link>
            </form>
        </>
    )
}    

export default Login;