console.log("JS carregado!");
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
                window.location.href = "../../login.html";
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {

            console.error(erro);

            alert("Erro ao cadastrar usuário");

        }

    });