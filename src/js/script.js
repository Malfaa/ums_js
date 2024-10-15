import * as repositorio from "/src/js/repositorio.js";
import * as api from "/src/js/apiservice.js";

//Login Screen

const botaoGoogle = document.getElementsByClassName("google");


//Users Screen
const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar-tela");
const fecharJanelaBotao = document.getElementById("fechar");

//Adicionar
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const adicionarUser = document.getElementById("adicionar");

//Atualizar
const atualizarBotao = document.getElementById('atualizar-tela');


function adicionarScreen() {
  if (adicionarPopup.style.display === "none") {
    adicionarPopup.style.display = "flex";
  } else {
    adicionarPopup.style.display = "none";
  }
}

function fecharJanela() {
  adicionarPopup.style.display = "none";
};

//Eventos

/*for (let i = 0; i < botaoGoogle.length; i++) {
  botaoGoogle[i].addEventListener("click", api.googleAuth());
};*/
adicionarBotao.addEventListener("click", adicionarScreen());
adicionarUser.addEventListener("click", api.adicionarUser(getUser, getMatricula));
repositorio.atualizarBotao.addEventListener(
  "click",
  repositorio.atualizarBanco
);
fecharJanelaBotao.addEventListener("click", fecharJanela);

// TODO continuação
//{Fazer o login mobile, autenticar com o firebase e depois fetch customizado com o item em lista, em seguida func atualizarBanco}
