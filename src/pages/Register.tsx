import React, { useState } from 'react';
import { signUp } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [isButtonHovered, setButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !farmName) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    const additionalData = { name, farmName };
    try {
      await signUp(email, password, additionalData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert('Falha ao criar conta.');
    }
  };

  return (
    <div style={styles.container}>
        <div style={styles.formContainer}>
            <h2 style={styles.title}>Cadastro</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <input style={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu Nome Completo" required />
                <input style={styles.input} type="text" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder="Nome da Fazenda" required />
                <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mínimo 6 caracteres)" required />
                <button 
                  type="submit" 
                  style={{...styles.button, ...(isButtonHovered ? styles.buttonHover : null)}}
                  onMouseEnter={() => setButtonHovered(true)}
                  onMouseLeave={() => setButtonHovered(false)}
                >
                  Cadastrar
                </button>
            </form>
            <Link to="/login" style={styles.link}>
                Já tem uma conta? Faça login
            </Link>
        </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px 0' },
  formContainer: { padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '24px', textAlign: 'center' },
  input: { height: '50px', padding: '0 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' },
  button: { height: '50px', border: 'none', borderRadius: '8px', backgroundColor: '#2a69ac', color: 'white', fontSize: '18px', cursor: 'pointer', transition: 'background-color 0.3s' },
  buttonHover: { backgroundColor: '#21558a' },
  link: { marginTop: '20px', textAlign: 'center', color: '#2a69ac', textDecoration: 'none' }
};