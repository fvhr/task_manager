export interface Task {
  id: number;
  title: string;
  description: string;
  stage: string;
  endDate?: Date;
  board: number;
  responsible: number;
}

export interface FormTask {
	title: string;
  description: string;
  project: number; 
  user: number; 
  stage: string; 
  board: number; 
}