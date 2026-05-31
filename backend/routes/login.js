app.post("/login", (req, res) => {

    const { email, senha } = req.body;

    const sql =
        "SELECT * FROM usuarios WHERE email = ?";

    conexao.query(
        sql,
        [email],
        async (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            const usuario = resultado[0];

            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );

            if (!senhaCorreta) {

                return res.status(401).json({
                    mensagem: "Senha incorreta"
                });

            }

            res.json({
                mensagem: "Login realizado!"
            });

        }
    );

});