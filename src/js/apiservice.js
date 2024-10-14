import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";//'firebase/app'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";//"firebase/auth";
import { getFirestore, collection, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";//"firebase/firestore";

//https://firebase.google.com/docs/firestore/quickstart?hl=pt-br

/*

    //Import the functions you need from the SDKs you need
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

const auth = getAuth(firebaseConfig);
const googleProvider = auth.GoogleAuthProvider();
const db = getFirestore(firebaseConfig);


//index.html

export function googleAuth(){
  auth().signInWithPopup(googleProvider)
    .then((result) => {
        const user = result.user;
        console.log("Usuário autenticado:", user);
    })
    .catch((error) => {
        console.error("Erro ao fazer login:", error);
    });
}

/*auth().addStateDidChangeListener { (auth, user) in
    if let user = user {
      let email = user.email
      // ...
    }
  }

  auth().signIn(withEmail: userEmail, password: password) { (user, error) in
    if let user = user {
      // ...
    }
  }*/

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      console.log("logged in");
    } else {
      console.log("no user");
    }
  });

//Users.html
export async function adicionarUser(userId, nome, matricula){
  await db.collection("users").add({
    nome: nome,
    matricula: matricula
  }).then(()=>{
    console.log("Aidionado com sucesso");
  }).catch(()=>{
    console.error("Erro ao adicionar: ", error);
  });
}

function removerUser(userId, nome, matricula){
  //db.collection("users").doc(userId).deleteDoc()
}

function atualizarBanco(/*userId*/){
  db.collection("users").doc().get()
  .then((doc) => {
    if (doc.exists) {
        console.log("Dados do usuário:", doc.data());
    } else {
        console.log("Nenhum usuário encontrado!");
    }
})
.catch((error) => {
    console.error("Erro ao obter usuário: ", error);
})};

function updateUser(userId, newData) {
  db.collection("users").doc(userId).update(newData)
  .then(() => {
      console.log("Usuário atualizado com sucesso!");
  })
  .catch((error) => {
      console.error("Erro ao atualizar usuário: ", error);
  });
}