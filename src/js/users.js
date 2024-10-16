import * as api from "/src/js/apiservice.js";

const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar-tela");
const fecharJanelaBotao = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const adicionarUser = document.getElementById("adicionar");
const atualizarBotao = document.getElementById("atualizar-tela");
const lista = document.getElementById("lista-de-users");
const listaStyle = document.querySelector("li.item-da-lista");
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

if (adicionarUser) {
  adicionarUser.addEventListener("click", () =>
    api
      .adicionarUser(getUser.value, getMatricula.value)
      .then(() => {
        fecharJanela;
      })
      .catch((err) => {
        console.log(err);
      })
  );
}

if (atualizarBotao) {
  atualizarBotao.addEventListener("click", api.atualizarBanco);
}

if (fecharJanelaBotao) {
  fecharJanelaBotao.addEventListener("click", fecharJanela);
}

if (lista) {
  try {
    api
      .collection(db, "users")
      .doc
      .forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <div class="item-da-lista">
        <div class="item-nome-matricula">
          <p id="nome">Nome: ${element.nome}</p>
          <p id="matricula">Matrícula: ${element.matricula}</p>
        </div>
        <button class="config" id= ${element.id}>
          <img src="/src/res/images/config_button.svg" 
          alt="Configuração" 
          title="Configuração">
        </button>
      </div>
      `;
        //li.style = listaStyle;
        lista.appendChild(li);
      });
  } catch (error) {
    console.log(error);
  }

  if (configButton) {
    // getUserId para poder editar ou remover
  }
}

// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
