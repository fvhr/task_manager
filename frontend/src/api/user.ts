import axios from 'axios';
import { axiosInstanсe } from './instance';

export const userRegister = async (fio: string, username: string, password: string) => {
  const data = { fio, username, password };
  try {
    const response = await axiosInstanсe.post('auth/user/register/', data);
    return response;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const userAuth = async (username: string, password: string) => {
  const data = { username, password };
  try {
    const response = await axiosInstanсe.post('auth/user/login/', data);
    localStorage.setItem('access', response.data.access_token);
    localStorage.setItem('refresh', response.data.refresh_token);
    return response;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
export const userRefreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  try {
    const response = await axios.post('https://task_manager_api.cl.ru.net/auth/user/refresh/', null, {
      headers: {
        Authorization: `Bearer ${refresh}`
      }
    });
    localStorage.setItem('access', response.data.access_token);
    return response;
  } catch (error) {
    console.log('Ошибка', error);
  }
};


export const userInfo = async () => {
  try {
    const response = await axiosInstanсe.get('auth/user/info/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
