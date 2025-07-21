import React, { useState } from 'react';
import { FiLogOut } from "react-icons/fi";

interface HeaderProps {
  farmName: string | null | undefined;
  onLogout: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: '100%',
    backgroundColor: 'var(--card-bg)',
    borderBottom: '1px solid var(--border-light)',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px', 
  },
  userIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
  },
  farmName: {
    fontWeight: '600',
    fontSize: '16px',
  },
  logoutButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
  },
};

export const Header = ({ farmName, onLogout }: HeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.userInfo}>
        <div style={styles.userIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
        <span style={styles.farmName}>{farmName || 'Santa Rita'}</span>
        
        <button
          style={{
            ...styles.logoutButton,
            backgroundColor: isHovered ? 'var(--bg-light)' : 'transparent',
          }}
          onClick={onLogout}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title="Sair" 
        >
          <FiLogOut size={22} color="var(--text-secondary)" />
        </button>
      </div>
    </header>
  );
};