import {
  atualizarUsersFirestore,
  inserirUserFirestore,
  removerUserFirestore,
} from "/src/js/apiservice.js";

//TODO adicionar  ícone no Adicionar e Atualizar dos browsers.
//TODO alert p/ quando clicar nas outras abas.

const telaPopup = document.querySelector("#tela-adicionar");
const botaoShowTelaAdicionar = document.getElementById("show-tela-adicionar");
const botaoFecharJanela = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const botaoConfirmarAdicionar = document.getElementById("adicionar");
const botaoAtualizar = document.getElementById("show-tela-atualizar");
const lista = document.getElementById("lista-de-users");

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

function abreTelaAdicionar() {
  if (telaPopup) {
    telaPopup.style.display =
      telaPopup.style.display === "none" ? "flex" : "none";

    const nomePlaceHolder = document.getElementById("campo-nome");
    const matriculaPlaceHolder = document.getElementById("campo-matricula");
    const imagem = document.getElementById("imagem-header");
    const botao = document.getElementById("adicionar");
    const tituloHeader = document.getElementById("titulo-header");
    const botaotextoAdicionar = document.getElementById("botao-texto-adicionar");

    tituloHeader.innerHTML = "Adicionar Usuário";
    imagem.setAttribute("src", "/src/res/images/add_user.svg");
    imagem.setAttribute("title","Adicionar usuário");
    imagem.setAttribute("alt","Adicionar usuário");
    nomePlaceHolder.setAttribute("placeholder", "Nome");
    matriculaPlaceHolder.setAttribute("placeholder", "Matrícula");
    botaotextoAdicionar.innerHTML = "Adicionar";
  }
}

function fecharJanela() {
  if (telaPopup) {
    telaPopup.style.display = "none";
  }
}

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

function botaoConfiguracaoMenu(index, doc, item, usuariosParaAlterar) {
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
    telaPopup.style.display =
    telaPopup.style.display === "none" ? "flex" : "none";

    const nomePlaceHolder = document.getElementById("campo-nome");
    const matriculaPlaceHolder = document.getElementById("campo-matricula");
    const imagem = document.getElementById("imagem-header");
    // const botao = document.getElementById("adicionar");
    const tituloHeader = document.getElementById("titulo-header");
    const botaotextoAdicionar = document.getElementById("botao-texto-adicionar");

    tituloHeader.innerHTML = "Atualizar Usuário";
    imagem.setAttribute("src", "/src/res/images/atualizar_icon.svg");
    imagem.setAttribute("title","Alterar usuário");
    imagem.setAttribute("alt","Alterar usuário");
    nomePlaceHolder.setAttribute("placeholder", `${doc.nome}`);
    matriculaPlaceHolder.setAttribute("placeholder", `${doc.matricula}`);
    botaotextoAdicionar.innerHTML = "Atualizar";
  };
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
        botaoConfiguracaoMenu(index, doc, itemDaLista, usuariosParaAlterar);
      });
      console.log(doc.id);
    });
  } catch (error) {
    console.log(error);
  }
}
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
