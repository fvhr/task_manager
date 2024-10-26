import { Button } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';

interface Task {
  id: number;
  title: string;
  assignee: string;
  status: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  moveTask: (taskId: number, newStatus: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ title, tasks, moveTask }) => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="column-title">{title}</h2>
        <Button   sx={{ color: '#6747c0', border: '1px solid #6747c0' }} size="small" variant="outlined">
          Добавить
        </Button>
      </div>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
