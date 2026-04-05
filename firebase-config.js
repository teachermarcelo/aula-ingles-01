// firebase-config.js

// Importar as funções que precisamos dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// SUAS CONFIGURAÇÕES DO FIREBASE (Substitua pelos dados que você copiou no passo 4)
const firebaseConfig = {
  apiKey: "AIzaSyCwnWDz0aCImvQNKdW6xzSRjkK_VVomGq4",
  authDomain: "englishpath-2d558.firebaseapp.com",
  projectId: "englishpath-2d558",
  storageBucket: "englishpath-2d558.firebasestorage.app",
  messagingSenderId: "384301599670",
  appId: "1:384301599670:web:f16d2adf8a1714fd034f17"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Funções de Autenticação
export const registrarUsuario = async (email, senha, nome) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        
        // Salvar dados extras no Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            email: email,
            role: "aluno", // ou "admin"
            criadoEm: new Date()
        });
        
        return { sucesso: true, usuario: user };
    } catch (error) {
        return { sucesso: false, erro: error.message };
    }
};

export const logarUsuario = async (email, senha) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        return { sucesso: true, usuario: userCredential.user };
    } catch (error) {
        return { sucesso: false, erro: error.message };
    }
};

export const sairUsuario = async () => {
    await signOut(auth);
};
