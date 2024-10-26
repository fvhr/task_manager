import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Project: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        onClick={() => navigate(`/project/1`)}
        sx={{
          marginTop: 2,
          padding: 2,
          border: '1px solid #ccc',
          color: '#000',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateX(6px)',
          },
        }}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Название проекта
        </Typography>
        <Typography variant="body1">Здесь будет информация о проекте</Typography>
      </Box>
    </Box>
  );
};
