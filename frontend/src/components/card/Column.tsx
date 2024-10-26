import { Button } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';
import { BoardType } from '../../types/Board';
import { FormTask, Task } from '../../types/Task';
import { TaskModal } from '../forms';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  moveTask: (taskId: number, newStatus: string) => void;
  deleteTask: (taskId: number) => void;
  createTaskHandler: (data: FormTask) => Promise<void>;
  openModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  projects: BoardType[];
}

export const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  moveTask,
  deleteTask,
  handleOpen,
  createTaskHandler,
  projects,
  openModal,
  handleClose,
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'task',
    drop: (item: { id: number }) => moveTask(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  let borderColor;
  switch (title) {
    case 'Бэклог':
      borderColor = '#787878';
      break;
    case 'В процессе':
      borderColor = '#e6e60b';
      break;
    case 'Выполнено':
      borderColor = '#10ad10';
      break;
    default:
      borderColor = 'gray';
  }

  const users = [
    {
      id: 1,
      password: '1234',
      title: 'тест',
      fio: 'тест',
    },
  ];

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        padding: '1rem',
        backgroundColor: isOver ? '#dbdbdb' : 'white',
        border: `3px solid ${borderColor}`,
        borderRadius: '4px',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
        <h2 className="column-title">{title}</h2>
        <Button
          onClick={handleOpen}
          sx={{ color: '#6747c0', border: '1px solid #6747c0' }}
          size="small"
          variant="outlined">
          Добавить
        </Button>
      </div>

      <TaskModal
        open={openModal}
        handleClose={handleClose}
        projects={projects || []}
        users={users}
        onSubmit={createTaskHandler}
      />

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
      ))}
    </div>
  );
};
