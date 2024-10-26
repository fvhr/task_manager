import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { getTasks } from '../api/tasks';
import { Task } from '../types/Task';

type GetTasksResponse = Task[];

export const ExportToExcel = () => {
  const [tasks, setTasks] = useState<GetTasksResponse | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTasks();
        setTasks(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `tasks.xlsx`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  return (
    <div>
      <svg
        onClick={exportToExcel}
        style={{ marginRight: '20px', cursor: 'pointer' }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-download">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    </div>
  );
};
