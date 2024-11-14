import {
  atualizarUsersFirestore,
  inserirUserFirestore,
  removerUserFirestore,
} from "/src/js/apiservice.js";

const telaAdicionar = document.querySelector("#tela-adicionar");
const botaoShowTelaAdicionar = document.getElementById("show-tela-adicionar");
const botaoFecharJanela = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const botaoConfirmarAdicionar = document.getElementById("adicionar");
const botaoAtualizar = document.getElementById("show-tela-atualizar");
const lista = document.getElementById("lista-de-users");

function abreTelaAdicionar() {
  if (telaAdicionar) {
    telaAdicionar.style.display =
      telaAdicionar.style.display === "none" ? "flex" : "none";
  }
}

function fecharJanela() {
  if (telaAdicionar) {
    telaAdicionar.style.display = "none";
  }
}

// Eventos
if (botaoShowTelaAdicionar) {
  botaoShowTelaAdicionar.addEventListener("click", abreTelaAdicionar);
}

if (botaoConfirmarAdicionar) {
  botaoConfirmarAdicionar.addEventListener("click", () =>
    inserirUserFirestore(getUser.value, getMatricula.value)
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

if (botaoAtualizar) {
  botaoAtualizar.addEventListener("click", firebaseParaLocalStorage);
}

if (botaoFecharJanela) {
  botaoFecharJanela.addEventListener("click", fecharJanela);
}

document.addEventListener("DOMContentLoaded", () => {
  cache();
});

//--------------------------------------------

async function firebaseParaLocalStorage() {
  try {
    const atualizar = await atualizarUsersFirestore();
    console.log(localStorage.setItem("users", JSON.stringify(atualizar)));
    cache();
  } catch (error) {
    console.log(error);
  }
}

function getLocalStorage() {
  //melhor
  const usersString = localStorage.getItem("users");
  return JSON.parse(usersString);
}

function GeradorDeListaItem(item) {
  const li = document.createElement("li");
  li.innerHTML = `
              <div class="item-da-lista">
                <div class="item-nome-matricula">
                  <p id="nome">Nome: ${item.nome}</p>
                  <p id="matricula">Matrícula: ${item.matricula}</p>
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
  return li;
}

function botaoAbreMenuConfiguracao(tag, id, item, usuariosParaAlterar) {
  tag.addEventListener("click", () => {
    const configToMenu = document.querySelector(".config-menu");
    const itemDaLista = item.querySelector(".item-da-lista");
    const apagar = itemDaLista.querySelector("#apagar");
    const editar = itemDaLista.querySelector("#editar");
    itemDaLista.classList.toggle("toggle");

    console.log(usuariosParaAlterar);

    if (usuariosParaAlterar.length < 1) {
      configToMenu.style.display = "none";
    } else if (usuariosParaAlterar.length >= 2) {
      editar.style.display = "none";
    } else {
      configToMenu.style.display = "block";
      editar.style.display = "block";
    }

    apagar.onclick = () => {
      const resultado = window.confirm("Tem certeza que deseja apagar?");
      if (resultado) {
        removerUserFirestore(usuariosParaAlterar);
        firebaseParaLocalStorage();
      } else {
        console.log("cancelado!");
      }
    };

    editar.onclick = () => {
      console.log("editar clicado");
    };
  });
}

function cache() {
  try {
    lista.innerHTML = "";
    let usuariosParaAlterar = [];
    getLocalStorage().forEach((doc) => {
      const listaItem = GeradorDeListaItem(doc);
      lista.appendChild(listaItem);
      if (usuariosParaAlterar.includes(doc.id)) {
        usuariosParaAlterar.splice(usuariosParaAlterar.indexOf(doc.id), 1);
      } else {
        usuariosParaAlterar.push(doc.id);
      }
      botaoAbreMenuConfiguracao(
        document.querySelector("#button-config"),
        doc.id,
        listaItem,
        usuariosParaAlterar
      );
      console.log(doc.id);
    });
  } catch (error) {
    console.log(error);
  }
}
// onclick="configuracao(doc.id)"
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
