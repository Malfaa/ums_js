import * as repositorio from "/src/js/repositorio/repositorio.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*

    //Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    */

//TODO verificar firebase

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBO18BnszU-Bv99DMa9keDx_0kEL65q6kk",
  authDomain: "user-management-system-8228c.firebaseapp.com",
  projectId: "user-management-system-8228c",
  storageBucket: "user-management-system-8228c.appspot.com",
  messagingSenderId: "148312015278",
  appId: "1:148312015278:web:5a8bb36c98ea4826cf483f",
  measurementId: "G-XZ8YEFEQP8",
});

const auth = getAuth();
const db = getFirestore();

const adicionarPopup = document.querySelector("#adicionar-popup");
const adicionarBotao = document.getElementById("adicionar");
const fecharJanelaBotao = document.getElementById("fechar");

function adicionarScreen() {
  if (adicionarPopup.style.display === "none") {
    adicionarPopup.style.display = "flex";
  } else {
    adicionarPopup.style.display = "none";
  }
}

function fecharJanela() {
  adicionarPopup.style.display = "none";
}

adicionarBotao.addEventListener("click", adicionarScreen);

repositorio.atualizarBotao.addEventListener(
  "click",
  repositorio.atualizarBanco
);

fecharJanelaBotao.addEventListener("click", fecharJanela);

// TODO continuação
//{Fazer o login mobile, autenticar com o firebase e depois fetch customizado com o item em lista, em seguida func atualizarBanco}
