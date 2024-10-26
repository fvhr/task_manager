import React, { useState } from 'react';
import { Header, RigthDrawer } from '../components';
import { Board } from '../components/card';

export const Tasks: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Header toggleDrawer={toggleDrawer} />
        <RigthDrawer open={open} toggleDrawer={toggleDrawer} />
        <div className="tasks">
          <Board />
        </div>
      </div>
    </div>
  );
};
