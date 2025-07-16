import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUserStore } from '../store/userStore';

export const AuthListener = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Quando o estado do Firebase muda (login, logout),
      // atualizamos nosso store global.
      setUser(user);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [setUser]);

  return null; // Este componente não renderiza nada
};
