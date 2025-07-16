import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUserStore();

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de Spinner
  }

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a rota filha (ex: Dashboard)
  return <Outlet />;
};