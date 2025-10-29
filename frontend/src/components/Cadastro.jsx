import { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
    const [formulario, setFormulario] = useState({ nome: "", usuario: "", senha: "", confirmaSenha: "", tipo: "" })

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
            const res = await fetch("http://localhost:3000/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formulario),
            });
            const resultado = await res.json();
            alert(resultado.mensagem);
        } catch (error) {
            console.error("ERRO: ", error)
        }
    };

    return (
        <>
            <form onSubmit={submeterUsuario}>
                <select name="tipo" value={formulario.tipo} onChange={controlaEstado} required>
                    <option value="" disabled hidden>Selecione o tipo de usuário</option>
                    <option value="Usuário Comum">Usuário Comum</option> 
                    <option value="Usuário Vendedor">Usuário Vendedor</option> 
                </select>
                <input type="text" name="nome" value={formulario.nome} placeholder="Nome de exibição" onChange={controlaEstado}  required/>
                <input type="text" name="usuario" value={formulario.usuario} placeholder="usuario" onChange={controlaEstado}  required/>
                <input type="password" name="senha" value={formulario.senha} placeholder="senha" onChange={controlaEstado}  required/>
                <input type="password" name="confirmaSenha" value={formulario.confirmaSenha} placeholder="confirmar a Senha" onChange={controlaEstado}  required/>
                <button type="submit">Cadastrar</button>
                <Link to={"/login"}>Já possui uma conta? Logue!</Link>
            </form>
        </>
    )
}

export default Cadastro;