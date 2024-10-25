import React from 'react';
import { Header, RigthDrawer } from '../components';

export const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <RigthDrawer />
      </div>
    </div>
  );
};
