import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { addTask, updateTask } from '../store/taskSlice';
import { TaskPriority } from '../types';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  editingTaskId?: string | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, editingTaskId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    dueDate: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const editingTask = editingTaskId ? tasks.find(task => task.id === editingTaskId) : null;

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: TaskPriority.MEDIUM,
        dueDate: '',
      });
    }
    setErrors({ title: '', description: '' });
  }, [editingTask, open]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    
    // Очистить ошибку при изменении поля
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<TaskPriority>) => {
    setFormData({
      ...formData,
      priority: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = { title: '', description: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = t('taskForm.validation.titleRequired');
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = t('taskForm.validation.titleMinLength');
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = t('taskForm.validation.descriptionRequired');
      isValid = false;
    } else if (formData.description.trim().length < 5) {
      newErrors.description = t('taskForm.validation.descriptionMinLength');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
    };

    if (editingTaskId) {
      dispatch(updateTask({
        id: editingTaskId,
        updates: taskData,
      }));
    } else {
      dispatch(addTask(taskData));
    }

    onClose();
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    return t(`priority.${priority}`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {editingTask ? t('taskForm.editTitle') : t('taskForm.createTitle')}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              autoFocus
              required
              label={t('taskForm.taskTitle')}
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleInputChange('title')}
              error={!!errors.title}
              helperText={errors.title}
              inputProps={{ maxLength: 100 }}
            />
            
            <TextField
              required
              label={t('taskForm.taskDescription')}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={handleInputChange('description')}
              error={!!errors.description}
              helperText={errors.description}
              inputProps={{ maxLength: 500 }}
            />
            
            <FormControl fullWidth>
              <InputLabel>{t('taskForm.taskPriority')}</InputLabel>
              <Select
                value={formData.priority}
                label={t('taskForm.taskPriority')}
                onChange={handleSelectChange}
              >
                <MenuItem value={TaskPriority.LOW}>
                  {getPriorityLabel(TaskPriority.LOW)}
                </MenuItem>
                <MenuItem value={TaskPriority.MEDIUM}>
                  {getPriorityLabel(TaskPriority.MEDIUM)}
                </MenuItem>
                <MenuItem value={TaskPriority.HIGH}>
                  {getPriorityLabel(TaskPriority.HIGH)}
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label={t('taskForm.dueDate')}
              type="date"
              fullWidth
              variant="outlined"
              value={formData.dueDate}
              onChange={handleInputChange('dueDate')}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 
                min: new Date().toISOString().split('T')[0] // Минимальная дата - сегодня
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            {t('taskForm.cancel')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {editingTask ? t('taskForm.save') : t('taskForm.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;