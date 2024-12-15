import {
  verificarAutenticacao,
  googleAuth,
  createUser,
  signUser,
} from "/src/js/apiservice.js";

const botaoGoogle = document.getElementById("icone-google");
const navegar = document.querySelectorAll(".navegar-registrar-login");
const botaoRegistrarLogar = document.getElementById("botao-confirmar-registrar");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confSenha = document.getElementById("confirmar-senha");

const eyeIcon = document.getElementsByClassName("visibility");
const textView = document.getElementsByClassName("textView");

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
    botaoRegistrarLogar.id = "botao-confirmar-logar";
  } else {
    window.open("/index.html", "_self");
    botaoRegistrarLogar.id = "botao-confirmar-registrar";
  }
});

botaoRegistrarLogar.addEventListener("click", () => {  //TODO trocar o id do Botão p/ botao-confirmar-logar, o botão só não está respondendo por causa do id que não alterou
  try {
    if (botaoRegistrarLogar.id === "botao-confirmar-registrar") {
      if (senha.value === confSenha.value) {
        createUser(googleAuth, email.value, senha.value);
      } else {
        confSenha.classList.add("textViewComErro");
      }
    } else {
      signUser(googleAuth, email.value, senha.value).then(console.log("teste"));
    }
  } catch (error) {
    Error("Status" + error.status);
  }
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
