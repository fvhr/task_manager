import { Button, FormControl, FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface RegisterFormInputs {
  fio: string;
  login: string;
  password: string;
  confirm_password: string;
}

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();
  const { register: registerUser } = useAuth();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    registerUser(data.fio, data.login, data.password);
  };

  const password = watch('password');

  return (
    <div className="form form__login">
      <div className="form__title">Регистрация</div>
      <Box
        className="form__block"
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1.5, width: '35ch' } }}
        noValidate
        autoComplete="off">
        <div className="form-inputs">
          <FormControl fullWidth error={!!errors.fio}>
            <TextField
              label="ФИО"
              error={!!errors.fio}
              {...register('fio', {
                required: 'Поле ФИО обязательно',
                pattern: {
                  value: /^[А-Яа-яЁё\s-]+$/,
                  message: 'Только кириллица, пробел или дефис',
                },
                maxLength: {
                  value: 50,
                  message: 'Максимум 50 символов',
                },
              })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>{errors.fio?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.login}>
            <TextField
              label="Логин"
              error={!!errors.login}
              {...register('login', {
                required: 'Поле логин обязательно',
                maxLength: {
                  value: 20,
                  message: 'Максимум 20 символов',
                },
              })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>{errors.login?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.password}>
            <TextField
              label="Пароль"
              type="password"
              error={!!errors.password}
              {...register('password', {
                required: 'Поле пароль обязательно',
                maxLength: {
                  value: 20,
                  message: 'Максимум 20 символов',
                },
              })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.confirm_password}>
            <TextField
              label="Повторить пароль"
              type="password"
              error={!!errors.confirm_password}
              {...register('confirm_password', {
                required: 'Поле подтверждения пароля обязательно',
                validate: (value) => value === password || 'Пароли не совпадают',
              })}
            />
            <FormHelperText style={{ marginLeft: '12px' }}>
              {errors.confirm_password?.message}
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          sx={{ backgroundColor: '#9144d8' }}
          type="submit"
          style={{ marginTop: '20px' }}
          variant="contained">
          Зарегистрироваться
        </Button>
      </Box>
			<Link to="/login" className="form__link">Есть аккаунт? Войдите!</Link>
    </div>
  );
};
