import { BoardType } from '../types/Board';
import { axiosInstanсe } from './instance';

type GetBoardResponse = BoardType[];

export const getProjects = async (): Promise<GetBoardResponse | undefined> => {
  try {
    const response = await axiosInstanсe.get('/boards/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
