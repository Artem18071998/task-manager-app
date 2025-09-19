import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Task, TaskStatus, TaskPriority } from '../types';
import { updateTask, deleteTask } from '../store/taskSlice';

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleStatusChange = (newStatus: TaskStatus) => {
    dispatch(updateTask({ id: task.id, updates: { status: newStatus } }));
  };

  const handleDelete = () => {
    if (window.confirm(t('taskCard.deleteConfirm'))) {
      dispatch(deleteTask(task.id));
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'error';
      case TaskPriority.MEDIUM:
        return 'warning';
      case TaskPriority.LOW:
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    return t(`priority.${priority}`);
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return t('status.todo');
      case TaskStatus.IN_PROGRESS:
        return t('status.inProgress');
      case TaskStatus.DONE:
        return t('status.done');
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const { i18n } = useTranslation();
    const locale = i18n.language === 'ru' ? 'ru-RU' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;

  return (
    <Card sx={{ 
      minWidth: 275,
      border: isOverdue ? '2px solid #f44336' : 'none',
      boxShadow: isOverdue ? '0 2px 8px rgba(244, 67, 54, 0.2)' : undefined
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {task.title}
          </Typography>
          <Chip
            label={getPriorityLabel(task.priority)}
            color={getPriorityColor(task.priority)}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <FormControl size="small" fullWidth>
            <Select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            >
              <MenuItem value={TaskStatus.TODO}>{t('status.todo')}</MenuItem>
              <MenuItem value={TaskStatus.IN_PROGRESS}>{t('status.inProgress')}</MenuItem>
              <MenuItem value={TaskStatus.DONE}>{t('status.done')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {t('taskCard.created')}: {formatDate(task.createdAt)}
          </Typography>
          
          {task.updatedAt !== task.createdAt && (
            <Typography variant="caption" color="text.secondary">
              {t('taskCard.updated')}: {formatDate(task.updatedAt)}
            </Typography>
          )}
          
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" color={isOverdue ? 'error' : 'action'} />
              <Typography 
                variant="caption" 
                color={isOverdue ? 'error' : 'text.secondary'}
                sx={{ fontWeight: isOverdue ? 'bold' : 'normal' }}
              >
                {t('taskCard.dueDate')}: {formatDate(task.dueDate)}
                {isOverdue && ` (${t('taskCard.overdue')})`}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        <IconButton 
          size="small" 
          onClick={() => onEdit(task.id)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={handleDelete}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;