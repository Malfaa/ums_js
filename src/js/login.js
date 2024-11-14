import { verificarAutenticacao, googleAuth } from "/src/js/apiservice.js";

const botaoGoogle = document.getElementsByClassName("google");

for (let i = 0; i < botaoGoogle.length; i++) {
  botaoGoogle[i].addEventListener("click", googleAuth);
}

document.addEventListener("DOMContentLoaded", () => {
  verificarAutenticacao((autenticado) => {//autenticado é um boolean da função callback
    if (autenticado) {
      window.location.href = "/src/pages/users.html";
    } else {
      console.log("Usuário não autenticado.");
    }
  });
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
