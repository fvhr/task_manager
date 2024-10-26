import React, { useState } from 'react';
import { DrawerAdmin, Header, Project, RigthDrawer } from '../components';

export const Home: React.FC = () => {
	const [open, setOpen] = useState(false);
	const isInstall = false;

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Header isInstall={isInstall} toggleDrawer={toggleDrawer} />
        <DrawerAdmin open={open} toggleDrawer={toggleDrawer} />
				<div className="project">
					<Project/>
				</div>
      </div>
    </div>
  );
};
