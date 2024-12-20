import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"; //'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"; //"firebase/auth";
import {
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
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

export const auth = getAuth(firebaseConfig);
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

export function createUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log("Usuário autenticado:", user);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}
export function signUser(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log("Usuário autenticado:", user);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}

export function signOutUser(auth) {
  signOut(auth)
    .then(() => {
      window.open("/index.html", "_self");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function verificarAutenticacao(
  callback /*este parâmetro é uma função*/
) {
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      console.log("logged in");
      callback(true);
    } else {
      console.log("no user");
      callback(false);
    }
  });
}

//Users.html
export async function inserirUserFirestore(nome, matricula) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nome: nome,
      matricula: matricula,
    });
  } catch (error) {
    console.log("Erro ao adicionar: ", error);
  }
}

export async function removerUserFirestore(userId) {
  try {
    for (let i = 0; i < userId.length; i++) {
      const docRef = doc(db, "users", userId[i]);
      await deleteDoc(docRef);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function atualizarUsersFirestore() {
  try {
    const docRef = collection(db, "users");
    const querySnapshot = await getDocs(docRef); //objeto

    console.log("Atualizando banco online");
    const users = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("Dados do usuário:", doc.data());
        users.push({ id: doc.id, ...doc.data() });
      });
    } else {
      console.log("Nenhum usuário encontrado!");
    }
    return users;
  } catch (error) {
    console.log("Erro ao obter usuário: ", error);
  }
}

export async function getUser(userId) {
  // Wm3ANj9PbghW1IbVkp7k
  const userRef = collection(db, "users", userId);
  const getUser = await getDoc(userRef);
}

export async function updateUser(userId, nome, matricula) {
  try {
    // db.collection("users").doc(userId).update(newData);

    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      nome: nome,
      matricula: matricula,
    });
    console.log("Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
  }

  /*
  //firebase v9
const db = getFirestore();

//....*/
}
