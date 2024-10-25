import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

export const RigthDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Открыть Drawer</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: '50vw' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
						<div className="drawer">
							<div className="drawer__icon">ИИ</div>
							<div className="drawer__fio">Иванов Иван Александрович</div>
							<div className="drawer__language">Frontend</div>
							<div className="drawer__date">Зарегистрирован 20.10.2024</div>
						</div>
					</Box>
      </Drawer>
    </div>
  );
};
