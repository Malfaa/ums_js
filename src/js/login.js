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
