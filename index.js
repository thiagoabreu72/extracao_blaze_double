import fetch from "node-fetch";

const urlPrincipal =
  "https://blaze.com/api/roulette_games/history?startDate=2023-05-08T21:15:26.099Z&endDate=2023-06-09T21:15:26.099Z&page=1";

let objetoDados = [];
let arraySequencias = [];
let totalPaginas = 0;
let v = 0;

let array = [
  { seq: 1, total: 10 },
  { seq: 2, total: 3 },
];
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
    "https://blaze.com/api/roulette_games/history?startDate=2023-05-08T21:15:26.099Z&endDate=2023-06-09T21:15:26.099Z&page=";

  let teste = 0;
  let contador = 0;
  for (let paginaAtual = 1; paginaAtual <= paginas; paginaAtual++) {
    let urlCustomizada = url + paginaAtual;

    fetch(urlCustomizada)
      .then((resposta) => resposta.json())
      .then((dados) => {
        for (let i = 0; i < dados.records.length; i++) {
          // objetoDados.push(dados.records[i]);
          contador++;
          objetoDados.push({
            seq: contador,
            cor: dados.records[i].color,
          });
        }
        teste++;
        //imprimir(objetoDados.length);
        //tester();
        setTimeout(verificarSequencias, 50000);
      })
      .catch((erro) => {
        console.error("Erro ao obter dados", erro);
      });
  }
}

// verificar sequência e ver quantas vezes se repete
// COnsulta o array de resultados, se já tem aquela quantidade, eu devo somar o valor e substituir o anterior
// Caso não tenha, crie uma nova sequência e inicie o total com valor um;

async function verificarSequencias() {
  let corAnterior = "";
  let corAtual = "";
  let seq = 1;

  for (let i = 0; i < objetoDados.length; i++) {
    corAtual = objetoDados[i].cor;
    if (corAnterior === corAtual) seq++;
    else {
      // zerando entrada no if
      let entrou = 0;

      // criando nova seq.
      //let novaSeq = arraySequencias[arraySequencias.length - 1];
      //if (typeof novaSeq !== "number") novaSeq = 1;

      arraySequencias = arraySequencias.map((item) => {
        if (item.seq === seq) {
          entrou++;
          return { ...item, total: item.total + 1 };
        }
        return item;
      });

      if (entrou === 0) {
        arraySequencias.push({ seq: seq, total: 1 });
      }
      seq = 1;
    }

    corAnterior = corAtual;
    //seq = 0;
    //console.log(arraySequencias);
  }

  if (arraySequencias.length === 0) {
    seq++;
    arraySequencias.push({ seq: 1, total: 1 });
  }
  v++;
}

async function imprimir(pag) {
  console.log(pag);
}

function tester() {
  let se = [{ id: 0 }, { id: 1 }];
  let teste = se[se.length - 1].id;

  console.log(teste);
}
