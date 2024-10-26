import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getProjects } from '../../api/projects';
import { createTask, deleteTasks, getTasks, patchTasks } from '../../api/tasks';
import { BoardType } from '../../types/Board';
import { FormTask, Task } from '../../types/Task';
import { Column } from './Column';

type GetTasksResponse = Task[];
type GetProjectsResponse = BoardType[];

export const Board = () => {
  const [tasks, setTasks] = useState<GetTasksResponse | undefined>(undefined);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [projects, setProjects] = useState<GetProjectsResponse | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const fetchTasks = async () => {
    try {
      const result = await getTasks();
      setTasks(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const result = await getProjects();
      setProjects(result);
    } catch (error) {
      console.log('Ошибка', error);
    }
  };

  const createTaskHandler = async (data: FormTask) => {
    try {
      await createTask(data.title, data.description, data.stage, data.board);
      setUpdateFlag((prev) => !prev);
      handleClose();
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, [updateFlag]);

  const moveTask = async (taskId: number, newStage: string) => {
    try {
      await patchTasks(taskId, newStage);
      setUpdateFlag((prev) => !prev);
    } catch (error) {
      console.log('Ошибка при обновлении задачи:', error);
    }
  };

  const deleteTaskHandler = async (taskId: number) => {
    try {
      await deleteTasks(taskId);
      setUpdateFlag((prev) => !prev);
    } catch (error) {
      console.log('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Column
          title="Бэклог"
          tasks={tasks ? tasks.filter((task) => task.stage === 'Бэклог') : []}
          moveTask={moveTask}
          deleteTask={deleteTaskHandler}
          createTaskHandler={createTaskHandler}
          openModal={openModal}
          handleClose={handleClose}
          handleOpen={handleOpen}
          projects={projects || []}
        />
        <Column
          title="В процессе"
          tasks={tasks ? tasks.filter((task) => task.stage === 'В процессе') : []}
          moveTask={moveTask}
          deleteTask={deleteTaskHandler}
          createTaskHandler={createTaskHandler}
          openModal={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
          projects={projects || []}
        />
        <Column
          title="Выполнено"
          tasks={tasks ? tasks.filter((task) => task.stage === 'Выполнено') : []}
          moveTask={moveTask}
          deleteTask={deleteTaskHandler}
          createTaskHandler={createTaskHandler}
          handleClose={handleClose}
          openModal={openModal}
          handleOpen={handleOpen}
          projects={projects || []}
        />
      </div>
    </DndProvider>
  );
};
