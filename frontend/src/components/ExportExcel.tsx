import * as XLSX from 'xlsx';

interface Task {
	id: number;
  title: string;
  description: string;
  assignee: string;
  comments: string;
}

const tasks: Task[] = [
  {
		id: 1,
    title: 'Задача 1',
    description: 'Описание задачи 1',
    assignee: 'Иван',
    comments: 'Комментарий 1',
  },
	{
		id: 2,
    title: 'Задача 2',
    description: 'Описание задачи 2',
    assignee: 'Яма 3',
    comments: 'Комментарий 2',
  },
];

export const ExportToExcel = () => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
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
