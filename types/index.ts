export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    updatedAt: string;
    dueDate?: string;
  }
  
  export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done'
  }
  
  export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
  }
  
  export interface TaskState {
    tasks: Task[];
    filter: TaskStatus | 'all';
    searchQuery: string;
  }