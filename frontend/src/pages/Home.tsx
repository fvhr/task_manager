import React, { useState } from 'react';
import { Header, Project, RigthDrawer } from '../components';

export const Home: React.FC = () => {
	const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Header toggleDrawer={toggleDrawer} />
        <RigthDrawer open={open} toggleDrawer={toggleDrawer} />
				<div className="project">
					<Project/>
				</div>
      </div>
    </div>
  );
};
