async function carregarFilmes() {

    const resposta = await fetch(
        "http://localhost:3000/filmes/populares"
    );

    const dados = await resposta.json();

    const box = document.getElementById("box-emalta");

    dados.results.slice(0, 3).forEach(filme => {

        const poster =
            `https://image.tmdb.org/t/p/w500${filme.poster_path}`;

        box.innerHTML += `
            <div class="card">

                <img
                    class="poster"
                    src="${poster}"
                    alt="${filme.title}"
                >

                <div class="descricao">

                    <h5>${filme.title}</h5>

                    <h6 class="nota">
                        ⭐ ${filme.vote_average}
                    </h6>

                    <h6 class="ano">
                        ${filme.release_date.slice(0,4)}
                    </h6>

                </div>

            </div>
        `;
    });
}

carregarFilmes();