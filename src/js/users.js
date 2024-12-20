import {
  auth,
  atualizarUsersFirestore,
  updateUser,
  inserirUserFirestore,
  removerUserFirestore,
  signOutUser,
} from "/src/js/apiservice.js";

const telaPopup = document.querySelector("#tela-adicionar");
const botaoShowTelaAdicionar = document.getElementById("show-tela-adicionar");
const botaoFecharJanela = document.getElementById("fechar");
const getUser = document.getElementById("campo-nome");
const getMatricula = document.getElementById("campo-matricula");
const botaoAtualizar = document.getElementById("show-tela-atualizar");
const lista = document.getElementById("lista-de-users");
const configToMenu = document.querySelector("#config-menu");
// const itemDaLista = document.querySelectorAll(".item-da-lista");

let botaoConfirmarAdicionar = document.getElementById("adicionar");
let editarId;
let usuariosParaAlterar = [];

function reset() {
  configToMenu.style.display = "none";
  usuariosParaAlterar = [];
  // itemDaLista.forEach((item, index) => {
  //   item[index].classList.remove("selecionado")
  // });
}

// Eventos
if (botaoShowTelaAdicionar) {
  botaoShowTelaAdicionar.addEventListener("click", () => {
    reset();
    new ConstrutorTela();
  });
}

if (botaoAtualizar) {
  botaoAtualizar.addEventListener("click", () => {
    reset();
    firebaseParaLocalStorage;
  });
}

if (botaoFecharJanela) {
  botaoFecharJanela.addEventListener("click", () => fecharJanela());
}

document.addEventListener("DOMContentLoaded", () => {
  cache();
});

//Adicionar um verificador de chave primária. Se há chave primária igual, informar que deve ser outra (PRIMARY KEY);

botaoConfirmarAdicionar.addEventListener("click", () => {
  if (botaoConfirmarAdicionar.id === "adicionar") {
    inserirUserFirestore(getUser.value, getMatricula.value)
      .then(() => {
        fecharJanela();
        firebaseParaLocalStorage();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    if (getUser.value.length > 0 && getMatricula.value.length > 0) {
      updateUser(editarId, getUser.value, getMatricula.value);
      fecharJanela();
      firebaseParaLocalStorage();
      reset();
    } else {
      alert("Informe valores válidos para alterar!");
    }
  }
});

//--------------------------------------------

function ConstrutorTela(
  titulo = "Adicionar Usuário",
  imgSrc = "/src/res/images/add_user.svg",
  imgTitle = "Adicionar usuário",
  imgAlt = "Adicionar usuário",
  nome = "Nome",
  matricula = "Matrícula",
  botaoTexto = "Adicionar",
  botaoId = "adicionar"
) {
  if (telaPopup) {
    telaPopup.style.display =
      telaPopup.style.display === "none" ? "flex" : "none";

    const nomePlaceHolder = document.getElementById("campo-nome");
    const matriculaPlaceHolder = document.getElementById("campo-matricula");
    const imagem = document.getElementById("imagem-header");
    const tituloHeader = document.getElementById("titulo-header");
    const botaotextoAdicionar = document.getElementById(
      "botao-texto-adicionar"
    );

    tituloHeader.textContent = titulo;
    imagem.setAttribute("src", imgSrc);
    imagem.setAttribute("title", imgTitle);
    imagem.setAttribute("alt", imgAlt);
    nomePlaceHolder.setAttribute("placeholder", nome);
    matriculaPlaceHolder.setAttribute("placeholder", matricula);
    botaotextoAdicionar.innerHTML = botaoTexto;
    botaoConfirmarAdicionar.id = botaoId;
    console.log(botaoConfirmarAdicionar.id);
  }
}

function fecharJanela() {
  if (telaPopup) {
    telaPopup.style.display = "none";
    getUser.value = "";
    getMatricula.value = "";
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
  const menuItem = document.querySelectorAll(".menu-item");

  console.log(usuariosParaAlterar);

  if (usuariosParaAlterar.length < 1) {
    configToMenu.style.display = "none";
  } else if (usuariosParaAlterar.length >= 2) {
    menuItem[0].style.display = "none";
    menuItem[1].style.height = "75%";
  } else {
    configToMenu.style.display = "flex";
    menuItem[0].style.display = "flex";
    menuItem[1].style.height = "35%";
  }

  menuItem[1].onclick = () => {
    const resultado = window.confirm("Tem certeza que deseja apagar?");
    if (resultado) {
      removerUserFirestore(usuariosParaAlterar);
      configToMenu.style.display = "none";
      firebaseParaLocalStorage();
    } else {
      console.log("cancelado!");
    }
  };

  menuItem[0].onclick = () => {
    editarId = doc.id;
    new ConstrutorTela(
      "Atualizar Usuário",
      "/src/res/images/atualizar_icon.svg",
      "Alterar usuário",
      "Alterar usuário",
      `${doc.nome}`,
      `${doc.matricula}`,
      "Atualizar",
      "atualizar"
    );
  };
}

function cache() {
  try {
    lista.innerHTML = "";
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

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  try {
    signOutUser(auth);
  } catch (e) {
    console.error(e.message);
  }
});
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_all_documents_in_a_collection
