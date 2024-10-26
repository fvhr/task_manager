import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Column } from './Column';

const initialTasks = [
  { id: 1, title: 'Задача 1', assignee: 'Иван', status: 'Бэклог' },
  { id: 2, title: 'Задача 2', assignee: 'Мария', status: 'В процессе' },
  { id: 3, title: 'Задача 3', assignee: 'Сергей', status: 'Выполнено' },
];

export const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Column
          title="Бэклог"
          tasks={tasks.filter((task) => task.status === 'Бэклог')}
          moveTask={moveTask}
        />
        <Column
          title="В процессе"
          tasks={tasks.filter((task) => task.status === 'В процессе')}
          moveTask={moveTask}
        />
        <Column
          title="Выполнено"
          tasks={tasks.filter((task) => task.status === 'Выполнено')}
          moveTask={moveTask}
        />
      </div>
    </DndProvider>
  );
};
