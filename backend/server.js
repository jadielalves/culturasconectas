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

app.get("/filmes/populares", async (req, res) => {

    try {

        const resposta = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&page=1`
        );

        const dados = await resposta.json();

        res.json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});