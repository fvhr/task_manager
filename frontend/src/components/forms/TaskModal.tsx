import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTask } from '../../types/Task';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  projects: { id: number; title: string }[];
  users: { id: number; title: string }[];
  onSubmit: (data: FormTask) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  projects,
  users,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTask>();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 335,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Создать задачу
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.title}>
          <TextField
            label="Название"
            {...register('title', {
              required: 'Поле название обязательно',
              maxLength: {
                value: 50,
                message: 'Максимум 50 символов',
              },
            })}
            error={!!errors.title}
          />
          <FormHelperText>{errors.title?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.description}>
          <TextField
            label="Описание"
            multiline
            rows={4}
            {...register('description', {
              maxLength: {
                value: 200,
                message: 'Максимум 200 символов',
              },
            })}
            error={!!errors.description}
          />
          <FormHelperText>{errors.description?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.project}>
          <InputLabel id="project-label">Проект</InputLabel>
          <Select
            labelId="project-label"
            label="Проект"
            {...register('board', {
              required: 'Поле проект обязательно',
            })}
            defaultValue="">
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.project?.message}</FormHelperText>
        </FormControl>{' '}
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.user}>
          <InputLabel id="user-label">Пользователь</InputLabel>
          <Select
            labelId="user-label"
            label="Пользователь"
            {...register('user', {
              required: 'Поле пользователь обязательно',
            })}
            defaultValue="">
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.user?.message}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: '#9144d8', mt: 2 }}
          fullWidth>
          Создать задачу
        </Button>
      </Box>
    </Modal>
  );
};
