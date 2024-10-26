import { Button, CircularProgress, FormControl, FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userAuth } from '../../api/user';

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true);
      const response = await userAuth(data.username, data.password);

      if (response) {
        navigate('/home');
      } else {
        console.log('Не удалось войти. Проверьте свои учетные данные.');
      }
    } catch (error) {
      console.log('Ошибка при входе:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    navigate('/home');
  };

  return (
    <div className="form form__login">
      <div className="form__title">Авторизация</div>
      <Box
        className="form__block"
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1.5, width: '35ch' } }}
        autoComplete="off">
        <div className="form-inputs">
          <FormControl fullWidth error={!!errors.username}>
            <TextField
              label="Имя пользователя"
              error={!!errors.username}
              {...register('username', { required: 'Поле имя пользователя обязательно' })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>
              {errors.username?.message}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.password}>
            <TextField
              type="password"
              label="Пароль"
              error={!!errors.password}
              {...register('password', { required: 'Поле пароль обязательно' })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          sx={{ backgroundColor: '#9144d8' }}
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained">
          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Войти'}
        </Button>
      </Box>
      <Button
        onClick={handleLogout}
        sx={{ border: '1px solid #9144d8', color: '#9144d8' }}
        type="submit"
        style={{ marginTop: '25px' }}
        variant="outlined">
        Войти без авторизации
      </Button>
      <Link to="home"></Link>
      <Link to="/register" className="form__link">
        Нет аккаунта? Зарегиструйтесь!
      </Link>
    </div>
  );
};
