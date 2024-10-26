export interface Task {
  id: number;
  title: string;
  description: string;
  stage: string;
  endDate?: Date;
  board: number;
  responsible: number;
}