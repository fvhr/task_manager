import React from 'react';
import { useDrag } from 'react-dnd';

interface Task {
    id: number;
    title: string;
    assignee: string;
    status: string;
}

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: '1rem',
                margin: '0.5rem 0',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'move',
            }}
        >
            <h3>{task.title}</h3>
            <p>Исполнитель: {task.assignee}</p>
            <button style={{ marginRight: '0.5rem' }}>Редактировать</button>
            <button>Удалить</button>
        </div>
    );
};
