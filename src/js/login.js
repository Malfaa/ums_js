import { verificarAutenticacao, googleAuth } from "/src/js/apiservice.js";

const botaoGoogle = document.getElementsByClassName("google");
const navegar = document.querySelectorAll(".navegar-registrar-login");
const botaoRegistrarLogar = document.querySelector(
  "#botao-confirmar-registrar-login"
);
const titulo = document.querySelector("#titulo");
const confirmarEmail = document.getElementById("confirmar-senha");

let status = "Registrar";

for (let i = 0; i < botaoGoogle.length; i++) {
  botaoGoogle[i].addEventListener("click", googleAuth);
}

document.addEventListener("DOMContentLoaded", () => {
  verificarAutenticacao((autenticado) => {
    //autenticado é um boolean da função callback
    if (autenticado) {
      window.location.href = "/src/pages/users.html";
    } else {
      console.log("Usuário não autenticado.");
    }
  });
});

//-----------------------------------------------------------

navegar[0].addEventListener("click", () => {
  if (navegar[0].id === "nav-registrar") {
    trocarParaLogar();
  } else {
    trocarParaRegistrar();
  }
});

function trocarParaLogar() {
  titulo.textContent = "Logar";
  navegar[0].textContent = "Não possui cadastro? Clique aqui";
  navegar[0].id = "nav-logar";
  confirmarEmail.style.display = "none";
  status = "Logar";
}

function trocarParaRegistrar() {
  titulo.textContent = "Registrar";
  navegar[0].textContent = "Já está registrado? Clique aqui ";
  navegar[0].id = "nav-registrar";
  confirmarEmail.style.display = "block";
  status = "Registrar";
}

function registrarUsuario() {
  //registrar
  console.log("registrar");
}

function logarUsuario() {
  //logar
  console.log("logar");
}

botaoRegistrarLogar.addEventListener("click", () => {
  //verificar se os textViews estão com dados de acordo, se não, notificar
  // qual está errado class = "textView textViewComErro"
  try {
    if (status === "Registrar") {
      registrarUsuario();
    } else {
      logarUsuario();
    }
  } catch (e) {}
});

//TODO: fix ao invés de carregar a página e depois carregar a outra, seria melhor deixar a tela em branco um pouco
// com  o ícone de loading até carregar a próxima página e assim dar display.

// auth.addStateDidChangeListener { (auth, user) in
//     if let user = user {
//       let email = user.email
//       // ...
//     }
//   }

//   auth().signIn(withEmail: userEmail, password: password) { (user, error) in
//     if let user = user {
//       // ...
//     }
//   }
