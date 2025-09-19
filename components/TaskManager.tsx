import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Fab,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { TaskStatus } from '../types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import LanguageSwitcher from './LanguageSwitcher';

const TaskManager: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const { t } = useTranslation();
  
  const { tasks, filter, searchQuery } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const todoTasks = filteredTasks.filter(task => task.status === TaskStatus.TODO);
  const inProgressTasks = filteredTasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  const doneTasks = filteredTasks.filter(task => task.status === TaskStatus.DONE);

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const TaskColumn: React.FC<{ title: string; tasks: typeof filteredTasks }> = ({ 
    title, 
    tasks 
  }) => (
    <Box sx={{ minHeight: '60vh', backgroundColor: '#f5f5f5', borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title} ({tasks.length})
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={handleEditTask}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('appTitle')}
          </Typography>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <TaskFilters />
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn 
              title={t('columns.todo')} 
              tasks={todoTasks}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn 
              title={t('columns.inProgress')} 
              tasks={inProgressTasks}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TaskColumn 
              title={t('columns.done')} 
              tasks={doneTasks}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            {t('stats.totalTasks')}: {tasks.length} | {t('stats.displayed')}: {filteredTasks.length}
          </Typography>
        </Box>
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsFormOpen(true)}
      >
        <AddIcon />
      </Fab>

      <TaskForm
        open={isFormOpen}
        onClose={handleCloseForm}
        editingTaskId={editingTask}
      />
    </>
  );
};

export default TaskManager;