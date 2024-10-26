import { Task } from '../types/Task';
import { axiosInstanсe } from './instance';

type GetTasksResponse = Task[];

export const getTasks = async (): Promise<GetTasksResponse | undefined> => {
  try {
    const response = await axiosInstanсe.get('/tasks/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const patchTasks = async (
  taskId: number,
  newStage: string,
): Promise<GetTasksResponse | undefined> => {
  try {
    const response = await axiosInstanсe.patch(`tasks/${taskId}/`, { stage: newStage });
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
  }
};

export const deleteTasks = async (taskId: number) => {
  try {
    const response = await axiosInstanсe.delete(`tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
  }
};

export const createTask = async (
  title: string,
  description: string,
  stage: string = 'Бэклог',
  board: number,
): Promise<Task | undefined> => {
  try {
    const response = await axiosInstanсe.post('tasks/', {
      title,
      description,
      stage,
      board,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
  }
};
