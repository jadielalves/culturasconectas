document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formLogin");

    formulario.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const email =
                document.getElementById("email").value;

            const senha =
                document.getElementById("senha").value;

            try {

                const resposta =
                    await fetch(
                        "http://localhost:3000/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                senha
                            })
                        }
                    );

                const dados =
                    await resposta.json();

                if (resposta.ok) {

                    alert(dados.mensagem);

                    window.location.href =
                        "home.html";

                } else {

                    alert(dados.mensagem);

                }

            } catch (erro) {

                console.error(erro);

                alert(
                    "Erro ao conectar com o servidor."
                );

            }

        }
    );

});