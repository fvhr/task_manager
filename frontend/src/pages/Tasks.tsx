import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, RigthDrawer } from '../components';
import { Board } from '../components/card';

export const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isInstall = true;

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container">
        <Header isInstall={isInstall} toggleDrawer={toggleDrawer} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            cursor: 'pointer',
            marginTop: '60px',
            fontSize: '1.25rem',
          }}
          onClick={() => navigate('/home')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-left">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
          Назад к проектам
        </div>
        <RigthDrawer open={open} toggleDrawer={toggleDrawer} />
        <div className="tasks">
          <Board />
        </div>
      </div>
    </div>
  );
};
