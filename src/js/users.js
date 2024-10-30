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
const configToMenu = document.getElementsByClassName("config-menu");

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
        firebaseParaLocalStorage();
      })
      .catch((err) => {
        console.log(err);
      })
  );
}

if (atualizarBotao) {
  atualizarBotao.addEventListener("click", firebaseParaLocalStorage);
}

if (fecharJanelaBotao) {
  fecharJanelaBotao.addEventListener("click", fecharJanela);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento carregado");
});

document.addEventListener("DOMContentLoaded", () => {
  cache();
});

//--------------------------------------------
async function firebaseParaLocalStorage() {
  try {
    const atualizar = await atualizarBanco();
    console.log(localStorage.setItem("users", JSON.stringify(atualizar)));
    cache();
  } catch (error) {
    console.log(error);
  }
}

function configuracao(id) {  
  //TODO fix   corrigir esta parte da config para editar e deletar

  // configToMenu.style.display =
  //   configToMenu.style.display === "none" ? "block" : "none";  
  configToMenu.classList.toggle("config-menu");
}

function cache() {
  try {
    lista.innerHTML = "";

    const usersString = localStorage.getItem("users");
    const users = JSON.parse(usersString);
    console.log(users);
    if (Array.isArray(users)) {
      users.forEach((doc) => {
        const li = document.createElement("li");
        li.innerHTML = `
              <div class="item-da-lista">
                <div class="item-nome-matricula">
                  <p id="nome">Nome: ${doc.nome}</p>
                  <p id="matricula">Matrícula: ${doc.matricula}</p>
                </div>
                <button type="button" id="button-config" title="Configuração">
                </button>
                <div class="config-menu">
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
        console.log("Retrive feito!");

        const configuracaoBotao = li.querySelector("#button-config");
        if (configuracaoBotao) {
          configuracaoBotao.addEventListener("click", () => {
            configuracao(doc.id);
            console.log("menu clicado");
          });
        }
      });
    } else {
      console.log("Nenhum usuário encontrado ou formato inválido.");
    }
  } catch (error) {
    console.log(error);
  }
}
// onclick="configuracao(doc.id)"
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection