import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskState, TaskStatus, TaskPriority } from '../types';

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Example Task',
      description: 'This is an example task to demonstrate the application',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  filter: 'all',
  searchQuery: '',
};

interface CreateTaskPayload {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
}

interface UpdateTaskPayload {
  id: string;
  updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<CreateTaskPayload>) => {
      const newTask: Task = {
        id: uuidv4(),
        ...action.payload,
        status: TaskStatus.TODO,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TaskStatus | 'all'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilter, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;