import { useEffect, useState } from "react";

export default function Perfil({ usuario }) {
    const [user, setUser] = useState(null);
    const [formulario, setFormulario] = useState({ nome: "", usuario: "", senha: "", tipo: "", email: "", telefone: "", data_criacao: "", status: "" });

    const controlaEstado = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    }

    const pegarDadosUser = async () => {
        try {
            const res = await fetch(`http://localhost:1330/usuarios/${usuario.id}`)
            const data = await res.json();
            setUser(data[0]);
        } catch (error) {
            console.error("error: \n\t", error);
        }
    };

    useEffect(() => {
        pegarDadosUser();
    }, [])

    useEffect(() => {
        if (user) {
            let novosDadosFormulario = {};
            Object.entries(user).forEach(([key, value]) => { if (key in formulario) { novosDadosFormulario[key] = value; }; });
            setFormulario(prevFormulario => ({ ...prevFormulario, ...novosDadosFormulario }));
        } else return;
    }, [user]);

    const submeterAlteracoes = async (evento) => {
        evento.preventDefault();

        try {
            let payload = { ...formulario };
            delete payload.data_criacao;

            const res = await fetch(`http://localhost:1330/usuarios/editar/${usuario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            const data = await res.json();
            alert(data.mensagem);
        } catch (error) {
            console.error("erro: \n\t", error);
        }
    };

    return (
        <>
            <h1 class="perfil-titulo">Meu perfil</h1>

            <div class="perfil-container">
                <div class="perfil-box">
                    <form class="perfil-form" onSubmit={submeterAlteracoes}>
                        <h2 class="perfil-subtitulo">Meus dados</h2>

                        <label htmlFor="nome" class="perfil-label">Nome</label>
                        <input type="text" class="perfil-input" name="nome" value={formulario.nome} onChange={controlaEstado} required />

                        <label htmlFor="usuario" class="perfil-label">Usuário</label>
                        <input type="text" class="perfil-input" name="usuario" value={formulario.usuario} onChange={controlaEstado} required />

                        <select class="perfil-select" name="tipo" value={formulario.tipo} onChange={controlaEstado} required>
                            <option value="" disabled hidden>Selecione o tipo de usuário</option>
                            <option value="Usuário Comum">Usuário Comum</option>
                            <option value="Usuário Vendedor">Usuário Vendedor</option>
                        </select>

                        <label htmlFor="email" class="perfil-label">Email</label>
                        <input type="text" class="perfil-input" name="email" value={formulario.email} onChange={controlaEstado} required />

                        <label htmlFor="telefone" class="perfil-label">Telefone</label>
                        <input type="text" class="perfil-input" name="telefone" value={formulario.telefone} onChange={controlaEstado} required />

                        <select class="perfil-select" name="status" value={formulario.status} onChange={controlaEstado} required>
                            <option value="" disabled hidden>Selecione o status da conta</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>

                        <button type="submit" class="perfil-botao">Salvar alterações</button>
                    </form>
                </div>
            </div>
        </>
    );
}
