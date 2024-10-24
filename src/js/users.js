import { atualizarBanco, adicionarUser } from "/src/js/apiservice.js";

const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar-tela");
const fecharJanelaBotao = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const confirmarAdicionar = document.getElementById("adicionar");
const atualizarBotao = document.getElementById("atualizar-tela");
const lista = document.getElementById("lista-de-users");
const configuracaoBotao = document.getElementById("button-config");
let configToMenu;

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
        fecharJanela();
        carregarLista();
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
});

//--------------------------------------------
async function carregarLista() {
  //TODO talvez persistir os dados da última atualização, assim, evitando de fazer uma leitura todo momento
  try {
    const atualizar = await atualizarBanco();
    console.log(typeof atualizar);
    lista.innerHTML = "";
    atualizar.forEach((doc) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div class="item-da-lista">
        <div class="item-nome-matricula">
          <p id="nome">Nome: ${doc.nome}</p>
          <p id="matricula">Matrícula: ${doc.matricula}</p>
        </div>
        <button type="button" id="button-config" title="Configuração">
        </button>
        <div id="config-menu" style="display: none;">
          <nav class="menu"> 
            <ul style="display: flex; width: 100%; text-align: center; flex-direction: column; flex-wrap: nowrap;">
              <li class="menu-item">Editar</li>
              <li class="menu-item">Apagar</li>
            </ul>
          </nav>
        </div>
      
      </div>
      `;
      lista.appendChild(li);
      console.log("Busca feita!");

      configToMenu = document.querySelector("#config-menu");
      const configuracaoBotao = li.querySelector("#button-config");

      if (configuracaoBotao) { //TODO colocar um forEach, para cada doc
        configuracaoBotao.addEventListener("click", configuracao); //(doc.id)
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function configuracao() {
  if (configToMenu) {
    configToMenu.style.display =
      configToMenu.style.display === "none" ? "block" : "none";
  }
}
// onclick="configuracao(doc.id)"
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
