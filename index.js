import fetch from "node-fetch";

const urlPrincipal =
  "https://blaze.com/api/roulette_games/history?startDate=2023-04-09T21:15:26.099Z&endDate=2023-05-09T21:15:26.099Z&page=1";

let objetoDados = [];
let totalPaginas = 0;
await buscarPagina();

// await gravarRegistros(qtdPaginas);
// await imprimir();

// utilizado para buscar o total de páginas
async function buscarPagina() {
  fetch(urlPrincipal)
    .then((resposta) => resposta.json())
    .then((dados) => {
      totalPaginas = dados.total_pages;
      //console.log(totalPaginas);
      gravarRegistros(totalPaginas);
    })
    .catch((erro) => {
      console.error("Erro ao obter dados", erro);
    });
}

async function gravarRegistros(paginas) {
  let url =
    "https://blaze.com/api/roulette_games/history?startDate=2023-04-29T21:15:26.099Z&endDate=2023-05-09T21:15:26.099Z&page=";

  let teste = 0;
  for (let paginaAtual = 1; paginaAtual <= paginas; paginaAtual++) {
    let urlCustomizada = url + paginaAtual;

    fetch(urlCustomizada)
      .then((resposta) => resposta.json())
      .then((dados) => {
        for (let i = 0; i < dados.records.length; i++) {
          objetoDados.push(dados.records[i]);
        }
        teste++;
        imprimir(teste);
      })
      .catch((erro) => {
        console.error("Erro ao obter dados", erro);
      });
  }
}

async function imprimir(pag) {
  console.log(pag);
}
