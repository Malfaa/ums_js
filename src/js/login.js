import { verificarAutenticacao, googleAuth } from "/src/js/apiservice.js";

const botaoGoogle = document.getElementById("icone-google");
const navegar = document.querySelectorAll(".navegar-registrar-login");
const botaoRegistrarLogar = document.querySelector(
  "#botao-confirmar-registrar-login"
);
const titulo = document.querySelector("#titulo");
const confirmarEmail = document.getElementById("confirmar-senha");

const eyeIcon = document.getElementsByClassName("visibility");
const senha = document.getElementsByClassName("textView");

let status = "Registrar";

botaoGoogle.addEventListener("click", googleAuth);

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

navegar[0].addEventListener("click", () => {
  if (navegar[0].id === "nav-registrar") {
    window.open("/src/pages/login.html", "_self");
  } else {
    window.open("/index.html", "_self");
  }
});

Array.from(eyeIcon).forEach((item, index) => {
  item.addEventListener("click", () => {
    if (senha[index + 1].type === "password") {
      item.src = "src/res/images/visibility_24.svg";
      senha[index + 1].type = "text";
    } else {
      item.src = "src/res/images/visibility_off_24.svg";
      senha[index + 1].type = "password";
    }
  });
});

//-----------------------------------------------------------

// botaoRegistrarLogar.addEventListener("click", () => {
//   //verificar se os textViews estão com dados de acordo, se não, notificar
//   // qual está errado class = "textView textViewComErro"
//   try {
//     if (status === "Registrar") {
//       registrarUsuario();
//     } else {
//       logarUsuario();
//     }
//   } catch (e) {}
// });

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
