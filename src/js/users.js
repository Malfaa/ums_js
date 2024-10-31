import {
  atualizarBanco,
  adicionarUser,
  removerUser,
} from "/src/js/apiservice.js";

const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar-tela");
const fecharJanelaBotao = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const confirmarAdicionar = document.getElementById("adicionar");
const atualizarBotao = document.getElementById("atualizar-tela");
const lista = document.getElementById("lista-de-users");

let configToMenu;
let editar;
let apagar;
let usuariosParaRemover = [];

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
        getUser.value = "";
        getMatricula.value = "";
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

function configuracao(id, qntdUsers) {

  apagar = document.getElementById("apagar");
  editar = document.getElementById("editar");

  if (usuariosParaRemover.length < 1) {
    configToMenu.style.display = "none";
  } else if (usuariosParaRemover.length >= 2) {
    editar.style.display = "none";
  } else {
    configToMenu.style.display = "block";
    editar.style.display = "block";
  }

  console.log(id + " // " + qntdUsers);

  apagar.addEventListener("click", () => {
    //bugado, vai para todos dá lista
    const resultado = window.confirm("Tem certeza que deseja apagar?");
    if (resultado) {
      removerUser(usuariosParaRemover);
      firebaseParaLocalStorage();
    } else {
      console.log("cancelado!");
    }
  });

  editar.addEventListener("click", () => {
    console.log("editar clicado");
  });
}

async function firebaseParaLocalStorage() {
  try {
    const atualizar = await atualizarBanco();
    console.log(localStorage.setItem("users", JSON.stringify(atualizar)));
    cache();
  } catch (error) {
    console.log(error);
  }
}

function cache() {
  try {
    lista.innerHTML = "";

    const usersString = localStorage.getItem("users");
    const users = JSON.parse(usersString);
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
                <div class="config-menu" style="display:none">
                  <nav class="menu"> 
                    <ul style="display: flex; width: 100%; text-align: center; flex-direction: column; flex-wrap: nowrap;">
                      <li class="menu-item" id="editar">Editar</li>
                      <li class="menu-item" id="apagar">Apagar</li>
                    </ul>
                  </nav>
                </div>
              </div>
            `;
        lista.appendChild(li);
        console.log("Retrive feito!");
        console.log(doc);

        const configuracaoBotao = li.querySelector("#button-config");
        if (configuracaoBotao) {
          console.log("passando dentro do for");
          configuracaoBotao.addEventListener("click", () => {
            configToMenu = document.querySelector(".config-menu");
            const itemDaLista = li.querySelector(".item-da-lista");
            itemDaLista.classList.toggle("toggle");

            if (usuariosParaRemover.includes(doc.id)) {
              usuariosParaRemover.splice(
                usuariosParaRemover.indexOf(doc.id),
                1
              );
            } else {
              usuariosParaRemover.push(doc.id);
            }
            configuracao(doc.id, users.length);
            console.log(usuariosParaRemover);
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