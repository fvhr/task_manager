import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SelectUser } from './SelectUser';

interface DrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

export const DrawerAdmin: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            color="primary"
            onClick={toggleDrawer(false)}
            sx={{ marginTop: '1rem', marginRight: '1rem' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#553c9a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-x">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </Button>
        </div>

        <Box sx={{ width: '50vw' }} role="presentation">
          <div className="drawer-admin-title">Панель администратора</div>
          <div className="drawer drawer-admin">
            <div>Иванов И. И.</div>
            <SelectUser />
            <div>20.10.2024</div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};
