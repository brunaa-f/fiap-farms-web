import React, { useState } from 'react';
import { signIn } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonHovered, setButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro no login:", error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>FIAP Farms - Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <button 
            type="submit" 
            style={{...styles.button, ...(isButtonHovered ? styles.buttonHover : null)}}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            Entrar
          </button>
        </form>
        <Link to="/register" style={styles.link}>
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  formContainer: { padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '24px', textAlign: 'center' },
  input: { height: '50px', padding: '0 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' },
  button: { height: '50px', border: 'none', borderRadius: '8px', backgroundColor: '#2a69ac', color: 'white', fontSize: '18px', cursor: 'pointer', transition: 'background-color 0.3s' },
  buttonHover: { backgroundColor: '#21558a' },
  link: { marginTop: '20px', textAlign: 'center', color: '#2a69ac', textDecoration: 'none' }
};