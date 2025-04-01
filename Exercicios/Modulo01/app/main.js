let livros = [];

const endpointDaApi = "app/livros.json";
const listaLivros = document.getElementById("livros");

const botoes = document.querySelectorAll('.btn');

BuscarLivrosDaAPI();

async function BuscarLivrosDaAPI() {
    const resultado = await fetch(endpointDaApi);
    livros = await resultado.json();
    //console.table(livros);

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

    listaLivros.innerHTML = "";

    livros.forEach(livro => {

        let disponibilidade = livro.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel";

        listaLivros.innerHTML += `
        <div id="livro">
            <img id="imagem" class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}">
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

botoes.forEach(btn => btn.addEventListener('click', filtrarLivros));

function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;
    //let livrosFiltrados = livros.filter(livro => livro.categoria == categoria);
    let livrosFiltrados = categoria == "disponivel" ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria == categoria);
    ImprimirLivros(livrosFiltrados);
}

let btnOrdenarPorPrecoExercicio = document.getElementById("btnOrdenarPorPreco");

btnOrdenarPorPrecoExercicio.addEventListener("click", ordenarPorPrecoExercicio);

function ordenarPorPrecoExercicio(){
    let livrosOrdenadosExercicio = livros.sort( (a,b) => a.preco - b.preco);
    ImprimirLivros(livrosOrdenadosExercicio);
}



