document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formLogin");

    const campoSenha =
        document.getElementById("senha");

    const botaoMostrarSenha =
        document.getElementById("mostrarsenha");

    const olhoAberto = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-eye-icon lucide-eye">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
    `;

    const olhoFechado = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-eye-off-icon lucide-eye-off">
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
        <path d="m2 2 20 20"/>
    </svg>
    `;

    botaoMostrarSenha.addEventListener("click", () => {

        if (campoSenha.type === "password") {

            campoSenha.type = "text";
            botaoMostrarSenha.innerHTML = olhoAberto;

        } else {

            campoSenha.type = "password";
            botaoMostrarSenha.innerHTML = olhoFechado;

        }

    });

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