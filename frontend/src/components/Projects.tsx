import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api/projects';
import { BoardType } from '../types/Board';

type GetBoardResponse = BoardType[];

export const Project: React.FC = () => {
  const [projects, setProjects] = useState<GetBoardResponse | undefined>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {projects?.map((el) => (
        <Box
				key={el.id}
          onClick={() => navigate(`/project/${el.id}`)}
          sx={{
            marginTop: 2,
            padding: 3.5,
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
            {el.title}
          </Typography>
          <Typography variant="body1">Здесь будет информация о проекте</Typography>
        </Box>
      ))}
    </div>
  );
};
