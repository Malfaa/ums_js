import * as repositorio from "/src/js/repositorio.js";
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
    api.adicionarUser(getUser.value, getMatricula.value)
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
    api.db.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `<p id="nome">Nome: ${element.nome}</p> <p id="matricula">Matrícula: ${element.matricula}</p>`;
      li.style = listaStyle;
      lista.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}
