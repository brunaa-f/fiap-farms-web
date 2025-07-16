import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Importa do seu arquivo de setup

// Função de Login com E-mail/Senha
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Função de Cadastro com E-mail/Senha
export const signUp = async (email: string, password: string, additionalData: { [key: string]: unknown }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // CRIA O DOCUMENTO NO FIRESTORE COM O MESMO UID!
  // Isso é essencial para vincular dados ao usuário autenticado.
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    ...additionalData, // ex: { name: 'João', farmName: 'Fazenda Feliz' }
    createdAt: new Date(),
  });

  return user;
};

// Função de Login com Google
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verifica se o usuário já existe no Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // Se não existir, cria um novo documento para ele
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName, // Pega o nome da conta Google
        createdAt: new Date(),
      });
    }
    return user;
}

// Função de Logout
export const doSignOut = async () => {
  await signOut(auth);
};
