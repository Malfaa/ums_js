import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"; //'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"; //"firebase/auth";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"; //"firebase/firestore";

//https://firebase.google.com/docs/firestore/quickstart?hl=pt-br

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBO18BnszU-Bv99DMa9keDx_0kEL65q6kk",
  authDomain: "user-management-system-8228c.firebaseapp.com",
  projectId: "user-management-system-8228c",
  storageBucket: "user-management-system-8228c.appspot.com",
  messagingSenderId: "148312015278",
  appId: "1:148312015278:web:5a8bb36c98ea4826cf483f",
  measurementId: "G-XZ8YEFEQP8",
});

const auth = getAuth(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseConfig);

//index.html

export function googleAuth() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // IdP data available using getAdditionalUserInfo(result)
      const user = result.user;
      console.log("Usuário autenticado:", user);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = googleProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.

      // ...
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("logged in");
  } else {
    console.log("no user");
  }
});

//Users.html
export async function adicionarUser(userId, nome, matricula) {
  try {
    await db.collection("users").add({
      nome: nome,
      matricula: matricula,
    });
    console.log("Aidionado com sucesso");
  } catch (error) {
    console.error("Erro ao adicionar: ", error);
  }
}

export function removerUser(userId, nome, matricula) {
  //db.collection("users").doc(userId).deleteDoc()
}

export function atualizarBanco() {
  /*
  TODO db.collection
   está dizendo que não é uma function, provavelmente
   é pq ele está atualizando ou chamando a função que está
   vazia
*/
  try {
    db.collection("users").doc().get();
    console.log("Atualizando banco online");
    if (doc.exists) {
      console.log("Dados do usuário:", doc.data());
    } else {
      console.log("Nenhum usuário encontrado!");
    }
  } catch (error) {
    console.error("Erro ao obter usuário: ", error);
  }
}

function updateUser(userId, newData) {
  try {
    db.collection("users").doc(userId).update(newData);
    console.log("Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
  }
}
