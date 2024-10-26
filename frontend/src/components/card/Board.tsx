import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deleteTasks, getTasks, patchTasks } from '../../api/tasks';
import { Task } from '../../types/Task';
import { Column } from './Column';

type GetTasksResponse = Task[];

export const Board = () => {
  const [tasks, setTasks] = useState<GetTasksResponse | undefined>(undefined);
  const [updateFlag, setUpdateFlag] = useState(false);

  const fetchTasks = async () => {
    try {
      const result = await getTasks();
      setTasks(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tasks);

  useEffect(() => {
    fetchTasks();
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
        />
        <Column
          title="В процессе"
          tasks={tasks ? tasks.filter((task) => task.stage === 'В процессе') : []}
          moveTask={moveTask}
          deleteTask={deleteTaskHandler}
        />
        <Column
          title="Выполнено"
          tasks={tasks ? tasks.filter((task) => task.stage === 'Выполнено') : []}
          moveTask={moveTask}
          deleteTask={deleteTaskHandler}
        />
      </div>
    </DndProvider>
  );
};
