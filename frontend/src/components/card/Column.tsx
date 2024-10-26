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

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        padding: '1rem',
        backgroundColor: isOver ? '#dbdbdb' : 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}>
      <h2 className="column-title">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
