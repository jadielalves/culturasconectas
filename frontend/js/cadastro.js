console.log("JS carregado!");

const campoSenha =
    document.getElementById("senha");

const campoConfirmarSenha =
    document.getElementById("confirmarsenha");

const botaoSenha =
    document.getElementById("mostrarsenha");

const botaoConfirmarSenha =
    document.getElementById("mostrarsenha2");

const olhoAberto = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round"
stroke-linejoin="round">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
    <circle cx="12" cy="12" r="3"/>
</svg>
`;

const olhoFechado = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round"
stroke-linejoin="round">
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575"/>
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151"/>
    <path d="m2 2 20 20"/>
</svg>
`;

botaoSenha.addEventListener("click", () => {

    if (campoSenha.type === "password") {

        campoSenha.type = "text";
        botaoSenha.innerHTML = olhoAberto;

    } else {

        campoSenha.type = "password";
        botaoSenha.innerHTML = olhoFechado;

    }

});

botaoConfirmarSenha.addEventListener("click", () => {

    if (campoConfirmarSenha.type === "password") {

        campoConfirmarSenha.type = "text";
        botaoConfirmarSenha.innerHTML = olhoAberto;

    } else {

        campoConfirmarSenha.type = "password";
        botaoConfirmarSenha.innerHTML = olhoFechado;

    }

});

document
    .getElementById("formCadastro")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const nome =
            document.getElementById("nome").value;

        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;

        const confirmarSenha =
            document.getElementById("confirmarsenha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {

            const resposta = await fetch(
                "http://localhost:3000/usuarios",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })
                }
            );

            const dados = await resposta.json();

            if (resposta.ok) {

                alert("Cadastro realizado com sucesso!");

                window.location.href =
                    "../../login.html";

            } else {

                alert(dados.mensagem);

            }

        } catch (erro) {

            console.error(erro);

            alert("Erro ao cadastrar usuário");

        }

    });