let livros = [];

const endpointDaApi = "app/livros.json";
const listaLivros = document.getElementById("livros");

BuscarLivrosDaAPI();

async function BuscarLivrosDaAPI() {
    const resultado = await fetch(endpointDaApi);
    livros = await resultado.json();
    console.table(livros);

    let LivrosComDescontos = desconto(livros);

    ImprimirLivros(LivrosComDescontos)
    
}

function desconto(livros){

    const desconto = 0.5;

    valorFInal = livros.map(livro => {
        return {...livro, preco: livro.preco - (livro.preco * desconto)};
    })

    return valorFInal;

}

function ImprimirLivros(livros){

    livros.forEach(livro => {

        listaLivros.innerHTML += `
        <div id="livro">
            <img id="imagem" src="${livro.imagem}" alt="${livro.alt}">
            <h1 id="titulo">${livro.titulo}</h1>
            <p id="autor">${livro.autor}</p>
            <p id="preco">R$${livro.preco.toFixed(2)}</p>
            <div id="tags">
                <p id="tag">${livro.categoria}</p>
            </div>
        </div>
    `
    });

}

