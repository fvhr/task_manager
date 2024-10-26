import { Box, Button, Collapse, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Project: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

	const navigate = useNavigate();

  return (
    <Box>
      <Button
        sx={{ border: '1px solid white', color: 'white' }}
        onClick={handleToggle}
        variant="outlined"
        size="large">
        Проект 1
      </Button>
      <Collapse in={open}>
        <Box
				onClick={() => navigate(`/tasks/1`)}
          sx={{
            marginTop: 2,
            padding: 2,
            border: '1px solid #ccc',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateX(6px)',
              backgroundColor: '#bc87ed',
            },
          }}>
          <Typography sx={{ marginBottom: 2 }} variant="h5">
            Название проекта
          </Typography>
          <Typography variant="body1">Здесь будет информация о проекте 1.</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};
