import * as api from "/src/js/apiservice.js";

const botaoGoogle = document.getElementsByClassName("google");

for (let i = 0; i < botaoGoogle.length; i++) {
  botaoGoogle[i].addEventListener("click", api.googleAuth);
};

document.addEventListener("DOMContentLoaded", () => {
  if (auth !== null){
    window.location.href = "users.html";
} 
});//auth

//TODO assim que confirmar logged in já passar para a tela users
//TODO verificar assim que logado ir direto para users

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