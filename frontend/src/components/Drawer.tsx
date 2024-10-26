import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

interface DrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

export const RigthDrawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const [fio, setFio] = useState<string>('Иванов Иван Иванович');
  const [language, setLanguage] = useState<string>('Frontend');

  const [isEditingFio, setIsEditingFio] = useState<boolean>(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState<boolean>(false);
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const handleEditFio = () => setIsEditingFio(true);
  const handleEditLanguage = () => setIsEditingLanguage(true);

  const handleSaveChanges = () => {
    setIsEditingFio(false);
    setIsEditingLanguage(false);
    setIsEditingDate(false);
  };

  return (
    <div>
      <Drawer anchor="right" open={open}  onClose={toggleDrawer(false)}>
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
          <div className="drawer">
            <div className="drawer__icon">ИИ</div>

            {isEditingFio ? (
              <TextField
                value={fio}
                onChange={(e) => setFio(e.target.value)}
                autoFocus
                fullWidth
                sx={{ width: '45ch', marginTop: '10px' }}
              />
            ) : (
              <div style={{ fontSize: '1.6rem', marginTop: '25px' }}>
                {fio}
                <IconButton onClick={handleEditFio}>
                  <EditIcon />
                </IconButton>
              </div>
            )}

            {isEditingLanguage ? (
              <TextField
                sx={{ marginTop: '20px', width: '45ch' }}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                autoFocus
                fullWidth
              />
            ) : (
              <div style={{ fontSize: '1.4rem', marginTop: '15px' }}>
                {language}
                <IconButton onClick={handleEditLanguage}>
                  <EditIcon />
                </IconButton>
              </div>
            )}

            <div style={{ marginTop: '30px' }}>Зарегистрирован 20.10.2024</div>

            {(isEditingFio || isEditingLanguage || isEditingDate) && (
              <Button
                variant="contained"
                onClick={handleSaveChanges}
                sx={{ marginTop: '2.5rem', backgroundColor: '#6747c0' }}>
                Сохранить
              </Button>
            )}
          </div>
        </Box>
      </Drawer>
    </div>
  );
};
