require("dotenv").config();

const express = require("express");
const conexao = require("./database/conexao");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.get("/usuarios", (req, res) => {

    conexao.query(
        "SELECT * FROM usuarios",
        (erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            res.json(resultados);
        }
    );
});

app.post("/usuarios", async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        const sql =
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

        conexao.query(
            sql,
            [nome, email, senhaHash],
            (erro) => {

                if (erro) {
                    return res.status(500).json({
                        erro: erro.message
                    });
                }

                res.json({
                    mensagem: "Usuário cadastrado!"
                });
            }
        );

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});

