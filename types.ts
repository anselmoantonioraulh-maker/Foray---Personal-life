
export enum Category {
  SPIRITUAL = 'SPIRITUAL',
  SCHOOL = 'SCHOOL',
  SECULAR = 'SECULAR',
  DOMESTIC = 'DOMESTIC',
  GENERAL = 'GENERAL'
}

export type Theme = 'light' | 'dark' | 'system';

export interface Task {
  id: string;
  title: string;
  category: Category;
  subCategory?: string;
  completed: boolean;
  dueDate?: string;
  reminderTime?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdAt: string;
  taskId?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: Category;
}

export interface LocationPoint {
  id: string;
  name: string;
  category: Category;
  lat: number;
  lng: number;
}

export interface TimerSession {
  id: string;
  duration: number; // in seconds
  category: Category;
  timestamp: string;
}
