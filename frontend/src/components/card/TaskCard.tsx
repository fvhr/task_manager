import { Button } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { Task } from '../../types/Task';

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="task-card"
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '1rem',
        margin: '0.5rem 0',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'move',
      }}>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-text">{task.responsible}</p>
      <div className="task-card-buttons">
        <Button sx={{ backgroundColor: '#6747c0' }} size="small" variant="contained">
          Редактировать
        </Button>
        <Button
          onClick={onDelete}
          sx={{ color: '#6747c0', border: '1px solid #6747c0' }}
          size="small"
          variant="outlined">
          Удалить
        </Button>
      </div>
    </div>
  );
};
