import { atualizarBanco, adicionarUser } from "/src/js/apiservice.js";

const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar-tela");
const fecharJanelaBotao = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const confirmarAdicionar = document.getElementById("adicionar");
const atualizarBotao = document.getElementById("atualizar-tela");
const lista = document.getElementById("lista-de-users");
const itemDaLista = document.querySelector(".item-da-lista");
const configButton = document.getElementsByClassName("config");

function adicionarScreen() {
  if (adicionarPopup) {
    adicionarPopup.style.display =
      adicionarPopup.style.display === "none" ? "flex" : "none"; //ternário
  }
}

function fecharJanela() {
  if (adicionarPopup) {
    adicionarPopup.style.display = "none";
  }
}

// Eventos
if (adicionarBotao) {
  adicionarBotao.addEventListener("click", adicionarScreen);
}

if (confirmarAdicionar) {
  confirmarAdicionar.addEventListener("click", () =>
    adicionarUser(getUser.value, getMatricula.value)
      .then(() => {
        fecharJanela;
      })
      .catch((err) => {
        console.log(err);
      })
  );
}

if (atualizarBotao) {
  atualizarBotao.addEventListener("click", carregarLista);
}

if (fecharJanelaBotao) {
  fecharJanelaBotao.addEventListener("click", fecharJanela);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento carregado");
  //reload();
});

//--------------------------------------------
async function carregarLista() { //TODO talvez persistir os dados da última atualização, assim, evitando de fazer uma leitura todo momento
  try {
    const atualizar = await atualizarBanco();
    console.log(typeof(atualizar));
    atualizar.forEach((doc) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div class="item-da-lista">
        <div class="item-nome-matricula">
          <p id="nome">Nome: ${doc.nome}</p>
          <p id="matricula">Matrícula: ${doc.matricula}</p>
        </div>
        <button class="config" id= ${doc.id} title="Configuração">
        </button>
        </div>
      `;
      lista.appendChild(li);
      console.log("Busca feita!")
    });
  } catch (error) {
    console.log(error);
  }
}


if (configButton) {
  // getUserId para poder editar ou remover
}

// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
