import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface DrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

export const RigthDrawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  return (
    <div>
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
