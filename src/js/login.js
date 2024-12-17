import {
  verificarAutenticacao,
  googleAuth,
  auth,
  createUser,
  signUser,
} from "/src/js/apiservice.js";

const botaoGoogle = document.getElementById("icone-google");
const navegar = document.querySelectorAll(".navegar-registrar-login");
const botaoRegistrarLogar = document.getElementById(
  "botao-confirmar-registrar"
);
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confSenha = document.getElementById("confirmar-senha");

const eyeIcon = document.getElementsByClassName("visibility");
const textView = document.getElementsByClassName("textView");

botaoGoogle.addEventListener("click", googleAuth);

document.addEventListener("DOMContentLoaded", () => {
  verificarAutenticacao((autenticado) => {
    //Verifica em qual página está e atribuí o valor correto
    if (navegar[0].id === "nav-logar") {
      botaoRegistrarLogar.id = "botao-confirmar-logar";
    } else {
      botaoRegistrarLogar.id = "botao-confirmar-registrar";
    }
    //autenticado é um boolean da função callback
    if (autenticado) {
      window.location.href = "/src/pages/users.html";
    } else {
      console.log("Usuário não autenticado.");
    }
  });
});

Array.from(eyeIcon).forEach((item, index) => {
  item.addEventListener("click", () => {
    if (textView[index + 1].type === "password") {
      item.src = "src/res/images/visibility_24.svg";
      textView[index + 1].type = "text";
    } else {
      item.src = "src/res/images/visibility_off_24.svg";
      textView[index + 1].type = "password";
    }
  });
});

navegar[0].addEventListener("click", () => {
  if (navegar[0].id === "nav-registrar") {
    window.open("/src/pages/login.html", "_self");
  } else {
    window.open("/index.html", "_self");    
  }
});


botaoRegistrarLogar.addEventListener("click", () => {
  try {
    if (botaoRegistrarLogar.id === "botao-confirmar-registrar") {
      if (senha.value === confSenha.value) {
        createUser(auth, email.value, senha.value).then((result) => {
          alert("Carregando...");
        }).catch((error) => {
          console.log(error);
        });
      } else {
        confSenha.classList.add("textViewComErro");
      }
    } else {
      signUser(auth, email.value, senha.value).then(console.log("Logado"));
    }
  } catch (error) {
    Error("Status" + error.status);
  }
});