import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"; //'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"; //"firebase/auth";
import {
  getFirestore,
  addDoc,
  getDoc,
  getDocs,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"; //"firebase/firestore";

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
      //const credential = googleProvider.credentialFromResult(result);
      //const token = credential.accessToken;
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
export async function adicionarUser(nome, matricula) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nome: nome,
      matricula: matricula,
    });
    console.log("Aidionado com sucesso", docRef.id);
  } catch (error) {
    console.log("Erro ao adicionar: ", error);
  }
}

export async function removerUser(userId) {
  try {
    const docRef = doc(db, "users", userId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}

export async function atualizarBanco() {
  try {
    const docRef = collection(db, "users");
    const querySnapshot = await getDocs(docRef);//objeto

    console.log("Atualizando banco online");

    if (!querySnapshot.empty) {
      const users = [];
      querySnapshot.forEach((doc) => {
        console.log("Dados do usuário:", doc.data());
        users.push({...doc.data()});
      });

      return users;
    } else {
      console.log("Nenhum usuário encontrado!");
    } 
  } catch (error) {
    console.log("Erro ao obter usuário: ", error);
  }
}

export async function getUser(userId) {
  // Wm3ANj9PbghW1IbVkp7k
  const userRef = collection(db, "users", userId);
  const getUser = await getDoc(userRef);
}

function updateUser(userId, newData) {
  try {
    db.collection("users").doc(userId).update(newData);
    console.log("Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
  }
}
