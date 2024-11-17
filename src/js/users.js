import {
  atualizarUsersFirestore,
  inserirUserFirestore,
  removerUserFirestore,
} from "/src/js/apiservice.js";

//TODO adicionar  ícone no Adicionar e Atualizar dos browsers.
//TODO alert p/ quando clicar nas outras abas.

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
    localStorage.setItem("users", JSON.stringify(atualizar));
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
  const parent = document.createElement("li");
  const divPai = document.createElement("div");
  divPai.className = "item-da-lista";
  const divItem = document.createElement("div");
  divItem.className = "item-nome-matricula";
  const nome = document.createElement("p");
  nome.id = "nome";
  nome.textContent = `Nome: ${item.nome}`;
  const matricula = document.createElement("p");
  matricula.id = "matricula";
  matricula.textContent = `Matrícula: ${item.matricula}`;
  const botaoConfig = document.createElement("button");
  botaoConfig.title = "Configuração";
  botaoConfig.className = "button-config";
  botaoConfig.type = "button";

  parent.appendChild(divPai);
  divPai.appendChild(divItem);
  divItem.appendChild(nome);
  divItem.appendChild(matricula);
  divPai.appendChild(botaoConfig);

  return parent;
}

function botaoConfiguracaoMenu(index, item, usuariosParaAlterar) {
  item[index].classList.toggle("selecionado");
  const configToMenu = document.querySelector("#config-menu");
  const apagar = document.getElementsByClassName("menu-item");
  const editar = document.getElementsByClassName("menu-item");

  console.log(usuariosParaAlterar);

  if (usuariosParaAlterar.length < 1) {
    configToMenu.style.display = "none";
  } else if (usuariosParaAlterar.length >= 2) {
    editar[0].style.display = "none";
  } else {
    configToMenu.style.display = "flex";
    editar[0].style.display = "flex";
  }

  apagar[1].onclick = () => {
    const resultado = window.confirm("Tem certeza que deseja apagar?");
    if (resultado) {
      removerUserFirestore(usuariosParaAlterar);
      firebaseParaLocalStorage();
      configToMenu.style.display = "none";
    } else {
      console.log("cancelado!");
    }
  };

  editar[0].onclick = () => {
    console.log("editar clicado");
  };
  // });
}

function cache() {
  try {
    lista.innerHTML = "";
    let usuariosParaAlterar = [];
    getLocalStorage().forEach((doc, index) => {
      const listaItem = GeradorDeListaItem(doc);
      lista.appendChild(listaItem);

      const botaoConfigurar = document.querySelectorAll(".button-config");
      const itemDaLista = document.querySelectorAll(".item-da-lista");

      botaoConfigurar[index].addEventListener("click", () => {
        if (usuariosParaAlterar.includes(doc.id)) {
          usuariosParaAlterar.splice(usuariosParaAlterar.indexOf(doc.id), 1);
        } else {
          usuariosParaAlterar.push(doc.id);
        }
        botaoConfiguracaoMenu(index, itemDaLista, usuariosParaAlterar);
      });
      console.log(doc.id);
    });
  } catch (error) {
    console.log(error);
  }
}
// onclick="configuracao(doc.id)"
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
