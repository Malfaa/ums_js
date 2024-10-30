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

function configuracao(id, qntdUsers) { //id = undefined
  //TODO fix   corrigir esta parte da config para editar e deletar


  configToMenu.style.display =
    configToMenu.style.display === "none" ? "block" : "none";

    console.log(id + " // " + qntdUsers); //TODO colocar o configmenu do lado direito sendo absolute, e quando for clicado em
    //outro item mas com o menu aberto, ele verifica primeiro o id, se for diferente, mantém aberto porém
    //troca as infos, se for igual ele fecha o menu, o escondendo (none)

  apagar = document.getElementById("apagar");
  editar = document.getElementById("editar");

  apagar.addEventListener("click", () => { //bugado, vai para todos dá lista
    const resultado = window.confirm("Tem certeza que deseja apagar?");
    if (resultado) {
      removerUser(id);
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

          for(i = 0; i < lista.length; i++){//TESTE

            configuracaoBotao.addEventListener("click", () => {
              configToMenu = document.querySelector(".config-menu");
              configuracao(doc.id, users.length).then(() => {
                if( ) //pegar o ID e comparar com os índices da lista, caso positivo, toggle de classe
                // OU TALVEZ NEM PRECISE PQ AQUI JÁ É O DOCUMENTO CORRETO, DAÍ É SÓ
                //PEGAR O ID, COMPARAR COM OS lista[i].id E TOGGLE DE CLASSE
                /*classe.*/classList.toggle("item-da-lista .toggle");
              }); //TODO mudar a cor do ícone selecionado, com isso utiliza-se apenas um block
              console.log("menu clicado"); 
            });
          }
         
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