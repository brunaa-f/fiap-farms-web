import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import { AuthListener } from './components/AuthListener';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { Dashboard } from './pages/Dashboard'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* O AuthListener ouve o estado do Firebase em toda a aplicação */}
      <AuthListener />
      <Routes>
        {/* Rota raiz redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
          {/* Adicione outras rotas protegidas aqui, como /products, /sales, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);