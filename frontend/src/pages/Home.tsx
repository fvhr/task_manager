import React, { useEffect, useState } from 'react';
import { userInfo } from '../api/user';
import { DrawerAdmin, Header, Project, RigthDrawer } from '../components';
import { User } from '../types/User';

export const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isInstall = false;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [user, setUser] = useState<User>()

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result: User | undefined = await userInfo();
        if (result) {
          setIsAdmin(result.is_superuser);
					setUser(result)
        }
      } catch (error) {
        console.log('Ошибка', error);
      }
    };
    fetchUserInfo();
  }, []);

	console.log(user);
	

  return (
    <div className="wrapper">
      <div className="container">
        <Header isInstall={isInstall} toggleDrawer={toggleDrawer} />
        {isAdmin ? (
          <DrawerAdmin open={open} toggleDrawer={toggleDrawer} />
        ) : (
          <RigthDrawer user={user || undefined} open={open} toggleDrawer={toggleDrawer} />
        )}

        <div className="project">
          <Project />
        </div>
      </div>
    </div>
  );
};
